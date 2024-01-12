const Program = {

    allQuestions: [],
    questionsToDisplay: [],
    currentQuestionIndex: 0,
    quizStarted: false,
    questionCategories: new Set(),
    questionDifficulties: new Set(),
    messageDisplayDurationMillis: 1500,
    messageSlideDurationMillis: 1500,

    dbsettings: {
        "async": true,
        "crossDomain": true,
        "url": "https://mathquestiondb-3713.restdb.io/rest/questions",
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": "65a0ea22e350952b55dc1636",
            "cache-control": "no-cache"
        }
    },

    loadQuestions() {
        $.ajax(Program.dbsettings)
            .done(function (response) {
                Program.allQuestions = response;

                Program.allQuestions.forEach((question) => Program.questionCategories.add(question.category));
                Program.allQuestions.forEach((question) => Program.questionDifficulties.add(question.difficulty));

                const documentFragmentCategories = document.createDocumentFragment();
                const documentFragmentDifficulties = document.createDocumentFragment();

                for (category of Array.from(Program.questionCategories)) {
                    const opt = document.createElement("option");
                    opt.innerHTML = category;
                    opt.setAttribute("value", category);
                    documentFragmentCategories.appendChild(opt);
                }

                for (difficulty of Array.from(Program.questionDifficulties)) {
                    const opt = document.createElement("option");
                    opt.innerHTML = difficulty;
                    opt.setAttribute("value", difficulty);
                    documentFragmentDifficulties.appendChild(opt);
                }

                $("#select-category").append(documentFragmentCategories);
                $("#select-difficulty").append(documentFragmentDifficulties);

                Program.showQuestionSelection();
            })
            .fail(function (xhr, status, error) {
                window.alert("Nastala chyba při načítání databáze otázek.");
            });
    },

    updateSelectedQuestions() {
        Program.questionsToDisplay = Program.allQuestions;
        const category = $("#select-category").val();
        const difficulty = $("#select-difficulty").val();

        if (category != "Vše") {
            Program.questionsToDisplay = Program.questionsToDisplay.filter((question) => category == question.category);
        }
        if (difficulty != "Vše") {
            Program.questionsToDisplay = Program.questionsToDisplay.filter((question) => difficulty == question.difficulty);
        }

        Program.currentQuestionIndex = 0;
    },

    updateQuestionViewer() {
        if (Program.questionsToDisplay.length == 0) {
            Program.showNoQuestionScreen();
            Program.quizStarted = false;
        } else if (Program.currentQuestionIndex >= Program.questionsToDisplay.length) {
            Program.showFinishScreen();
            Program.quizStarted = false;
        } else {
            Program.setAnsweredState(false);
            $("#question-field").text(Program.questionsToDisplay[Program.currentQuestionIndex].text);
            Program.clearAnswerForms();
            $("#question-number-indicator").text(`Otázka ${Program.currentQuestionIndex + 1} z ${Program.questionsToDisplay.length}.`);
            Program.setQuestionViewerForType(Program.questionsToDisplay[Program.currentQuestionIndex].type);
            MathJax.typeset();
            Program.showQuestionViewer();
        }
    },

    setQuestionViewerForType(type) {
        switch (type) {
            case "shortanswer":
                $("#shortanswer-form").show();
                $("#truefalse-form").hide();
                break;
            case "truefalse":
                $("#shortanswer-form").hide();
                $("#truefalse-form").show();
                break;
        }
    },

    clearAnswerForms() {
        $("#shortanswer-field").val("");
        $("input[name='tf-response']").prop("checked", false);
    },

    setAnsweredState(answered) {
        if (answered) {
            $("#btn-check-answer").prop("class", "btn btn-secondary");
            $("#btn-check-answer").prop("disabled", true);
            $("#btn-next-question").prop("class", "btn btn-primary");
            $("#btn-next-question").prop("disabled", false);
            $("#shortanswer-field").prop("disabled", true);
            $("input[name='tf-response']").prop("disabled", true);
        } else {
            $("#btn-check-answer").prop("class", "btn btn-primary");
            $("#btn-check-answer").prop("disabled", false);
            $("#btn-next-question").prop("class", "btn btn-secondary");
            $("#btn-next-question").prop("disabled", true);
            $("#shortanswer-field").prop("disabled", false);
            $("input[name='tf-response']").prop("disabled", false);
        }
    },

    showSpinner() {
        $("nav").hide();
        $("header").hide();
        $("#question-set-selector").hide();
        $("#question-viewer").hide();
        $("#spinner").show();
        $("#no-questions-screen").hide();
        $("#finish-screen").hide();
    },

    showQuestionSelection() {
        $("nav").show();
        $("header").show();
        $("#question-set-selector").show();
        $("#question-viewer").hide();
        $("#spinner").hide();
        $("#no-questions-screen").hide();
        $("#finish-screen").hide();
    },

    // used internally by updateQuestionViewer, do not call this directly as it doesn't check for existence of questions
    showQuestionViewer() {
        $("nav").show();
        $("header").hide();
        $("#question-set-selector").hide();
        $("#question-viewer").show();
        $("#spinner").hide();
        $("#no-questions-screen").hide();
        $("#finish-screen").hide();
    },

    showNoQuestionScreen() {
        $("nav").show();
        $("header").hide();
        $("#question-set-selector").hide();
        $("#question-viewer").hide();
        $("#spinner").hide();
        $("#no-questions-screen").show();
        $("#finish-screen").hide();
    },

    showFinishScreen() {
        $("nav").show();
        $("header").hide();
        $("#question-set-selector").hide();
        $("#question-viewer").hide();
        $("#spinner").hide();
        $("#no-questions-screen").hide();
        $("#finish-screen").show();
    },

    validateShortAnswer() {
        let correct = false;
        const userAnswers = $("#shortanswer-field").val().split(/\s*,\s*/);
        const databaseAnswers = Program.questionsToDisplay[Program.currentQuestionIndex].answer.split(/\s*,\s*/);
        if ((userAnswers.length > 0) && (userAnswers.length == databaseAnswers.length)) {
            try {
                for (let i = 0; i < databaseAnswers.length; i++) {
                    for (let j = 0; j < userAnswers.length; j++) {
                        if (math.symbolicEqual(databaseAnswers[i], userAnswers[j])) {
                            databaseAnswers.splice(i, 1);
                            userAnswers.splice(j, 1);
                            --i; // remember to move the index back since we lost an element!
                            break;
                        }
                    }
                }
                correct = (userAnswers.length == 0) && (databaseAnswers.length == 0);
                if (correct) {
                    Program.setAnsweredState(true);
                    ++Program.currentQuestionIndex;
                }
            } catch (err) {
                console.log(err);
            }
        }
        Program.showResultMessage(correct ? "correct" : "incorrect");
    },

    validateTrueFalse() {
        let correct = $("input[name=tf-response]:checked", "#truefalse-form").val() == Program.questionsToDisplay[Program.currentQuestionIndex].answer;
        if (correct) {
            Program.setAnsweredState(true);
            ++Program.currentQuestionIndex;
        }
        Program.showResultMessage(correct ? "correct" : "incorrect");
    },

    showResultMessage(result) {
        $(`#${result}-message`).fadeTo(Program.messageDisplayDurationMillis, Program.messageSlideDurationMillis).slideUp(Program.messageSlideDurationMillis, function () {
            $(`#${result}-message`).slideUp(Program.messageSlideDurationMillis);
        });
    },

    init() {
        Program.showSpinner();
        Program.loadQuestions();

        $("#btn-start-quiz").on("click", () => {
            if (!Program.quizStarted) {
                Program.quizStarted = true;
                Program.showSpinner();
                Program.updateSelectedQuestions();
                Program.updateQuestionViewer();
            } else {
                $("#dialog-confirm").dialog({
                    resizable: false,
                    height: "auto",
                    width: 400,
                    modal: true,
                    buttons: {
                        "Nový kvíz": function () {
                            Program.quizStarted = true;
                            Program.showSpinner();
                            Program.updateSelectedQuestions();
                            Program.updateQuestionViewer();
                            $(this).dialog("close");
                        },
                        "Původní kvíz": function () {
                            // do nothing
                            Program.updateQuestionViewer();
                            $(this).dialog("close");
                        }
                    }
                });
            }
        });

        $("#btn-next-question").on("click", () => {
            $("#correct-message").hide(); //dirty fix to hide "correct" message immediately
            Program.updateQuestionViewer();
        });

        $("#btn-check-answer").on("click", () => {
            if (Program.questionsToDisplay[Program.currentQuestionIndex].type == "shortanswer") {
                Program.validateShortAnswer();
            } else if (Program.questionsToDisplay[Program.currentQuestionIndex].type == "truefalse") {
                Program.validateTrueFalse();
            }
        });

        $("#btn-quit-quiz").on("click", () => {
            Program.showQuestionSelection();
        });

        $(".btn-refresh").on("click", () => {
            Program.showQuestionSelection();
        });

        $("#home-button").on("click", () => {
            Program.showQuestionSelection();
        });

        $("#info-popup-button").on("click", () => {
            window.alert("Program pro 4iz268.\nPodobnost s jinými školami čistě náhodná. :)");
        });

        // it seems to be necessary to override this
    }
};

$(function () {
    Program.init();
});