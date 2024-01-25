$(document).ready(function () {
  $('#search-recipes').click(function () {

    var cuisine = $('#cuisine').val();
    var diet = $('#diet').val();
    var intolerances = $('#intolerances').val();
    var maxReadyTime = $('#maxReadyTime').val() || '30';
    $('#recipe-container').html('');
    toggleVisibility('recipe-spinner', true);
    $.ajax({
      url: 'https://api.spoonacular.com/recipes/complexSearch',
      type: 'GET',
      dataType: 'json',
      data: {
        apiKey: 'aa8b5e5027e04fac90bd86cbd40ef03a',
        cuisine: cuisine,
        diet: diet,
        intolerances: intolerances,
        maxReadyTime: maxReadyTime,
        addRecipeInformation: true,
        number: 3
      },
      success: function (response) {
        displayRecipes(response.results);
        toggleVisibility('recipe-spinner', false);
      },
      error: function (error) {
        console.log('Error:', error);
        toggleVisibility('recipe-spinner', false);
      }
    });

  });

  $('#show-liked-recipes').click(function () {
    var likedRecipesContainer = $('#liked-recipes-container');
    if (likedRecipesContainer.is(':visible')) {
      likedRecipesContainer.hide();
      $(this).text('Show Liked Recipes');
    } else {
      displayLikedRecipes();
      likedRecipesContainer.show();
      $(this).text('Hide Liked Recipes');
    }
  });

  function displayRecipes(recipes) {
    var recipeContainer = document.getElementById('recipe-container');
    recipeContainer.innerHTML = '';
    let likedRecipes = JSON.parse(localStorage.getItem('likedRecipes')) || [];

    recipes.forEach(function (recipe) {
      var template = document.getElementById('recipe-template');
      var clone = template.cloneNode(true);

      clone.style.display = 'block';
      clone.id = '';

      clone.querySelector('.recipe-title').textContent = recipe.title;
      var likeButton = clone.querySelector('.like-button');
      likeButton.onclick = function () { toggleLikeRecipe(recipe.id, likeButton); };
      likeButton.textContent = likedRecipes.includes(recipe.id) ? 'Unlike' : 'Like';

      clone.querySelector('.recipe-image').src = recipe.image;
      clone.querySelector('.recipe-image').alt = recipe.title;

      displayIngredientTable(recipe, clone);
      displayInstructions(recipe, clone);

      recipeContainer.appendChild(clone);
    });
  }

  function displayLikedRecipes() {
    var likedRecipes = JSON.parse(localStorage.getItem('likedRecipes')) || [];
    var likedRecipesContainer = document.getElementById('liked-recipes');
    likedRecipesContainer.innerHTML = '';

    if (likedRecipes.length === 0) {
      likedRecipesContainer.textContent = 'No liked recipes yet.';
    } else {
      toggleVisibility('liked-spinner', true);
      likedRecipes.forEach(function (recipeId) {
        fetchAndDisplayLikedRecipe(recipeId);
      });
    }
  }

  function fetchAndDisplayLikedRecipe(recipeId) {
    $.ajax({
      url: 'https://api.spoonacular.com/recipes/' + recipeId + '/information',
      type: 'GET',
      dataType: 'json',
      data: { apiKey: 'aa8b5e5027e04fac90bd86cbd40ef03a' },
      success: function (recipe) {
        appendLikedRecipe(recipe);
        toggleVisibility('liked-spinner', false);
      },
      error: function (error) {
        console.log('Error:', error);
        toggleVisibility('liked-spinner', false);
      }
    });
  }

  function appendLikedRecipe(recipe) {
    var likedRecipesContainer = document.getElementById('liked-recipes-container');

    var recipeContainer = document.createElement('div');
    recipeContainer.className = 'recipe-item';

    var title = document.createElement('h1');
    title.className = 'recipe-title';
    title.textContent = recipe.title;

    var image = document.createElement('img');
    image.className = 'recipe-image';
    image.src = recipe.image;
    image.alt = recipe.title;

    var unlikeButton = document.createElement('button');
    unlikeButton.className = "btn btn-success like-button";
    unlikeButton.textContent = 'Unlike';
    unlikeButton.addEventListener('click', function () {
      removeRecipeFromLiked(recipe.id, recipeContainer);
    });

    var instructions = document.createElement('div');
    instructions.className = 'recipe-instructions';
    var instructionsHeader = document.createElement('h2');
    instructionsHeader.textContent = 'Instructions:';
    instructions.appendChild(instructionsHeader);

    var ol = document.createElement('ol');
    if (recipe.analyzedInstructions.length > 0 && recipe.analyzedInstructions[0].steps.length > 0) {
      recipe.analyzedInstructions[0].steps.forEach(function (step) {
        var li = document.createElement('li');
        li.textContent = step.step;
        ol.appendChild(li);
      });
    } else {
      var noInstructionsText = document.createElement('p');
      noInstructionsText.textContent = 'Instructions not available.';
      ol.appendChild(noInstructionsText);
    }
    instructions.appendChild(ol);

    recipeContainer.appendChild(title);
    recipeContainer.appendChild(image);
    recipeContainer.appendChild(unlikeButton);
    recipeContainer.appendChild(instructions);

    likedRecipesContainer.appendChild(recipeContainer);
  }

  function toggleLikeRecipe(recipeId, button) {
    let likedRecipes = JSON.parse(localStorage.getItem('likedRecipes')) || [];

    if (likedRecipes.includes(recipeId)) {
      likedRecipes = likedRecipes.filter(id => id !== recipeId);
      button.textContent = 'Like';
    } else {
      likedRecipes.push(recipeId);
      button.textContent = 'Unlike';
    }
    localStorage.setItem('likedRecipes', JSON.stringify(likedRecipes));
  }

  function removeRecipeFromLiked(recipeId, recipeElement) {
    let likedRecipes = JSON.parse(localStorage.getItem('likedRecipes')) || [];
    likedRecipes = likedRecipes.filter(id => id !== recipeId);
    localStorage.setItem('likedRecipes', JSON.stringify(likedRecipes));

    recipeElement.remove();
  }

  function displayIngredientTable(recipe, recipeEl) {
    var ingredientsList = recipeEl.querySelector('.ingredients-list');
    ingredientsList.innerHTML = '';

    var allIngredients = [];
    if (recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 && recipe.analyzedInstructions[0].steps) {
      recipe.analyzedInstructions[0].steps.forEach(function (step) {
        step.ingredients.forEach(function (ingredient) {
          if (allIngredients.indexOf(ingredient.name) === -1) {
            allIngredients.push(ingredient.name);
            var li = document.createElement('li');
            li.textContent = ingredient.name;
            ingredientsList.appendChild(li);
          }
        });
      });
    } else {
      ingredientsList.innerHTML = '<li>Ingredients not available.</li>';
    }
  }

  function displayInstructions(recipe, recipeEl) {
    var instructionsList = recipeEl.querySelector('.recipe-instructions ol');
    instructionsList.innerHTML = '';

    if (recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 && recipe.analyzedInstructions[0].steps) {
      recipe.analyzedInstructions[0].steps.forEach(function (step) {
        var li = document.createElement('li');
        li.textContent = step.step;
        instructionsList.appendChild(li);
      });
    } else {
      instructionsList.innerHTML = '<li>Instructions not available.</li>';
    }
  }

  function toggleVisibility(elementId, isVisible) {
    var element = document.getElementById(elementId);
    if (element) {
      if (isVisible) {
        element.classList.remove('hidden');
      } else {
        element.classList.add('hidden');
      }
    }
  }

});

