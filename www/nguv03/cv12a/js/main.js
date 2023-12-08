const spinner = $('<div class="spinner"></div>');
const showLoading = () => {
    $(document.body).append(spinner);
};
const hideLoading = () => {
    spinner.remove();
};
const fetchPokemon = () => {
    showLoading();
    $.getJSON('https://pokeapi.co/api/v2/pokemon/ditto').done((data) => {
        hideLoading();
        const pokemonName = data.name;
        const pokemonWeight = data.weight;
        const pokemonHeight = data.height;
        const pokemonImageUrl = data.sprites.front_default;
        $(document.body).append(`
            <img src="${pokemonImageUrl}" alt="${pokemonName}">
            <div>${pokemonName}</div>
            <div>height: ${pokemonHeight}</div>
            <div>weight: ${pokemonWeight}</div>
        `);
    });
};
const fetchPokemonButton = $(`
    <button>Get me my pokemon</button>
`).on('click', fetchPokemon);
$(document.body).append(fetchPokemonButton);


const fetchPosts = () => {
    showLoading();
    $.getJSON(`https://jsonplaceholder.typicode.com/posts`).done((posts) => {
        hideLoading();
        const postElements = [];
        posts.forEach((post) => {
            const postElement = $(`
                <article class="post">
                    <h3 class="post-title">${post.title}</h3>
                    <p class="post-body">${post.body}</p>
                    <button data-post="${post.id}">Show comments</button>
                </article>
            `);
            postElement.find('button').on('click', function () {
                const postId = $(this).data('post');
                const commentsURL = `https://jsonplaceholder.typicode.com/comments?postId=${postId}`;
                $.getJSON(commentsURL).done((comments) => {
                    const commentElements = [];
                    comments.forEach((comment) => {
                        const commentElement = $(`
                            <li class="post-comment">
                                <div class="pc-user">${comment.email}</div>
                                <div class="pc-title">${comment.name}</div>
                                <div class="pc-comment">${comment.body}</div>
                            </li>
                        `);
                        commentElements.push(commentElement);
                    });
                    const commentsContainer = $(`<ul class="post-comments">`);
                    commentsContainer.append(commentElements);
                    postElement.after(commentsContainer);
                });
            });
            postElements.push(postElement);
        });

        $(document.body).append(postElements);
    });
};
const fetchPostsButton = $(`
    <button>Get me my Posts</button>
`).on('click', fetchPosts);
$(document.body).append(fetchPostsButton);