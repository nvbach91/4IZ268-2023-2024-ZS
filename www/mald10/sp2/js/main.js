window.fbAsyncInit = function() {
    FB.init({
      appId      : "387371490336516",
      cookie     : true,
      xfbml      : true,
      version    : "v14.0"
    });

    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

// Vytvoření namespace objektu
const quizApp = {};

// Přidání proměnných do namespace
quizApp.accessToken;
quizApp.loadedQuestions = [];
quizApp.loadedCategories = [];
quizApp.currentQuestionIndex;
quizApp.currentCorrectAnswer;
quizApp.currentPoints = 0;
quizApp.muted = true;

quizApp.progressAnimation = createProgressAnimation();
quizApp.loadingSlider = $(".loading-slider");

quizApp.correctSounds = ["correctSound1", "correctSound2", "correctSound3", "correctSound4"];
quizApp.incorrectSounds = ["incorrectSound1", "incorrectSound2", "incorrectSound3", "incorrectSound4"];
quizApp.currentCorrectSound = 0;
quizApp.currentIncorrectSound = 0;

$(document).ready(function () {

    //vlozeni leemntu do variables
    const quizContainer = $("#quiz-container");
    const errorContainer = $("#error-container");
    const homeContainer = $("#home-container");
    //vyhledani kategorii s databáze a vykresleni do home containeru
    renderCategories();
    const introMusic = document.getElementById("introMusic");
    introMusic.volume = 0.05;

    //změna číselné hodnoty počtu otázek podle nastavení slideru
    const slider = document.getElementById("number-of-questions-input");
    const selectedValue = document.getElementById("selected-value");

    slider.addEventListener("input", function () {
        selectedValue.textContent = this.value;
    });

    //Akce pro spuštění kvízu a přenos dat o kategorii a obtížnosti
    $("#start-button").click(async function () {
        let selectedCategory = $(".category-card.active").data("category-id");
        let selectedDifficulty = $("input[name='difficulty']:checked").val();
        let selectedAmount = $("input[name='number-of-questions-input']").val();

        await hideWithAnimation(".home-container");
        quizApp.loadingSlider.show();
        quizApp.progressAnimation.play();
        introMusic.pause();
        prepareGame(selectedAmount, selectedCategory, selectedDifficulty, "");
    });

    //interaktivita kategorii
    $("#selection-container").on("click", ".category-card", function (event) {
        $(".category-card").removeClass("active");
        $(this).addClass("active");
    });

    //highscore btn
    $("#highscore-button").on("click", function (event) {
        homeContainer.hide();
        quizContainer.css("display", "flex");
        displayHighScores(0);
    });
    //mute button
    $("#mute-button").on("click", function (event) {
        quizApp.muted = !quizApp.muted;
        if (quizApp.muted) {
            introMusic.pause();
            $(this).css("background-color", "red");
        } else {
            $(this).css("background-color", "#4caf50");
            introMusic.play();
        }
    });

    //quiz mutebutton
    quizContainer.on("click", "#quiz-mute-button", function (event) {
        quizApp.muted = !quizApp.muted;
        if (quizApp.muted) {
            $(this).css("background-color", "red");
        } else {
            $(this).css("background-color", "#4caf50");
        }
    });

    //fb share button v quizcontaineru
    quizContainer.on("click", "#fb-share-button", function (event) {
            /*FB.ui({
            method: 'share',
            href: "https://eso.vse.cz/~mald10/sp2/",
          }, function(response){});*/
          if(quizApp.accessToken){
            publishPost();
          }
          else {
            facebookLogin();
          }
    });

    // error button akce

    errorContainer.on("click", "#error-button-home", function (event) {
        errorContainer.hide();
        homeContainer.css("display", "flex");
    });

    errorContainer.on("click", "#error-button-refresh", function (event) {
        location.reload();
    });


    //nastavení akce answers formu
    quizContainer.on("submit", "#answers-form", function (event) {
        event.preventDefault();
        $("#answer-button").prop("disabled", true);
        $("input[name='answer']").prop("disabled", true);

        let selectedAnswerIndex;
        selectedAnswerIndex = $("input[name='answer']:checked").val();
        processAnswer(parseInt(selectedAnswerIndex, 10));

        if (quizApp.currentQuestionIndex === quizApp.loadedQuestions.length - 1) {
            console.log("konec");
            showResults();
            return;
        }

        quizApp.currentQuestionIndex++;
        const shuffledAnswersObject = prepareAndShuffleAnswers(quizApp.loadedQuestions[quizApp.currentQuestionIndex]);
        quizApp.currentCorrectAnswer = shuffledAnswersObject.correctAnswerIndex;

        setTimeout(function () {
            displayQuestion(quizApp.loadedQuestions[quizApp.currentQuestionIndex], shuffledAnswersObject.answers);
            $("#answer-button").prop("disabled", false);
        }, 2000);
    });

    quizContainer.on("click", "#home-button", function (event) {
        quizContainer.hide();
        homeContainer.css("display", "flex");
    });

    quizContainer.on("click", "#highscores-button", function (event) {
        displayHighScores();
    });

});

// Funkce pro načtení otázek z API
function loadQuestions(amount, category, difficulty) {
    return new Promise(function (resolve, reject) {
        const apiUrl = "https://opentdb.com/api.php";

        const queryParams = {
            amount: amount,
            category: category,
            difficulty: difficulty
        };

        $.ajax({
            url: apiUrl,
            method: "GET",
            data: queryParams,
            success: function (data) {
                quizApp.progressAnimation.pause();
                quizApp.progressAnimation.seek(0);
                quizApp.loadingSlider.hide();
                resolve(data.results);
            },
            error: function (error, xhr, textStatus, errorThrown) {
                reject("Chyba při načítání otázek z API: ");
                console.log(error);
                console.log(xhr.status);
                console.log(xhr);
                console.log(textStatus);
                console.log(errorThrown);
                quizApp.progressAnimation.pause();
                quizApp.progressAnimation.seek(0);
                quizApp.loadingSlider.hide();
                showErrorContainer(2);
            }
        });
    });
}

//vyhodnocení odpovedi
function processAnswer(selectedAnswer) {
    if (selectedAnswer === quizApp.currentCorrectAnswer) {
        playCorrectSound();
        $("#answer-" + selectedAnswer).css("color", "green");
        quizApp.currentPoints++;
        $("#points-number").text(quizApp.currentPoints + " pts.");
        return true;
    }
    playIncorrectSound();
    $("#answer-" + selectedAnswer).css("color", "red");
    $("#answer-" + quizApp.currentCorrectAnswer).css("color", "green");
    return false;
}

// Funkce pro přípravu hry
async function prepareGame(amount, category, difficulty) {
    try {
        quizApp.loadedQuestions = await loadQuestions(amount, category, difficulty);
        if (quizApp.loadedQuestions.length === 0) {
            quizApp.progressAnimation.play();
            $("#loading-slider").show();
            const newQuestionCount = await getNewQuestionCount(amount, category);

            await new Promise(resolve => setTimeout(resolve, 5000));
            quizApp.loadedQuestions = await loadQuestions(newQuestionCount, category, "");
            displayMinorErrorMessage("Not enough questions available for the selected category and difficulty. Additional difficulties have been considered and quiz will have: " + newQuestionCount + " questions");
        }
        quizApp.currentQuestionIndex = 0;
        const shuffledAnswersObject = prepareAndShuffleAnswers(quizApp.loadedQuestions[quizApp.currentQuestionIndex]);
        quizApp.currentCorrectAnswer = shuffledAnswersObject.correctAnswerIndex;
        addQuizContainerElements();
        displayQuestion(quizApp.loadedQuestions[quizApp.currentQuestionIndex], shuffledAnswersObject.answers);
        $(".quiz-container").css("display", "flex");

    } catch (error) {
        showErrorContainer(2);
        console.error(error);
    }
}


//v případě malého množství otázek pomocí této funkce zjistíme kolik otázek můžeme dostat v dané kategorii ale bez nastavení obtížnosti
async function getNewQuestionCount(amount, category) {
    try{
        const desiredQuestionCount = amount;
        const loadedQuestionCount = await loadQuestionCount(category);
        let newQuestionCount;
        if (desiredQuestionCount < loadedQuestionCount.total_question_count) {
            newQuestionCount = desiredQuestionCount;
            return newQuestionCount;
        }
        newQuestionCount = loadedQuestionCount.total_question_count;
        return newQuestionCount;
    }
    catch(error){
        showErrorContainer(3);
        console.error(error);
    }
}

function loadQuestionCount(category) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "https://opentdb.com/api_count.php?category=" + category,
            method: "GET",
            success: function (data) {
                if (data && data.category_question_count) {
                    resolve(data.category_question_count);
                }
                else {
                    reject("Error while retrieving question count for the category from API.");
                    showErrorContainer(3);
                }
            },
            error: function (error) {
                const errorMessage = "Error loading categories from API: ";
                reject(errorMessage);
                showErrorContainer(3);
            }
        });
    });
}

function addQuizContainerElements() {
    const quizContainer = $(".quiz-container");
    // Vytvoření obsahu pro výsledky
    const quizContent = `
<div class="quiz-header">
<div id="question-number" class="question-number"></div>
<h2 id="category-title" class="category-title"></h2>
<div id="points-number" class="points-number">0 pts.</div>
</div>
<p id="question-text"></p>
<form id="answers-form" class="answers-form">
<label>
  <input type="radio" name="answer" value="1">
  <span id="answer-1"></span>
</label>
<label>
  <input type="radio" name="answer" value="2">
  <span id="answer-2"></span>
</label>
<label>
  <input type="radio" name="answer" value="3">
  <span id="answer-3"></span>
</label>
<label>
  <input type="radio" name="answer" value="4">
  <span id="answer-4"></span>
</label>
<button type="submit" id="answer-button" class="control-button">Confirm answer</button>
</form>
<button type="button" id="quiz-mute-button" class="quiz-mute-button">Mute</button>
`;
    // Vložení obsahu do quizContainer
    quizContainer.html(quizContent);
    if (quizApp.muted === false) {
        $("#quiz-mute-button").css("background-color", "#4caf50");
    }
}

// Funkce pro vykreslení hodnot formu
function displayQuestion(question, shuffledAnswers) {
    const radioButtons = $("input[type='radio'][name='answer']");
    const answerElements = $("#answer-1, #answer-2, #answer-3, #answer-4");
    radioButtons.prop("checked", false).prop("disabled", false);

    $("#category-title").html(question.category);
    $("#question-number").html("Question " + (quizApp.currentQuestionIndex + 1));
    $("#question-text").html(question.question);

    answerElements.each(function (index) {
        $(this).html(shuffledAnswers[index]);
        $(this).css("color", "white");
    });

    if (shuffledAnswers.length === 2) {
        answerElements.slice(-2).html("");
        radioButtons.slice(-2).prop("disabled", true);
    }
}

//otázky se přidají do jednoho pole které se zamíchá a uloží se index správné odpovědi
function prepareAndShuffleAnswers(question) {
    const allAnswers = [...question.incorrect_answers, question.correct_answer];
    const shuffledAnswers = [...allAnswers];
    let correctAnswer;

    for (let i = shuffledAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledAnswers[i], shuffledAnswers[j]] = [shuffledAnswers[j], shuffledAnswers[i]];
    }

    correctAnswer = shuffledAnswers.findIndex(answer => answer === question.correct_answer) + 1;

    return {
        answers: shuffledAnswers,
        correctAnswerIndex: correctAnswer
    };
}

async function renderCategories() {
    try {
        quizApp.loadingSlider.show();
        quizApp.progressAnimation.play();

        quizApp.loadedCategories = await loadCategories();
        const categoriesContainer = $("#selection-container");

        const categoryElements = quizApp.loadedCategories.map(category => {
            const categoryCard = $("<div>").addClass("category-card").attr("data-category-id", category.id);
            const categoryNameWithoutPrefix = category.name.replace(/^[^:]+: /, "");
            const categoryTitle = $("<h2>").text(categoryNameWithoutPrefix);

            return categoryCard.append(categoryTitle);
        });

        categoriesContainer.append(categoryElements);

        $(".home-container").css("display", "flex");
    } catch (error) {
        console.error(error);
        showErrorContainer(1);
    }
}

function loadCategories() {
    return new Promise(function (resolve, reject) {

        $.ajax({
            url: "https://opentdb.com/api_category.php",
            method: "GET",
            success: function (data) {
                if (data && data.trivia_categories) {
                    quizApp.progressAnimation.pause();
                    quizApp.progressAnimation.seek(0);
                    quizApp.loadingSlider.hide();
                    resolve(data.trivia_categories);
                } else {
                    reject("Chyba při získávání kategorií z API.");
                    showErrorContainer(1);
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                const errorMessage = "Chyba při načítání kategorií z API: ";
                console.error(errorMessage, xhr, textStatus, errorThrown);
                reject(errorMessage);
                quizApp.progressAnimation.pause();
                quizApp.progressAnimation.seek(0);
                quizApp.loadingSlider.hide();
                showErrorContainer(1);
            }
        });
    });
}

function showResults() {
    // Získání elementu, do kterého budeme výsledky zobrazovat
    const quizContainer = $(".quiz-container");

    const percentageScore = calculateAndSaveScore();
    const points = quizApp.currentPoints;
    const totalQuestions = quizApp.loadedQuestions.length;
    const resultContent = `
        <h2>Quiz Results</h2>
        <button type="button" id="fb-share-button" class="fb-share-button">Share on Facebook</button>
        <p>Total Questions: ${totalQuestions}</p>
        <p>Correct Answers: ${points}</p>
        <p>Score: ${percentageScore}%</p>
        <div class="button-group">
        <button type="button" id="home-button" class="control-button">Home</button>
        <button type="button" id="highscores-button" class="control-button">Highscores</button>
        </div>
    `;
    // Vložení obsahu do elementu
    quizContainer.html(resultContent);
}

function calculateAndSaveScore() {
    const points = quizApp.currentPoints;
    const totalQuestions = quizApp.loadedQuestions.length;
    const percentageScore = ((points / totalQuestions) * 100).toFixed(2);
    const category = $(".category-card.active").data("category-id");
    saveHighScoreToLocalStorage(points, totalQuestions, percentageScore, category);
    return percentageScore;
}


function saveHighScoreToLocalStorage(points, totalQuestions, percentageScore, categoryID) {
    const existingHighScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const category = categoryID !== undefined ? categoryID : 0;

    // Přidání nového high score s aktuálním datem
    const newHighScore = {
        category: category,
        points: points,
        questions: totalQuestions,
        percentage: percentageScore,
        date: new Date().toLocaleDateString("en-GB")
    };

    existingHighScores.push(newHighScore);

    // Seřazení záznamů podle percentage sestupně
    existingHighScores.sort((a, b) => b.percentage - a.percentage);

    // Omezení počtu záznamů ve stejné kategorii na 10
    const filteredHighScores = {};
    existingHighScores.forEach(score => {
        if (!filteredHighScores[score.category]) {
            filteredHighScores[score.category] = [];
        }

        if (filteredHighScores[score.category].length < 10) {
            filteredHighScores[score.category].push(score);
        }
    });

    const limitedHighScores = Object.values(filteredHighScores).flat();

    // Uložení high score do Local Storage
    localStorage.setItem("highScores", JSON.stringify(limitedHighScores));
}

async function displayHighScores(categoryID) {
    const quizContainer = $(".quiz-container");
    quizContainer.hide();
    quizApp.loadingSlider.show();
    quizApp.progressAnimation.play();

    const categoriesMap = await getHighScoresExistingCategoriesWithNames();
    const fetchedHighScores = getHighScoresFromLocalStorage(categoryID);

    // Mapování id kategorie k nazvu kategorie z api
    const categoryNamesMap = fetchedHighScores.map(score => ({
        ...score,
        categoryName: (score.category === 0) ? "No Category" : categoriesMap[score.category]
    }));

    const categorySelector = displayHighScoreSelector(categoriesMap);
    // selector bude mít vybranou hodnotu aktualni kategorie
    categorySelector.val(categoryID);

    // tabulka s vysledky
    const table = $("<table>").addClass("high-score-table");
    const headerRow = $("<tr>").html(`<th>Score</th><th>Questions</th><th>Percentage</th><th>Category</th><th>Date</th>`);
    table.append(headerRow);

    categoryNamesMap.forEach(score => {
        const row = $("<tr>").html(`<td>${score.points}</td>
                                    <td>${score.questions}</td>
                                    <td>${score.percentage}</td>
                                    <td>${score.categoryName}</td>
                                    <td>${score.date}</td>`
        );
        table.append(row);
    });

    const homeButton = $("<button>").attr("id", "home-button").attr("type", "button").addClass("control-button").text("Home");
    quizContainer.empty().append(categorySelector, table, homeButton);
    quizApp.progressAnimation.pause();
    quizApp.progressAnimation.seek(0);
    quizApp.loadingSlider.hide();
    quizContainer.css("display", "flex");

}

function displayHighScoreSelector(categoriesMap) {
    //Vytvoření selektoru kategorie
    const categorySelector = $("<select>").addClass("category-selector");
    categorySelector.append($("<option>").val("").text("Všechny kategorie"));
    categorySelector.append($("<option>").val("0").text("Bez kategorie"));

    //Přidání kategorií do selektoru
    Object.entries(categoriesMap).forEach(([categoryId, categoryName]) => {
        const option = $("<option>").val(categoryId).text(categoryName);
        categorySelector.append(option);
    });

    //udalost
    categorySelector.on("change", function () {
        const selectedCategory = $(this).val();
        const resultSelectedCategory = selectedCategory !== "" ? parseInt(selectedCategory) : undefined;
        displayHighScores(resultSelectedCategory);
    });
    return categorySelector;
}

async function getHighScoresExistingCategoriesWithNames() {
    const storedHighScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const existingCategories = [...new Set(storedHighScores.map(score => score.category))];

    const categoriesFromAPI = await loadCategories();

    const categoriesMap = {};

    existingCategories.forEach(existingCategoryId => {
        const foundCategory = categoriesFromAPI.find(category => category.id.toString() === existingCategoryId.toString());
        if (foundCategory) {
            categoriesMap[existingCategoryId.toString()] = foundCategory.name;
        }
    });

    return categoriesMap;
}

function getHighScoresFromLocalStorage(categoryID) {
    const storedHighScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // Filtruj high score pouze pro danou kategorii
    const filteredHighScores = categoryID !== undefined
        ? storedHighScores.filter(score => score.category === categoryID)
        : storedHighScores;

    // Serad high score podle percentage a points
    filteredHighScores.sort((a, b) => {
        const percentageA = parseFloat(a.percentage) || 0;
        const percentageB = parseFloat(b.percentage) || 0;

        if (percentageA === percentageB) {
            return (parseInt(b.points) || 0) - (parseInt(a.points) || 0);
        }
        return percentageB - percentageA;
    });

    //vracime pouze 15 nejlepsich vysledku
    return filteredHighScores.slice(0, 15);
}


//zobrazi error container s chybou (pro fatalni chyby znemoznujic hru)
function showErrorContainer(errorID) {
    const errorInfo = getErrorInfo(errorID);
    const errorContainer = $("#error-container");
    const errorContent = `
    <img class="error-img" src="https://cdn0.iconfinder.com/data/icons/shift-interfaces/32/Error-512.png" width="200">
    <h1 class="error-heading" id="error-heading">${errorInfo.title}</h1>
    <p id="error-text">${errorInfo.description}</p>
    <button type="button" id="error-button-${errorInfo.buttonType}" class="control-button">Try again</button>
    `;
    // Vložení obsahu do elementu
    errorContainer.html(errorContent);

    errorContainer.css("display", "flex");
}

function getErrorInfo(errorID) {
    const errorCodeInfo = {
        1: {
            title: "Chyba načtení kategorií",
            description: "Došlo k chybě při stahování kategorií z API, zkuste to prosím později, případně kontaktujte správce",
            buttonType: "refresh"
        },
        2: {
            title: "Chyba načtení otázek",
            description: "Došlo k chybě při stahování otázek z API, zkuste to prosím později, případně kontaktujte správce",
            buttonType: "home"
        },
        3: {
            title: "Neexistuje dané množství otázek pro kategorii a obtížnost",
            description: "Zkuste zmenšit množství otázek a nebo nevybírat obtížnost, případně kontaktujte správce",
            buttonType: "home"
        },
    };
    return errorCodeInfo[errorID];
}


function createProgressAnimation() {
    return anime({
        targets: "#loading-progress",
        width: "100%",
        duration: 500,
        easing: "linear",
        loop: true
    });
}



function hideWithAnimation(target) {
    return new Promise((resolve) => {
        anime({
            targets: target,
            opacity: [1, 0],
            duration: 500,
            easing: "linear",
            complete: () => {
                $(target).hide();
                $(target).css("opacity", "1");
                resolve();
            },
        });
    });
}


function showWithAnimation(target, isFlex) {
    $(target).css("opacity", "0");
    if (isFlex === true) {
        $(target).css("display", "flex");
    }
    else {
        $(target).show();
    }
    anime({
        targets: target,
        opacity: [0, 1],
        duration: 1000,
        easing: "linear"
    });
}

function displayMinorErrorMessage(message) {
    anime({
        targets: "body > *:not(.error-message)",
        filter: "blur(5px)",
        duration: 500,
        easing: "easeOutQuad",
    });

    const errorMessageElement = $("<div>").addClass("error-message").text(message);

    const hideButton = $("<button>").addClass("error-message-btn").text("Hide").attr("type", "button")
        .on("click", function () {
            errorMessageElement.remove();

            anime({
                targets: "body > *:not(.error-message)",
                filter: "blur(0px)",
                duration: 500,
                easing: "easeOutQuad",
            });
        });

    errorMessageElement.append(hideButton);

    $("body").append(errorMessageElement);
}

function playCorrectSound() {
    if (quizApp.muted === true) {
        return;
    }
    if (quizApp.currentCorrectSound === 4) {
        quizApp.currentCorrectSound = 0;
    }
    document.getElementById(quizApp.correctSounds[quizApp.currentCorrectSound]).play();
    quizApp.currentCorrectSound++;
}

function playIncorrectSound() {
    if (quizApp.muted === true) {
        return;
    }
    if (quizApp.currentIncorrectSound === 4) {
        quizApp.currentIncorrectSound = 0;
    }
    document.getElementById(quizApp.incorrectSounds[quizApp.currentIncorrectSound]).play();
    quizApp.currentIncorrectSound++;
}

function facebookLogin() {
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            console.log('User is already logged in:', response.authResponse);
            quizApp.accessToken = response.authResponse.accessToken;
            // Handle the case when the user is already logged in
        } else {
            console.log('User is not logged in. Initiating login...');
            // User is not logged in, initiate login
            FB.login(function(loginResponse) {
                if (loginResponse.authResponse) {
                    console.log('Login successful:', loginResponse.authResponse);
                    quizApp.accessToken = response.authResponse.accessToken;
                    // Handle the logged-in user, e.g., send data to your server
                } else {
                    console.log('Login cancelled.');
                }
            }, { scope: 'public_profile,email' });
        }
    });
}

function publishPost(message) {
    // Příspěvek, který chcete publikovat
    const postParams = {
        message: message,
        access_token: quizApp.accessToken
    };

    // Odešlete požadavek na publikaci příspěvku
    FB.api('/me/feed', 'post', postParams, function(response) {
        if (!response || response.error) {
            console.error('Chyba při publikaci příspěvku:', response.error);
        } else {
            console.log('Příspěvek byl úspěšně publikován:', response.id);
        }
    });
}