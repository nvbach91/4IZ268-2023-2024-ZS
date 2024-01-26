$(document).ready(() => {
  const recipeContainer = $('#recipe-container');
  const searchRecipesButton = $('#search-recipes');
  const modalLikedRecipesContainer = $('#modal-liked-recipes');

  // Cuisines select creation
  const cuisines = ["African", "Asian", "American", "British", "Cajun", "Caribbean",
    "Chinese", "Eastern European", "European", "French", "German",
    "Greek", "Indian", "Irish", "Italian", "Japanese", "Jewish",
    "Korean", "Latin American", "Mediterranean", "Mexican",
    "Middle Eastern", "Nordic", "Southern", "Spanish", "Thai",
    "Vietnamese"];
  const selectCuisine = $('<select name="cuisine" id="cuisine"></select>');
  selectCuisine.append($('<option value="Any"></option>'));
  cuisines.forEach(cuisine => {
    selectCuisine.append($(`<option value="${cuisine}">${cuisine}</option>`));
  });
  $('label[for="cuisine"]').after(selectCuisine);

  // Diets select creation
  const diets = ["Vegetarian", "Vegan", "Gluten Free", "Ketogenic"];
  const selectDiet = $('<select name="diet" id="diet"></select>');
  selectDiet.append($('<option value="Any"></option>'));
  diets.forEach(diet => {
    selectDiet.append($(`<option value="${diet}">${diet}</option>`));
  });
  $('label[for="diet"]').after(selectDiet);

  // Intolerances select creation
  const intolerances = ["Dairy", "Egg", "Gluten"];
  const selectIntolerance = $('<select name="intolerances" id="intolerances"></select>');
  selectIntolerance.append($('<option value="Any"></option>'));
  intolerances.forEach(intolerance => {
    selectIntolerance.append($(`<option value="${intolerance}">${intolerance}</option>`));
  });
  $('label[for="intolerances"]').after(selectIntolerance);

  $('#show-liked-recipes').click(() => {
    $('#liked-recipes-modal').show();
    displayLikedRecipes();
  });

  // Close modal
  $('.close-modal').click(() => {
    $('#liked-recipes-modal').hide();
  });

  $('#search-recipes-form').on('submit', (event) => {
    event.preventDefault();
    const cuisine = $('#cuisine').val();
    const diet = $('#diet').val();
    const intolerances = $('#intolerances').val();
    const amount = $('#amountRecipes').val() || '1';
    const maxReadyTime = $('#maxReadyTime').val() || '30';


    recipeContainer.html('');
    toggleVisibility('#recipe-spinner', true);
    $.ajax({
      url: 'https://api.spoonacular.com/recipes/complexSearch',
      type: 'GET',
      dataType: 'json',
      data: {
        apiKey: '33c92dd51b10476aa267a31696a963fd',
        cuisine: cuisine,
        diet: diet,
        intolerances: intolerances,
        maxReadyTime: maxReadyTime,
        addRecipeInformation: true,
        number: amount
      },
      success: (response) => {
        displayRecipes(response.results);
        toggleVisibility('#recipe-spinner', false);
      },
      error: (error) => {
        console.log('Error:', error);
        toggleVisibility('#recipe-spinner', false);
      }
    });

  });

  const displayRecipes = (recipes) => {
    recipeContainer.innerHTML = '';
    const likedRecipes = JSON.parse(localStorage.getItem('likedRecipes')) || [];
    const fragment = document.createDocumentFragment();

    recipes.forEach((recipe) => {
      const template = document.getElementById('recipe-template');
      const clone = template.cloneNode(true);

      clone.style.display = 'flex';
      clone.id = '';

      clone.querySelector('.recipe-title').textContent = recipe.title;
      clone.querySelector('.max-cooking-time').textContent = `Cooking Time: ${recipe.readyInMinutes}`;
      clone.querySelector('.recipe-image').src = recipe.image;
      clone.querySelector('.recipe-image').alt = recipe.title;

      const likeButton = clone.querySelector('.like-button');
      likeButton.onclick = () => { toggleLikeRecipe(recipe.id, likeButton); };
      likeButton.textContent = likedRecipes.includes(recipe.id) ? 'Unlike' : 'Like';

      const expandButton = clone.querySelector('.expand-button');
      expandButton.onclick = () => populateModal(recipe);
      console.log(clone);
      fragment.appendChild(clone);
    });
    recipeContainer.append(fragment);
  }

  const populateModal = (recipe) => {
    const modal = document.querySelector('#recipeModal');
    const modalTitle = document.querySelector('#recipeModalLabel');
    const modalBody = modal.querySelector('.modal-body');
    const closeButton = modal.querySelector('.close');

    modalTitle.textContent = recipe.title;

    // Ingredients
    let modalBodyContent = '<h3>Ingredients:</h3><ul>';
    const allIngredients = [];
    if (recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 && recipe.analyzedInstructions[0].steps) {
      recipe.analyzedInstructions[0].steps.forEach((step) => {
        step.ingredients.forEach((ingredient) => {
          if (!allIngredients.includes(ingredient.name)) {
            allIngredients.push(ingredient.name);
            const ingredientImage = ingredient.image ? `<img src="https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}" alt="${ingredient.name}" style="width:50px; height:auto;">` : '';
            modalBodyContent += `<li>${ingredientImage} ${ingredient.name}</li>`;
          }
        });
      });
    } else {
      modalBodyContent += '<li>Ingredients not available.</li>';
    }
    modalBodyContent += '</ul>';

    // Instructions
    modalBodyContent += '<h3>Instructions:</h3><ol>';
    if (recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 && recipe.analyzedInstructions[0].steps) {
      recipe.analyzedInstructions[0].steps.forEach((step) => {
        modalBodyContent += `<li>${step.step}</li>`;
      });
    } else {
      modalBodyContent += '<li>Instructions not available.</li>';
    }
    modalBodyContent += '</ol>';

    modalBody.innerHTML = modalBodyContent;

    closeButton.addEventListener('click', () => {
      $(modal).modal('hide'); 
    });
  }


  const displayLikedRecipes = () => {
    const likedRecipes = JSON.parse(localStorage.getItem('likedRecipes')) || [];
    modalLikedRecipesContainer.empty();

    if (likedRecipes.length === 0) {
      console.log(likedRecipes.length)

      modalLikedRecipesContainer.text('No liked recipes yet.');
    } else {
      toggleVisibility('#liked-spinner', true);
      likedRecipes.forEach((recipeId) => {
        fetchAndDisplayLikedRecipe(recipeId);
      });
    }
  }

  const fetchAndDisplayLikedRecipe = (recipeId) => {
    $.ajax({
      url: 'https://api.spoonacular.com/recipes/' + recipeId + '/information',
      type: 'GET',
      dataType: 'json',
      data: { apiKey: '33c92dd51b10476aa267a31696a963fd' },
      success: (recipe) => {
        appendLikedRecipe(recipe);
        toggleVisibility('#liked-spinner', false);
      },
      error: (error) => {
        console.log('Error:', error);
        toggleVisibility('#liked-spinner', false);
      }
    });
  }

  const appendLikedRecipe = (recipe) => {
    const recipeContainer = $('<div class="recipe-item"></div>');

    const title = $('<h1 class="recipe-title"></h1>').text(recipe.title);
    const image = document.createElement('img');
    image.className = 'recipe-image';
    image.src = recipe.image;
    image.alt = recipe.title;

    const instructionsContainer = $('<div class="recipe-instructions"></div>');
    instructionsContainer.append('<h2>Instructions:</h2>');
    const ol = $('<ol></ol>');

    if (recipe.analyzedInstructions.length > 0 && recipe.analyzedInstructions[0].steps.length > 0) {
      recipe.analyzedInstructions[0].steps.forEach((step) => {
        ol.append(`<li>${step.step}</li>`);
      });
    } else {
      ol.append('<p>Instructions not available.</p>');
    }
    instructionsContainer.append(ol);
    
    const unlikeButton = document.createElement('button');
    unlikeButton.className = "btn btn-success like-button";
    unlikeButton.textContent = 'Unlike';
    unlikeButton.addEventListener('click', () => {
      removeRecipeFromLiked(recipe.id, recipeContainer);
    });

    recipeContainer.append(title, image, instructionsContainer,  unlikeButton);
    $('#modal-liked-recipes').append(recipeContainer);
  };


  const toggleLikeRecipe = (recipeId, button) => {
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

  const removeRecipeFromLiked = (recipeId, recipeElement) => {
    let likedRecipes = JSON.parse(localStorage.getItem('likedRecipes')) || [];
    likedRecipes = likedRecipes.filter(id => id !== recipeId);
    localStorage.setItem('likedRecipes', JSON.stringify(likedRecipes));

    recipeElement.remove();
  }

  const toggleVisibility = (elementId, isVisible) => {
    const element = $(elementId);
    if (element) {
      if (isVisible) {
        element.removeClass('hidden');
      } else {
        element.addClass('hidden');
      }
    }
  }
});

