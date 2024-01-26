$(document).ready(() => {

    const animeText = $('#animeText');
    const category = $('#category');
    const episodes = $('#episodes');
    const season = $('#season');
    const resultsContainer = $('#animeResults');

    const exploreButton = $('#exploreButton');
    const favoritesButton = $('#favoritesButton');

    const prevButton = $('#prevButton');
    const firstButton = $('#firstButton');
    const nextButton = $('#nextButton');
    const lastButton = $('#lastButton');
    const paginationControls = $('#paginationControls');

    const searchForm = $('#searchForm');
    const filterForm = $('#filterForm')


    episodes.on('input', function () {
        const value = $(this).val();
        const validInputRegex = /^(?:[1-9]\d*|)$/;
        if (!validInputRegex.test(value)) {
            $(this).val('');
        }
    });

    // Globální proměnná pro ukládání všech dostupných dat o anime
    let animeList = [];

    // Globální proměnné pro stránkování
    let currentPage = 1;
    const limit = 9;
    let nextPageURL = null;

    // Nastavení tříd pro tlačítka ("karty") Explore a Favorites
    exploreButton.addClass('active');
    favoritesButton.addClass('inactive');

    // Loading spinner
    const loadingSpinner = $(`<div class="spinner">`);

    // Zobrazení loading spinneru
    const showLoading = () => {
        resultsContainer.append(loadingSpinner);
    };

    // Odstranění loading spinneru
    const hideLoading = () => {
        loadingSpinner.remove();
    };

    // Funkce fetch
    const fetchAnime = (url) => {
        showLoading();
        axios.get(url)
            .then(response => {
                hideLoading();
                animeList = response.data.data;
                const offsetParam = new URL(url).searchParams.get('page[offset]');
                let offset;
                if (offsetParam) {
                    offset = parseInt(offsetParam);
                } else {
                    offset = 0;
                }

                // Strana podle offsetu z URL
                currentPage = Math.floor(offset / limit);

                // Nastavení URL další stránky od API nebo null
                nextPageURL = response.data.links.next || null;
                // Pokud API neposkytuje URL další stránky, ale stále existují další výsledky
                if (!nextPageURL && offset < response.data.meta.count) {
                    nextPageURL = `${baseURL}page[limit]=${limit}&page[offset]=${offset + limit}`;
                }

                displayResults(animeList);
            })
            .catch(error => {
                hideLoading();
                console.error('Error:', error);
            });
    }

    // Funkce pro výpočet a přesunutí se na poslední stranu
    const lastPage = () => {
        axios.get(baseURL)
            .then(response => {
                const totalItems = response.data.meta.count;
                const totalPages = Math.ceil(totalItems / limit);
                const lastPageOffset = calculateOffset(totalPages);

                const actualLastPageURL = `${baseURL}page[limit]=${limit}&page[offset]=${lastPageOffset}`;
                fetchAnime(actualLastPageURL);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // Přesun na první stranu
    const firstPage = () => {
        currentPage = 1;
        const firstPageURL = `${baseURL}page[limit]=${limit}&page[offset]=9`;
        fetchAnime(firstPageURL);
    }


    // Limit délky popisu na anime kartě, odkaz Show more
    const getShortSynopsis = (synopsis) => {
        const maxLength = 100;
        if (synopsis.length > maxLength) {
            return $('<p>').html(`Synopsis: ${synopsis.substring(0, maxLength)}... <a href="#" class="show-more">Show more</a>`);
        } else {
            return $('<p>').text(`Synopsis: ${synopsis}`);
        }
    }

    // Zobrazení modálního okna (po kliknutí na obrázek)
    const showVideoInModal = (youtubeVideoId) => {
        if (youtubeVideoId) {
            const videoUrl = `https://www.youtube.com/embed/${youtubeVideoId}`;
            const modalWindow = `<div class="modal" id="videoModal">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <iframe src="${videoUrl}" frameborder="0" allow="accelerometer; autoplay; gyroscope; picture-in-picture;" allowfullscreen></iframe>
                                        </div>
                                    </div>
                                </div>`;
            $('body').append(modalWindow);
            $('#videoModal').show();
        } else {
            Swal.fire({
                title: 'No Trailer Available',
                text: 'Seems like there is no trailer for this anime.',
                icon: 'info',
                confirmButtonText: 'OK'
            });
        }
    }

    // Zavření modálního okna pokud je kliknuto na tlačítko close (class)
    $('body').on('click', '.close', () => {
        $('#videoModal').hide();
        $('#videoModal').remove();
    });

    // Funkce pro zobrazení výsledků/karet anime
    const displayResults = (animeList) => {
        const animeCards = []; // Pole pro ukládání anime karet

        if (animeList && animeList.length > 0) {
            animeList.forEach(anime => {
                const animeCard = $('<div>').addClass('anime-card');
                const animeTitle = $('<h3>').text(anime.attributes.canonicalTitle);

                const animeImageContainer = $('<div>').addClass('anime-image-container');
                const animeImage = $('<img>').attr('src', anime.attributes.posterImage.medium)
                    .attr('alt', anime.attributes.canonicalTitle);

                animeImageContainer.append(animeImage);
                if (anime.attributes.youtubeVideoId) {
                    const youtubeIcon = $('<i>').addClass('fab fa-youtube yt-icon');
                    animeImageContainer.append(youtubeIcon);
                    youtubeIcon.on('click', () => {
                        showVideoInModal(anime.attributes.youtubeVideoId);
                    });
                }

                // Alternativní názvy
                const titlesContainer = $('<div>');
                const animeTitles = anime.attributes.titles;
                const uniqueTitles = new Set(Object.values(animeTitles));
                if (uniqueTitles.size > 1) {
                    uniqueTitles.delete(anime.attributes.canonicalTitle);
                    titlesContainer.append($('<p>').text('Alternative Titles: '));
                    uniqueTitles.forEach(title => {

                        const titleKey = Object.keys(animeTitles).find(key => animeTitles[key] === title);

                        // Druhá část, země
                        let titleKeyPart = titleKey.includes('_') ? titleKey.split('_').pop() : titleKey;

                        // Pro flags api
                        if (titleKeyPart === 'en') {
                            titleKeyPart = 'us';
                        }

                        titlesContainer.append($('<p>').html(`<img src="https://flagsapi.com/${titleKeyPart.toUpperCase()}/shiny/24.png"></img> ${title}`).addClass('alternative-titles'));
                    });
                }


                const animeSynopsis = getShortSynopsis(anime.attributes.synopsis || 'No synopsis available.');
                // Event pro "Show more" u delších popisů
                animeSynopsis.find('.show-more').on('click', function (event) {
                    event.preventDefault();
                    $(this).parent().text(anime.attributes.synopsis);
                });

                const episodeCount = $('<p>').text(`Episodes: ${anime.attributes.episodeCount || 'Unknown'}`);

                const showType = $('<p>').text(`Type: ${anime.attributes.showType || 'Unknown'}`);
                const airDateText = displayAirDate(anime.attributes.startDate, anime.attributes.endDate);
                const airDate = $('<p>').text(airDateText);

                // Text tlačítka pokud anime je/není ve Favorites
                let favoriteButtonText;
                let buttonClass;
                if (isFavorite(anime.id)) {
                    favoriteButtonText = `Added <i class='fas fa-heart'></i>`;
                    buttonClass = 'button-added';
                } else {
                    favoriteButtonText = `Favorite <i class='far fa-heart'></i>`;
                    buttonClass = 'button';
                }

                // Vytvoření Favorite tlačítka
                const favoriteButton = $('<button>').html(favoriteButtonText).addClass(buttonClass); // .html() kvůli font awesome
                favoriteButton.on('click', function () {
                    addToFavorites(anime.id, animeList);
                    $(this).html(`Added <i class='fas fa-heart'></i>`).removeClass('button').addClass('button-added');
                });

                animeCard.append(animeTitle, animeImageContainer, titlesContainer, animeSynopsis, episodeCount, showType, airDate, favoriteButton);
                animeCards.push(animeCard);
            });
        } else {
            animeCards.push($(`<p class='no-results'>`).text('No results found.'));

            Swal.fire({
                title: 'Oh no!',
                text: 'Seems like nothing was found, try looking for something else.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
        }
        // Přidání všech karet do prázdného kontejneru
        resultsContainer.empty().append(animeCards);

        // Stránkování
        prevButton.prop('disabled', currentPage <= 1);
        firstButton.prop('disabled', currentPage <= 1);
        $('#currentPageDisplay').text(`Page: ${currentPage}`);
        nextButton.prop('disabled', !nextPageURL);
        lastButton.prop('disabled', !nextPageURL);

        paginationControls.addClass('show');
    }

    // Funkce pro načtení oblíbených anime z localStorage
    const loadFavorites = () => {
        const favoritesJSON = localStorage.getItem('favoriteAnime');
        if (favoritesJSON) {
            return JSON.parse(favoritesJSON);
        } else {
            return [];
        }
    }

    // Funkce pro uložení oblíbených anime do localStorage
    const saveFavorites = (favorites) => {
        const favoritesJSON = JSON.stringify(favorites);
        localStorage.setItem('favoriteAnime', favoritesJSON);
    }

    let favoriteAnime = loadFavorites();

    // Funkce pro přidání anime do oblíbených (již neukládá celý JSON)
    const addToFavorites = (animeId, animeList) => {
        const animeToAdd = animeList.find(anime => anime.id === animeId);

        if (animeToAdd && !favoriteAnime.some(favAnime => favAnime.id === animeId)) {
            const favoriteAnimeData = {
                id: animeToAdd.id,
                canonicalTitle: animeToAdd.attributes.canonicalTitle,
                posterImage: animeToAdd.attributes.posterImage.medium,
                titles: animeToAdd.attributes.titles,
                synopsis: animeToAdd.attributes.synopsis,
                episodeCount: animeToAdd.attributes.episodeCount,
                startDate: animeToAdd.attributes.startDate,
                endDate: animeToAdd.attributes.endDate,
                youtubeVideoId: animeToAdd.attributes.youtubeVideoId
            };

            favoriteAnime.push(favoriteAnimeData);
            saveFavorites(favoriteAnime); // Uložit oblíbená anime do localStorage

            Swal.fire({
                title: 'Added to Favorites',
                text: `${animeToAdd.attributes.canonicalTitle} has been added to your favorites.`,
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }


    // Funkce pro odstranění (konkrétního) anime z oblíbených
    const removeFromFavorites = (animeId) => {
        const indexToRemove = favoriteAnime.findIndex(anime => anime.id === animeId);

        if (indexToRemove !== -1) {
            Swal.fire({
                title: "Do you want to remove this anime?",
                showDenyButton: true,
                confirmButtonText: "Remove",
                denyButtonText: `Cancel`
            }).then((result) => {
                if (result.isConfirmed) {
                    const removedAnime = favoriteAnime.splice(indexToRemove, 1)[0];
                    saveFavorites(favoriteAnime); // Uložit aktualizovaný seznam oblíbených do localStorage
                    showFavorites(); // Aktualizovat zobrazení oblíbených po odstranění
                    Swal.fire({
                        title: 'Removed from Favorites',
                        text: `${removedAnime.canonicalTitle} has been removed from your favorites.`,
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    });

                } else if (result.isDenied) {
                    Swal.fire({
                        title: 'Removing cancelled',
                        icon: 'info',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });

        }
    }


    // Funkce pro zobrazení seznamu oblíbených anime
    const showFavorites = () => {
        resultsContainer.empty();

        searchForm.hide();
        filterForm.hide();

        $('.remove-all').remove();

        if (favoriteAnime.length > 0) {

            const removeAllButton = $('<button>').text('Remove All').addClass('button remove-all').on('click', removeAllFavorites);
            $('h1').after(removeAllButton);

            let animeCards = [];

            favoriteAnime.forEach(anime => {
                const animeCard = $('<div>').addClass('anime-card');
                const animeTitle = $('<h3>').text(anime.canonicalTitle);

                const animeImageContainer = $('<div>').addClass('anime-image-container');
                const animeImage = $('<img>').attr('src', anime.posterImage)
                    .attr('alt', anime.canonicalTitle);

                animeImageContainer.append(animeImage);
                if (anime.youtubeVideoId) {
                    const youtubeIcon = $('<i>').addClass('fab fa-youtube yt-icon');
                    animeImageContainer.append(youtubeIcon);
                    youtubeIcon.on('click', () => {
                        showVideoInModal(anime.youtubeVideoId);
                    });
                }


                // Alternativní názvy
                const titlesContainer = $('<div>');
                const animeTitles = anime.titles;
                const uniqueTitles = new Set(Object.values(animeTitles));
                if (uniqueTitles.size > 1) {
                    uniqueTitles.delete(anime.canonicalTitle);
                    titlesContainer.append($('<p>').text('Alternative Titles: '));
                    uniqueTitles.forEach(title => {

                        const titleKey = Object.keys(animeTitles).find(key => animeTitles[key] === title);

                        // Druhá část, země
                        let titleKeyPart = titleKey.includes('_') ? titleKey.split('_').pop() : titleKey;

                        // Pro flags api
                        if (titleKeyPart === 'en') {
                            titleKeyPart = 'us';
                        }

                        titlesContainer.append($('<p>').html(`<img src="https://flagsapi.com/${titleKeyPart.toUpperCase()}/shiny/24.png"></img> ${title}`).addClass('alternative-titles'));
                    });
                }

                const animeSynopsis = getShortSynopsis(anime.synopsis || 'No synopsis available.');
                // Event pro "Show more" u delších popisů
                animeSynopsis.find('.show-more').on('click', function (event) {
                    event.preventDefault();
                    $(this).parent().text(anime.synopsis);
                });

                const episodeCount = $('<p>').text(`Episodes: ${anime.episodeCount || 'Unknown'}`);
                const showType = $('<p>').text(`Type: ${anime.showType || 'Unknown'}`);
                const airDateText = displayAirDate(anime.startDate, anime.endDate);
                const airDate = $('<p>').text(airDateText);

                const removeButton = $('<button>').text('Remove').addClass('button').on('click', () => {
                    removeFromFavorites(anime.id);
                });

                animeCard.append(animeTitle, animeImageContainer, titlesContainer, animeSynopsis, episodeCount, showType, airDate, removeButton);
                animeCards.push(animeCard);
            });

            resultsContainer.append(animeCards);
        } else {
            resultsContainer.append(`<p class='no-results'>No favorite anime yet.</p>`);
        }

        exploreButton.removeClass('active').addClass('inactive');
        favoritesButton.removeClass('inactive').addClass('active');
        paginationControls.removeClass('show');
    }


    // Funkce pro odstranění všech oblíbených
    const removeAllFavorites = () => {
        Swal.fire({
            title: "Do you want to remove all anime?",
            showDenyButton: true,
            confirmButtonText: "Remove All",
            denyButtonText: `Cancel`
        }).then((result) => {
            if (result.isConfirmed) {
                favoriteAnime = [];
                saveFavorites(favoriteAnime);
                $('.remove-all').remove(); // Remove all už se nebude zobrazovat
                showFavorites();
                Swal.fire({
                    title: 'Removed All',
                    text: 'All your favorites have been removed.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });

            } else if (result.isDenied) {
                Swal.fire({
                    title: 'Removing cancelled',
                    icon: 'info',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    }

    // Funkce pro zobrazování data vysílání
    const displayAirDate = (startDate, endDate) => {
        if (startDate && endDate) {
            if (startDate === endDate) {
                return `Aired: ${startDate}`;
            }
            return `Aired: ${startDate} to ${endDate}`;
        } else if (startDate) {
            return `Aired: ${startDate} to ?`;
        } else {
            return 'Aired: Unknown';
        }
    }

    // Funkce pro zobrazení pro vyhledávání
    const showExplore = () => {
        searchForm.show();
        filterForm.show();

        resultsContainer.empty();

        favoritesButton.removeClass('active').addClass('inactive');
        exploreButton.removeClass('inactive').addClass('active');


        $('.remove-all').remove(); // Remove all už se nebude zobrazovat
        paginationControls.removeClass('show');
    }

    // Proměnná základu URL
    let baseURL = '';

    // Funkce pro vyhledávání anime
    const searchAnime = () => {
        currentPage = 1;
        const animeTextVal = animeText.val().trim();

        if (animeTextVal === '') {
            // SweetAlert2 notification, pokud není nic zadáno
            Swal.fire({
                title: 'Wait!',
                text: 'Please enter an anime title or keyword to search.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return;
        }

        baseURL = `https://kitsu.io/api/edge/anime?filter[text]=${animeTextVal}&`;
        const searchURL = `${baseURL}page[limit]=${limit}&page[offset]=9`;
        fetchAnime(searchURL);
    }

    // Vyhledávání pomocí filtrů
    const filterAnime = () => {
        currentPage = 1;

        const animeTextVal = animeText.val().trim();
        const categoryVal = category.val();
        const episodesVal = episodes.val().trim();
        const seasonVal = season.val();

        if (categoryVal === 'all' && episodesVal === '' && seasonVal === 'all') {
            // SweetAlert2 notification, pokud není vybrán ani jeden filtr
            Swal.fire({
                title: 'Wait!',
                text: 'Please choose some filters to filter.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return;
        }

        // Update globální baseURL
        baseURL = 'https://kitsu.io/api/edge/anime?';

        // Přidání k url, pokud byly tyto filtry nebo text zadány
        if (animeTextVal !== '') {
            baseURL += `filter[text]=${animeTextVal}&`;
        }

        if (categoryVal !== 'all') {
            baseURL += `filter[categories]=${categoryVal}&`;
        }

        if (episodesVal !== '') {
            baseURL += `filter[episodeCount]=${episodesVal}&`;
        }

        if (seasonVal !== 'all') {
            baseURL += `filter[season]=${seasonVal}&`;
        }

        const filterURL = `${baseURL}page[limit]=${limit}&page[offset]=9`;

        fetchAnime(filterURL);
    }

    // Načtení další stránky
    const nextPage = () => {
        if (nextPageURL) {
            currentPage++;
            fetchAnime(nextPageURL);
        }
    }

    // Načtení předchozí stránky
    const previousPage = () => {
        if (currentPage > 1) {
            currentPage--;
            const prevPageOffset = calculateOffset(currentPage);
            const prevPageURL = `${baseURL}page[limit]=${limit}&page[offset]=${prevPageOffset}`;
            fetchAnime(prevPageURL);
        }
    }


    // Kalkulace offsetu
    const calculateOffset = (pageNum) => {
        return (pageNum * limit);
    }


    // Zjištění oblíbeného anime
    const isFavorite = (animeId) => {
        return favoriteAnime.some(favAnime => favAnime.id === animeId);
    }


    searchForm.on('submit', (event) => {
        event.preventDefault();
        searchAnime();
    });

    filterForm.on('submit', (event) => {
        event.preventDefault();
        filterAnime();
    });

    nextButton.click(nextPage);
    prevButton.click(previousPage);
    lastButton.click(lastPage);
    firstButton.click(firstPage);
    favoritesButton.click(showFavorites);
    exploreButton.click(showExplore);


});