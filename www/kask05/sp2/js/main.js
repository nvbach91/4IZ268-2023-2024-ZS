// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"
// import { collection, getDocs, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"
// import { query, orderBy, limit, where, onSnapshot } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getDatabase, ref, push, get, set, child, onValue, remove, update } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";



const firebaseConfig = {
    apiKey: "AIzaSyBdfFoWwK-7fikkdr7FILO0GWozM-53KT0",
    authDomain: "sw02-ff39a.firebaseapp.com",
    databaseURL: "https://sw02-ff39a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "sw02-ff39a",
    storageBucket: "sw02-ff39a.appspot.com",
    messagingSenderId: "836948307385",
    appId: "1:836948307385:web:e5bbf868acf984d3a05a68",
    measurementId: "G-HQPB604937"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// export { app, db, collection, getDocs, Timestamp, addDoc };
// export { query, orderBy, limit, where, onSnapshot };

// const questionsCollection = collection(db, 'questions');
const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);
// const questionsRef = ref(db, 'questions');
// const scoreRef = ref(db, 'score');



// Adding a question
function addNewQuestion() {
    const appQuestionContainer = $('#add-questions');

    const pageNameQuestion = $('<h1>Přidání nové otázky</h1>');

    const newQuestion = $('<div class="new-question"></div>');
    const addNewQ = $('<form class="add-new-question"></form>');

    const questionText = $('<p class="add-question-text">Vložte otázku:</p>');
    const answerText = $('<p class="add-question-text">Vložte správnou odpověď:</p>');

    const inputQ = $('<textarea placeholder="Otázka" class="add-question"></textarea>');
    const inputA = $('<textarea placeholder="Odpověď" class="add-question"></textarea>');
    const addQuestion = $('<button class="add-question-submit">Přidat</button>');
    const backToMain = $('<button class="add-question-submit">Zpět</button>');

    newQuestion.append(questionText, questionText, inputQ, answerText, inputA, addQuestion);
    addNewQ.append(newQuestion, backToMain)

    appQuestionContainer.append(pageNameQuestion, addNewQ);

    backToMain.on('click', function () {
        appQuestionContainer.empty();
        mainPage();
    });

    addQuestion.on('click', function () {
        event.preventDefault();
        const db = getDatabase();
        const questionsRef = ref(db, 'questions');
        const newQuestionRef = push(questionsRef);
        set(newQuestionRef, {
            questionText: inputQ.val(),
            answerText: inputA.val()
        });
        inputA.val('');
        inputQ.val('');
    });
};
// addNewQuestion();



function mainPage() {
    const appMainContainer = $('#main-page');

    const pageNameMain = $('<h1>Aplikace na učení</h1>');

    const startTest = $('<form class="start-test"></form>');
    startTest.append('<h2>ZAČÍT TEST!</h2>');
    startTest.append('<input type="number" id="num-questions" placeholder="How many questions?"/>');
    const buttonTest = $('<button id="start-test-button">test</button>');
    startTest.append(buttonTest);

    const editQuestionButton = $('<button class="questions-main-button">Smazat otázky</button>');
    const addQuestionButton = $('<button class="questions-main-button">Přidat otázky</button>');
    const buttonsMain = $('<div class="buttons-main"></div>');
    buttonsMain.append(addQuestionButton, editQuestionButton);
    const spinner1 = $('<div class="spinner"></div>');


    const latestResultMain = $('<div class="latest-result-main"></div>');
    latestResultMain.append('<h2>Výsledky posedního testu</h2>');
    const resultNew = $('<div id="new-result"></div>');
    const percentageResult = $('<div id="percentage-result"></div>');

    latestResultMain.append(spinner1)

    const db = getDatabase(app);
    const scoreNodeRef = ref(db, 'score');
    onValue(scoreNodeRef, (snapshot) => {
        const scoreData = snapshot.val();
        if (scoreData && scoreData.totalScore !== undefined) {
            const percentage = scoreData.percentageScore || 0;
            const scorePerQuestion = scoreData.questionAmount || 0;
            resultNew.html('<h3>Skóre: ' + scoreData.totalScore + '/' + scorePerQuestion + '</h3>');
            percentageResult.html('<h3>Procentuální skóre: ' + percentage.toFixed(2) + '%</h3>');
            spinner1.hide();
        } else {
            resultNew.html('<h3>Žádné skóre</h3>');
            percentageResult.html('');
        }
    });

    latestResultMain.append(resultNew, percentageResult);

    appMainContainer.append(pageNameMain, startTest, buttonsMain, latestResultMain);

    addQuestionButton.on('click', function () {
        appMainContainer.empty();
        addNewQuestion();
    });

    editQuestionButton.on('click', function () {
        appMainContainer.empty();
        editPage();
    });

    startTest.on('submit', function (event) {
        event.preventDefault();
        const numQuestions = $('#num-questions').val();
        appMainContainer.empty();
        testPage(numQuestions);
    });
};
mainPage();


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function testPage(questionAmount) {
    const appTestContainer = $('#test-page');

    const pageNameTest = $('<h1>Test</h1>');
    let totalScore = 0;

    const questionsContainer = $('<div class="questions-container"></div>');
    const finishTest = $('<button class="end-test">Ukončit test</button>')
    const backToMainTest = $('<button class="test-main">Zpět</button>');

    appTestContainer.append(pageNameTest, questionsContainer, finishTest, backToMainTest);

    backToMainTest.on('click', function () {
        appTestContainer.empty();
        mainPage();
    })

    finishTest.on('click', function () {
        const db = getDatabase(app);
        appTestContainer.empty();

        const scoreNodeRef = ref(db, 'score');
        const percentageScore = (totalScore / questionsContainer.children().length) * 100;

        set(scoreNodeRef, { totalScore: totalScore, percentageScore: percentageScore, questionAmount: questionsContainer.children().length });
        mainPage();
    });

    const db = getDatabase(app);
    const questionsRef = ref(db, 'questions');
    get(questionsRef).then((snapshot) => {

        const questionData = snapshot.val();

        if (questionData) {
            const questionsKeys = Object.keys(questionData);
            shuffleArray(questionsKeys);

            for (let i = 0; i < questionAmount && i < questionsKeys.length; i++) {
                const questionKey = questionsKeys[i];
                const question = questionData[questionKey];

                const questionElement = $('<div class="question"></div>');
                const questionText = $('<p>' + question.questionText + '</p>');
                const buttonShow = $('<button class="show-button">Ukázat odpověď</button>');
                const answer = $('<p class="test-answer-text" style="display: none;">' + question.answerText + '</p>');
                const buttonT = $('<button class="answer-button">Správně (+1)</button>');
                const buttonF = $('<button class="answer-button">Špatně (0)</button>');

                questionElement.append(questionText, buttonShow, answer, buttonT, buttonF);
                questionsContainer.append(questionElement);

                buttonShow.on('click', function () {
                    answer.show();
                    buttonShow.hide();
                });

                buttonT.on('click', function () {
                    totalScore += 1;
                    buttonT.hide();
                    buttonF.hide();
                });

                buttonF.on('click', function () {
                    buttonT.hide();
                    buttonF.hide();
                });
            }
        }
    });
}
// testPage();


function editPage() {
    const appEditContainer = $('#edit-page');
    appEditContainer.empty();

    const pageNameEdit = $('<h1>Smazaní otázek</h1>');
    const backToMainEdit = $('<button id="edit-main">Zpět</button>');


    const questionsContainer = $('<div class="questions-container"></div>');
    const spinner2 = $('<i class="spinner"></i>');
    appEditContainer.append(pageNameEdit, spinner2, questionsContainer, backToMainEdit);

    backToMainEdit.on('click', function () {
        appEditContainer.empty();
        mainPage();
    })


    const db = getDatabase(app);
    const questionsRef = ref(db, 'questions');
    get(questionsRef).then((snapshot) => {
        spinner2.hide();
        const questionData = snapshot.val();

        if (questionData) {
            const questionsKeys = Object.keys(questionData);
            const fragment = document.createDocumentFragment();

            questionsKeys.forEach((questionKey) => {
                const question = questionData[questionKey];

                const questionAnswer = $('<div class="question-answer"></div>');
                const questionEdit = $('<p>' + question.questionText + '</p>');
                const answerEdit = $('<p>' + question.answerText + '</p>');
                const deleteQ = $('<button class="edit-qa">Smazat otázku</button>');
                const editButton = $('<button class="edit-qa">Upravit otázku</button>');


                questionAnswer.append(questionEdit, answerEdit, deleteQ, editButton);
                fragment.appendChild(questionAnswer[0]);

                editButton.on('click', function () {
                    openEditModal(questionKey, question.questionText, question.answerText);
                });

                deleteQ.on('click', function () {
                    const questionRef = ref(db, 'questions/' + questionKey);

                    remove(questionRef)
                        .then(() => {
                            console.log('Question deleted');
                            // questionsContainer.empty();
                            // editPage();
                            questionAnswer.remove();
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                });
            });
            questionsContainer.append(fragment);
        }
    });

}


function openEditModal(questionKey, questionText, answerText) {
    const overlay = $('<div class="overlay"></div>');
    const modal = $('<div class="edit-modal"></div>');
    const questionInput = $('<textarea placeholder="Edit question"/>').val(questionText);
    const answerInput = $('<textarea placeholder="Edit answer"/>').val(answerText);
    const backButton = $('<button class="modal-button">Zpět</button>');
    const changeButton = $('<button class="modal-button">Uložit změny</button>');

    modal.append(questionInput, answerInput, backButton, changeButton);
    // modal.append(backButton, changeButton);
    overlay.append(modal);
    $('body').append(overlay);

    backButton.on('click', function () {
        overlay.remove();
    });

    changeButton.on('click', function () {
        const db = getDatabase(app);

        const oldQuestionRef = ref(db, 'questions/' + questionKey);
        remove(oldQuestionRef)
            .then(() => {
                const newQuestionRef = push(ref(db, 'questions'));
                set(newQuestionRef, {
                    questionText: questionInput.val(),
                    answerText: answerInput.val()
                }).then(() => {
                    overlay.remove();
                    editPage();
                }).catch((error) => {
                    console.error('Error adding new question:', error);
                });
            })
            .catch((error) => {
                console.error('Error removing old question:', error);
            });
    });
}
