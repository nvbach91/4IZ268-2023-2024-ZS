const loadingSpinner = $(`<div class="spinner">`);
const showLoading = () => {
    $(document.body).append(loadingSpinner);
};
const hideLoading = () => {
    loadingSpinner.remove();
};
const fetchPokemon = () => {
    showLoading();
    $.getJSON('https://pokeapi.co/api/v2/pokemon/pikachu').done((pokemon) => {
        const pokemonImageURL = pokemon.sprites.front_default;
        const pokemonName = pokemon.name;
        const pokemonHeight = pokemon.height;
        const pokemonWeight = pokemon.weight;
        const pokemonElement = $(`
            <div>
                <img src="${pokemonImageURL}" alt="${pokemonName}">
                <div>${pokemonName}</div>
                <div>Height: ${pokemonHeight}</div>
                <div>Weight: ${pokemonWeight}</div>
            </div>
        `);
        $(document.body).append(pokemonElement);
    }).fail((error) => {
        $(document.body).append(
            `<div>${error.responseText}</div>`
        );
    }).always(() => {
        hideLoading();
    });
};
const fetchPokemonButton = $(`
    <button>Fetch me my pokemon</button>
`).on('click', fetchPokemon);

$(document.body).append(fetchPokemonButton);





const fetchPosts = () => {
    // jeste uklidit ty notfoundy
    showLoading();
    $.getJSON('https://jsonplaceholder.typicode.com/posts').done((posts) => {
        hideLoading();
        const postElements = [];
        posts.forEach((post) => {
            const postElement = $(`
                <article>
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                    <button data-post="${post.id}">Show comments</button>
                </article>
            `);
            postElement.find('button').on('click', function () {
                const postId = $(this).data('post');
                const commentsURL = `https://jsonplaceholder.typicode.com/comments?postId=${postId}`;
                postElement.find('button').after(loadingSpinner);
                $.getJSON(commentsURL).done((comments) => {
                    hideLoading();
                    const commentElements = $('<ul>');
                    comments.forEach((comment) => {
                        const commentElement = $(`
                            <li>
                                <div>${comment.email}</div>
                                <div>${comment.name}</div>
                                <div>${comment.body}</div>
                            </li>
                        `);
                        commentElements.append(commentElement);
                    });
                    postElement.find('button').replaceWith(commentElements);
                }).fail((error) => {
                    // ...
                });

            });
            postElements.push(postElement);
        });
        $(document.body).append(postElements);
    }).fail((error) => {
        hideLoading();
        $(document.body).append(
            `<div>${error.status === 0 ? 'jsi offline' : error.status}</div>`
        );
    });
};

const fetchPostsButton = $(`
    <button>Fetch posts</button>
`).on('click', fetchPosts);
$(document.body).append(fetchPostsButton);