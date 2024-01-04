// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"
// import { collection, getDocs, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"
// import { query, orderBy, limit, where, onSnapshot } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";



const firebaseConfig = {
  apiKey: "AIzaSyBdfFoWwK-7fikkdr7FILO0GWozM-53KT0",
  authDomain: "sw02-ff39a.firebaseapp.com",
  projectId: "sw02-ff39a",
  storageBucket: "sw02-ff39a.appspot.com",
  messagingSenderId: "836948307385",
  appId: "1:836948307385:web:e5bbf868acf984d3a05a68",
  measurementId: "G-HQPB604937",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// export { app, db, collection, getDocs, Timestamp, addDoc };
// export { query, orderBy, limit, where, onSnapshot };

// const questionsCollection = collection(db, 'questions');
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const questionsRef = ref(db, 'questions');
const scoreRef = ref(db, 'score');



// Adding a question
function addNewQuestion() {
    const appQuestionContainer = $('#add-questions');

    const pageNameQuestion = $('<h1>Přidání nové otázky</h1>');

    const newQuestion = $('<div class=new-question></div>');
    const questionText = $('<p class="add-question-text">Vložte otázku:</p>');
    const answerText = $('<p class="add-question-text">Vložte správnou odpověď:</p>');

    const inputQ = $('<textarea placeholder="Otázka" class="add-question"></textarea>');
    const inputA = $('<textarea placeholder="Odpověď" class="add-question"></textarea>');
    const addQuestion = $('<button class="add-question-submit">Přidat</button>');
    const backToMain = $('<button class="add-question-submit">Zpět</button>');

    newQuestion.append(questionText, questionText, inputQ, answerText, inputA, addQuestion, backToMain);
    appQuestionContainer.append(pageNameQuestion, newQuestion);

    backToMain.on('click', function() {
        appQuestionContainer.empty();
        mainPage();    
    });


    addQuestion.on('click', function() {
        console.log('probehlo');
        const questionText = inputQ.val();
        const answerText = inputA.val();
    
        // Assuming you have already initialized the Realtime Database
        const questionsRef = ref(db, 'questions');
    
        try {
            // Push a new question to the Realtime Database
            const newQuestionRef = push(questionsRef);
            set(newQuestionRef, {
                question: questionText,
                answer: answerText
            });
    
            console.log('Question added with ID:', newQuestionRef.key);
    
            // Clear the input fields after successful addition
            inputQ.val('');
            inputA.val('');
        } catch (error) {
            console.error('Error adding question to Realtime Database:', error);
        }
    });
};
// addNewQuestion();

function mainPage() {
    const appMainContainer = $('#main-page');

    const pageNameMain = $('<h1>Aplikace na učení</h1>');

    const startTest = $('<div class="start-test"></div>');
    startTest.append('<h2>ZAČÍT TEST!</h2>');
    startTest.append('<input type="number" id="num-questions" placeholder="How many questions?"/>');
    const buttonTest = $('<button id="start-test-button">test</button>');
    startTest.append(buttonTest);

    const editQuestionButton = $('<button class="questions-main-button">Smazat otázky</button>');
    const addQuestionButton = $('<button class="questions-main-button">Přidat otázky</button>');
    const buttonsMain = $('<div class="buttons-main"></div>');
    buttonsMain.append(addQuestionButton, editQuestionButton);

    const latestResultMain = $('<div class="latest-result-main"></div>');
    latestResultMain.append('<h2>Výsledky posedního testu</h2>');
    const resultNew = $();

    const scoreNodeRef = ref(db, 'score');
    onValue(scoreNodeRef, (snapshot) => {
        const scoreData = snapshot.val();
        if (scoreData && scoreData.totalScore !== undefined) {
            const resultNew = $('<h3 id=new-result>Skóre: ' + scoreData.totalScore + '</h3>');
        } else {
            const resultNew = $('<h3 id=new-result>Žádné skóre</h3>');
        }
    });

    latestResultMain.append(resultNew);  

    appMainContainer.append(pageNameMain, startTest, buttonsMain,latestResultMain);

    addQuestionButton.on('click', function() {
        appMainContainer.empty();
        addNewQuestion();    
    });
    buttonTest.on('click', function() {
        appMainContainer.empty();
        testPage();    
    });
    editQuestionButton.on('click', function() {
        appMainContainer.empty();
        editPage();    
    });

    // total number of questions, limiting input to max that
    // db.collection('questions').get().then((querySnapshot) => {
    //     const totalQuestions = querySnapshot.size;
    //     $('#num-questions').attr('max', totalQuestions);
    // });
};
mainPage();


function testPage() {
    const appTestContainer = $('#test-page');

    const pageNameTest = $('<h1>Test</h1>');
    const numQuestions = $('#num-questions').val();
    let totalScore = 0;

    const questions = $('<div class=question></div>');
    const question = $('<p>Tady bude otazka</p>');
    const buttonT = $('<button class="answer-button">Správně (+1)</button>');
    const buttonF = $('<button class="answer-button">Špatně (0)</button>')
    const buttonShow = $('<button class="show-button">Ukázat odpověď</button>')
    const answer = $('<p>Tady se ukaze odpoved</p>')

    questions.append(question, buttonShow, answer, buttonT, buttonF);

    const finishTest = $('<button class="end-test">Ukončit test</button>')
    const backToMainTest = $('<button class="test-main">Zpět</button>');
    appTestContainer.append(pageNameTest, questions, finishTest, backToMainTest);
    // appTestContainer.append(pageNameTest, questionsContainer, finishTest, backToMainTest);

    backToMainTest.on('click', function() {
        appTestContainer.empty();
        mainPage();    
    })

    finishTest.on('click', function () {
        appTestContainer.empty();
        const scoreNodeRef = ref(db, 'score');
        set(scoreNodeRef, { totalScore: totalScore });
        mainPage();
    });

    // const questionsRef = ref(db, 'questions');
    // onValue(questionsRef, (snapshot) => {
    //     const questionsData = snapshot.val();
    //     if (questionsData) {
    //         const questionIds = Object.keys(questionsData);
            
    //         // Shuffle the array of question IDs to randomize the order
    //         const shuffledQuestionIds = shuffleArray(questionIds);

    //         // Take a subset of questions based on the user's specified number
    //         const selectedQuestionIds = shuffledQuestionIds.slice(0, numQuestions);

    //         selectedQuestionIds.forEach((questionId) => {
    //             const questionData = questionsData[questionId];
    //             const questionElement = $('<div class="question"></div>');
    //             const questionText = $('<p></p>').text(questionData.question);
    //             const answerText = $('<p></p>').text(questionData.answer);
    //             const buttonShow = $('<button class="show-button">Ukázat odpověď</button>');
    //             const answer = $('<p class="answer"></p>').text(questionData.answer);
    //             const buttonT = $('<button class="answer-button">Správně (+1)</button>');
    //             const buttonF = $('<button class="answer-button">Špatně (0)</button>');

    //             // show answer and hide buttons after answering
    //             answer.hide();
    //             buttonShow.on('click', function () {
    //                 answer.show();
    //                 buttonShow.hide();
    //             });

    //             buttonT.on('click', function () {
    //                 totalScore += 1;
    //                 buttonT.hide();
    //                 buttonF.hide();
    //             });

    //             buttonF.on('click', function () {
    //                 buttonT.hide();
    //                 buttonF.hide();
    //             });

    //             questionElement.append(questionText, buttonShow, answer, buttonT, buttonF);
    //             questionsContainer.append(questionElement);
    //         });
    //     }
    // });



    // show answer and hide buttons after answering
    answer.hide();
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
// testPage();


function editPage() {
    const appEditContainer = $('#edit-page');

    const pageNameEdit = $('<h1>Editor otázek</h1>');
    const backToMainEdit = $('<button id="edit-main">Zpět</button>');

    const questionList = $('<ul class="question-list"></ul>');

    const questionAnswer = $('<div class="question-answer"></div>');
    const questionEdit = $('<p>Tady bude otazka</p>');
    const answerEdit = $('<p>Tady bude oodpověď</p>');
    const deleteQ = $('<button class="edit-qa">Smazat otázku</button>');
    questionAnswer.append(questionEdit ,answerEdit, deleteQ);

    const questionsRef = ref(db, 'questions');
    onValue(questionsRef, (snapshot) => {
        const questionsData = snapshot.val();
        if (questionsData) {
            Object.keys(questionsData).forEach((questionId) => {
                const questionData = questionsData[questionId];
                const questionItem = $('<li class="question-item"></li>');
                const questionText = $('<p class="edit-question-text"></p>').text(questionData.question);
                const answerText = $('<p class="edit-question-text"></p>').text(questionData.answer);
                const deleteButton = $('<button class="edit-qa">Smazat otázku</button>');

                // Delete question from both the displayed list and the database
                deleteButton.on('click', function () {
                    questionItem.remove();
                    // Assuming you have already initialized the Realtime Database
                    const questionRefToDelete = ref(db, 'questions/' + questionId);
                    set(questionRefToDelete, null);
                });

                questionItem.append(questionText, answerText, deleteButton);
                questionList.append(questionItem);
            });
        }
    });

    appEditContainer.append(pageNameEdit, questionAnswer, backToMainEdit);

    backToMainEdit.on('click', function() {
        appEditContainer.empty();
        mainPage();    
    })
}
// editPage();

