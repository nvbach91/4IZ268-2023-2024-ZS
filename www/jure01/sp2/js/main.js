const App = {
    qnumber: 0,
    timer: null,
    minutes: 0,
    seconds: 0,
    correct_answers: 0,
    correct_answers_count: 0,
    total_answers_count: 0,
    run_answers_displayed: 0,
    number_of_questions: 4,
    current_index: 0,
    answers_ids_generated: [],
    result_history: [],
    questions: [],
    app: $("#app"),
    showHeader() {
        App.app.append(`
            <header>
                <div>
                    <h1>Vítá tě TestOS!</h1>
                </div>
            </header>
        `);
    },

    showMenu() {
        App.app.append(`
    <div id="menu_layout_mid_container">
        <div class="menu_layout_mid_hidden"></div>
        <div class="menu_layout_mid_hidden"></div>
        <div class="menu_layout_mid_visible">
        <button class="btn btn-info" id="statistics"><i class="fa fa-bar-chart" aria-hidden="true"></i>&nbsp;Moje statistiky</button></div>
    </div>
 
        <div id="subjects">
                <button class="btn btn-primary" id="test_zone"><span>Spustit test</span><br><br><span>VŠEhochuť</span></button>
            </div>
        `);
    },

    showQuestions() {
        this.fetchQuestions(() => {
            $("#ready").remove();
            this.appendQuestionLayout();
            App.displayQuestion();
            App.startTimer();
        });
    },

    fetchQuestions(callback) {

        const settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://testos-c187.restdb.io/rest/4-xx-666",
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "x-apikey": "6597297a4b51770192d282d6",
                "cache-control": "no-cache"
            }
        }

        $.ajax(settings).done(response => {
            App.questions = response;
            callback();
        })
            .fail(function (xhr, status, error) {
                const wordingArea = $("#wording");
                wordingArea.empty();
                $("#answers").empty();
                wordingArea.append(`<div class="btn btn-danger error-message"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i>&nbsp;Něco se rozbilo</div>`);
                console.error("Network response was not ok.");
                throw new Error("Network response was not ok.");
            });
    },

    displayQuestion() {
        const currentQuestion = App.questions[App.answers_ids_generated[App.current_index]];
        $("#wording").text(currentQuestion.question_text);
        $("#answers").empty();

        JSON.parse(currentQuestion.options).forEach((option, index) => {
            const optionCheckbox = `
                <div class="btn btn-secondary">
                    <input type="checkbox" id="option${index}" value="${option}">
                    <label for="option${index}">${option}</label>
                </div>`;
            $("#answers").append(optionCheckbox);
        });
    },

    appendQuestionLayout() {
        let bar = 0;
        $("#app").append(`
            <div id="question_container">
                <div class="question_and_answers">
                    <div class="border border-white rounded qtext" id="wording"></div>
                    <div id="answers"></div>
                    </form>
                </div>
                <div class="question_navigation">
                    <div class="border border-white rounded">
                        <div>Čas:</div>
                        <span id="minutes">00</span>:<span id="seconds">00</span>
                        <p>Úspěšnost:</p>
                        <div class="progress" role="progressbar" aria-label="Success example" aria-valuenow="${bar}" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar-striped bg-success" style="width: ${bar}%;">${bar}%</div>
                        </div>
                    </div>
                    <button class="btn btn-info" id="evaluate"><i class="fa fa-balance-scale" aria-hidden="true"></i>&nbsp;Vyhodnotit</button>
                    <button class="btn btn-warning" id="previous" disabled="true"><i class="fa fa-arrow-circle-left" aria-hidden="true"></i>&nbsp;Předchozí otázka</button>
                    <button class="btn btn-warning" id="next">Následující otázka&nbsp;<i class="fa fa-arrow-circle-right" aria-hidden="true"></i></button>
                    <button class="btn btn-light" id="home_button"><i class="fa fa-home" aria-hidden="true"></i>&nbsp;Domů</button>
                </div>
            </div>
        `);

    },

    startTimer() {
        this.timer = setInterval(this.updateTimer.bind(this), 1000);
    },

    updateTimer() {
        this.seconds++;
        if (this.seconds === 60) {
            this.seconds = 0;
            this.minutes++;
        }
        $("#seconds").text(("0" + this.seconds).slice(-2));
        $("#minutes").text(("0" + this.minutes).slice(-2));
    },

    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    bindEvents() {
        const self = this;

        // do not change to $("#statistics")... new statistics button is created on each display of the home screen
        $(document).on("click", "#statistics", function () {
            let testZoneTimeValue = localStorage.getItem("testZoneTime");
            let testZoneTimeString = Math.floor(testZoneTimeValue / 60) + " min " + Math.floor(testZoneTimeValue % 60) + " sec";
            App.result_history = JSON.parse(localStorage.getItem('resultHistory'));

            if (App.result_history != null && App.result_history.length > 0) {
                averageSuccessRate = 0.0;
                App.result_history.forEach((entry) => {
                    averageSuccessRate += parseFloat(entry);
                });
                averageSuccessRate /= App.result_history.length;
                averageSuccessRate = averageSuccessRate.toFixed(2) + " %";
            } else {
                averageSuccessRate = "Ještě jsi žádný test nevyplnil";
            }

            $("header").remove();
            $("#subjects").remove();
            $("#menu_layout_mid_container").remove();
            App.app.append(`
    <div id="statistics_container">
        <h2>Moje statistiky</h2>
       
        <table>
            <thead>
                <tr>
                    <th>Název:</th>
                    <th>Úspěšnost:</th>
                    <th>Strávený čas:</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td id="test_zone_name">VŠEhochuť</td>
                    <td id="average_success_rate">${averageSuccessRate}</td>
                    <td id="test_zone_time_total">${testZoneTimeString}</td>
                </tr>
            </tbody>
        </table>

        <h2>Historie pokusů</h2>
        <ul id="result_history_list"></ul>
   
        <button class="btn btn-danger" id="nuke_all">
            <i class="fa fa-bomb" aria-hidden="true"></i>&nbsp;Vymazat VŠE
        </button>
 
        <button class="btn btn-light" id="home_button_statistics">
            <i class="fa fa-home" aria-hidden="true"></i>&nbsp;Domů
        </button>
    </div>
    `);

            const frag = document.createDocumentFragment();
            const resultList = $("#result_history_list");

            if (App.result_history != null && App.result_history.length > 0) {
                App.result_history.forEach((entry) => {
                    const li = document.createElement("li");
                    li.textContent = entry + " %";
                    frag.appendChild(li);
                });
            } else {
                const li = document.createElement("li");
                li.textContent = "Zatím neproběhl žádný pokus";
                frag.appendChild(li);
            }

            resultList.append(frag);
        });

        $(document).on("click", "#test_zone", function () {
            for (let k = 0; k <= App.number_of_questions; k++) {

                App.answers_ids_generated[k] = rndInt = App.randomIntFromInterval(0, 12);
            }

            $("#subjects").remove();
            $("header").remove();
            $("#menu_layout_mid_container").remove();
            $("#app").append(`<div id="ready">
            <div class="spinner-grow text-primary" role="status"></div>
            <div>Načítání...</div>
        </div>`);
            App.showQuestions();
            if (self.qnumber + 1 == self.questions.length) {
                $("#next").prop("disabled", true);
            }
        });

        $(document).on("click", "#nuke_all", function () {

            Swal.fire({
                title: 'Opravdu chceš vymazat svoje statistiky?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Ano, chci',
                denyButtonText: 'Ne, nechci',
                customClass: {
                  actions: 'my-actions',
                  confirmButton: 'order-2',
                  denyButton: 'order-3',
                },
              }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.clear();
                    console.log('localStorage cleared');
                    localStorage.setItem('testZoneTime', 0);
                    localStorage.setItem('resultHistory', null);
                    App.result_history = [];
                    App.correct_answers_count = 0;
                    App.total_answers_count = 0;
                    $("#test_zone_time_total").text(0 + " min " + 0 + " sec");
                    $("#average_success_rate").text("Ještě jsi žádný test nevyplnil");
                    $("#result_history_list").html("Zatím neproběhl žádný pokus");
                  Swal.fire('Vymazáno!', 'Můžeš začít s čistým štítem.', 'success')
                } else if (result.isDenied) {
                  Swal.fire('Statistiky zůstaly tak, jak byly.', 'Najdeš je na svém místě.', 'info')
                }
              })




/*
            

            */
        });

        $(document).on("click", "#home_button", function () {
            let seconds = self.seconds;
            let minutes = self.minutes;

            let currentTestZoneTimeValue = parseInt(localStorage.getItem('testZoneTime'), 10) || 0;

            currentTestZoneTimeValue = currentTestZoneTimeValue + seconds + (minutes * 60);

            localStorage.setItem('testZoneTime', currentTestZoneTimeValue.toString());

            App.result_history = JSON.parse(localStorage.getItem('resultHistory'));
            if (App.result_history == null) {
                App.result_history = [];
            }
            let trialScoreValue = (App.correct_answers_count / App.total_answers_count * 100);
            if (isNaN(trialScoreValue)) {
                trialScoreValue = 0.0;
            }
            App.result_history.push(trialScoreValue.toFixed(2));
            localStorage.setItem('resultHistory', JSON.stringify(App.result_history));

            self.seconds = 0;
            self.minutes = 0;
            self.qnumber = 0;
            self.total_answers_count = 0;
            self.correct_answers_count = 0;
            App.run_answers_displayed = 0;
            App.answers_ids_generated = [];
            App.current_index = 0,
            clearInterval(self.timer);
            $("#question_container").remove();
            $("#statistics_container").remove();
            $("#home_button").remove();
            self.showHeader();
            self.showMenu();
        });

        $(document).on("click", "#home_button_statistics", function () {
            $("#statistics_container").remove();
            self.showHeader();
            self.showMenu();
        });

        $(document).on("click", "#evaluate", function () {
            App.total_answers_count++;
            let isResponseCorrect = true;

            for (let index = 0; index < App.questions[App.answers_ids_generated[App.current_index]].options.length; index++) {
                const currentOption = $(`#option${index}`);
                console.log("Option Value:", currentOption.prop("value"));

                const isCorrectAnswer = App.questions[App.answers_ids_generated[App.current_index]].correct_answers.includes(currentOption.prop("value"));
                console.log(App.questions[App.answers_ids_generated[App.current_index]].correct_answers.includes(currentOption.prop("value")));

                currentOption.parent().removeClass("btn-success btn-danger btn-warning");

                if (currentOption.prop("checked")) {
                    if (isCorrectAnswer) {
                        console.log("Correct Answer!");
                        currentOption.parent().addClass("btn-success");

                    } else {
                        console.log("Incorrect Answer!");
                        currentOption.parent().addClass("btn-danger");
                        isResponseCorrect = false;
                    }
                } else if (isCorrectAnswer) {
                    console.log("Missed Correct Answer!");
                    currentOption.parent().addClass("btn-warning");
                    isResponseCorrect = false;
                }
            }
            if (isResponseCorrect) {
                App.correct_answers_count++;
            }

            if (App.total_answers_count == 0) {
                App.updateProgressBar(0);
            }
            else { App.updateProgressBar((App.correct_answers_count / App.total_answers_count) * 100); }
        });

        App.updateProgressBar = function (barValue) {
            barValue = barValue.toFixed(2);
            if (barValue > 100) barValue = 100;
            $(".progress").attr("aria-valuenow", barValue);
            $(".progress-bar-striped").css("width", barValue + "%").text(barValue + "%");
        };

        $(document).on("click", "#next", function () {
            App.current_index++
            if (App.current_index == App.number_of_questions) {
                $("#next").prop("disabled", true);
            }

            $("#wording").empty();
            $("#answers").empty();
            $("#previous").prop("disabled", false);
            self.displayQuestion();

        });

        $(document).on("click", "#previous", function () {
            $("#next").prop("disabled", false);
            $("#wording").empty();
            $("#answers").empty();
            App.current_index--;
            if (App.current_index <= 0) {
                App.current_index = 0;
                $("#previous").prop("disabled", true);
            }
            self.displayQuestion();
        });
    },

    init() {
        this.showHeader();
        this.showMenu();
        this.bindEvents();
    },
};

App.init();