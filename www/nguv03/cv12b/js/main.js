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
        hideLoading();
        const pokemonImageURL = pokemon.sprites.front_default;
        const pokemonWeight = pokemon.weight;
        const pokemonHeight = pokemon.height;
        const pokemonName = pokemon.name;
        const pokemonElement = $(`
            <div>
                <h2>${pokemonName}</h2>
                <img src="${pokemonImageURL}" alt="${pokemonName}">
                <div>Height: ${pokemonHeight}</div>
                <div>Weight: ${pokemonWeight}</div>
            </div>
        `);
        $(document.body).append(pokemonElement);
    }).fail((err) => {
        $(document.body).append(`<p>${err.responseText}</p>`);
    });
};
const fetchPokemonButton = $(`
    <button>Fetch me my pokemon</button>
`).on('click', fetchPokemon);
$(document.body).append(fetchPokemonButton);



const fetchPosts = () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    showLoading();
    $.getJSON(url).done((posts) => {
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
                const url = `https://jsonplaceholder.typicode.com/comments?postId=${postId}`;
                $.getJSON(url).done((comments) => {
                    const commentElements = [];
                    comments.forEach((comment) => {
                        const commentElement = $(`
                            <li>
                                <h4>${comment.name}</h4>
                                <div>${comment.email}</div>
                                <p>${comment.body}</p>
                            </li>
                        `);
                        commentElements.push(commentElement);
                    });
                    const commentList = $(`<ul>`);
                    commentList.append(commentElements);
                    postElement.find('button').replaceWith(commentList);
                });
            });
            postElements.push(postElement);
        });
        $(document.body).append(postElements);
    });
};
const fetchPostsButton = $(`
    <button>Fetch me my posts</button>
`).on('click', fetchPosts);
$(document.body).append(fetchPostsButton);
