const App = {
    qnumber: 0,
    timer: null,
    minutes: 0,
    seconds: 0,
    correct_answers: 0, 
    correct_answers_count: 0,
    total_answers_count: 0,
    questions: [], 
    showHeader() {
        $("#app").append(`
            <header>
                <div>
                    <h1>Vítá tě TestOS!</h1>
                </div>
            </header>
        `);
    },

    showMenu() {
        $("#app").append(`
    <div id="menu_layout_mid_container">
        <div class="menu_layout_mid_hidden"></div>
        <div class="menu_layout_mid_hidden"></div>
        <div class="menu_layout_mid_visible">
        <button class="btn btn-info" id="statistics"><i class="fa fa-bar-chart" aria-hidden="true"></i>&nbsp;Moje statistiky</button></div>
    </div>

        <div id="subjects">
                <button class="btn btn-primary" id="test_zone"><span>Spustit test</span></button> 
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

        var settings = {
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

        $.ajax(settings).done(function (response) {
            App.questions = response;
            callback();
        })
            .fail(function (xhr, status, error) {
                wordingArea = $("#wording");
                wordingArea.empty();
                $("#answers").empty();
                wordingArea.append(`<div class="btn btn-danger error-message"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i>&nbsp;Něco se rozbilo</div>`);
                console.error("Network response was not ok.");
                throw new Error("Network response was not ok.");
            });
    },

    displayQuestion() {
        const currentQuestion = App.questions[App.qnumber];
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

    bindEvents() {
        const self = this;

        $(document).on("click", "#statistics", function () {
            $("header").remove();
            $("#subjects").remove();
            $("#menu_layout_mid_container").remove();
            $("#app").append(`
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
                    <td id="test_zone_name">Testovací zóna</td>
                    <td id="average_success_rate"></td>
                    <td id="test_zone_time_total"></td>
                </tr>
            </tbody>
        </table>
    
        <button class="btn btn-danger" id="nuke_all">
            <i class="fa fa-bomb" aria-hidden="true"></i>&nbsp;Vymazat VŠE
        </button>

        <button class="btn btn-light" id="home_button_statistics">
            <i class="fa fa-home" aria-hidden="true"></i>&nbsp;Domů
        </button> 
    </div>
    `);

            let testZoneTimeValue = localStorage.getItem("testZoneTime");
            let testZoneCorrectAnswersValue = localStorage.getItem("testZoneCorrectAnswers");
            let testZoneTotalAnswersValue = localStorage.getItem("testZoneTotalAnswers");

            $("#test_zone_time_total").text(testZoneTimeValue + " sekund");
            $("#test_zone_time_total").text(Math.floor(testZoneTimeValue / 60) + " min " + Math.floor(testZoneTimeValue % 60) + " sec");
            $("#average_success_rate").text(((testZoneCorrectAnswersValue / testZoneTotalAnswersValue) * 100).toFixed(2) + " %");
        });

        $(document).on("click", "#test_zone", function () {
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
            localStorage.clear();
            console.log('localStorage cleared');
            localStorage.setItem('testZoneTime', 0);
            localStorage.setItem('testZoneTotalAnswers', 0);
            localStorage.setItem('testZoneCorrectAnswers', 0);
            $("#test_zone_time_total").text(0 + " sekund");
            $("#time_total").text("Celkový čas: " + 0 + " sekund");
            $("#average_success_rate").text("0 %");
        });

        $(document).on("click", "#home_button", function () {
            let seconds = self.seconds;
            let minutes = self.minutes;

            let currentTestZoneTimeValue = parseInt(localStorage.getItem('testZoneTime'), 10) || 0;

            currentTestZoneTimeValue = currentTestZoneTimeValue + seconds + (minutes * 60);

            localStorage.setItem('testZoneTime', currentTestZoneTimeValue.toString());
            localStorage.setItem('testZoneTotalAnswers', App.total_answers_count.toString());
            localStorage.setItem('testZoneCorrectAnswers', App.correct_answers_count.toString());

            self.seconds = 0;
            self.minutes = 0;
            self.qnumber = 0;
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

            for (let index = 0; index < App.questions[App.qnumber].options.length; index++) {
                const currentOption = $(`#option${index}`);
                console.log("Option Value:", currentOption.prop("value"));

                const isCorrectAnswer = App.questions[App.qnumber].correct_answers.includes(currentOption.prop("value"));

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
            self.qnumber++;
            if (self.qnumber + 1 == self.questions.length) {
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
            self.qnumber--;
            if (self.qnumber <= 0) {
                self.qnumber = 0;
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