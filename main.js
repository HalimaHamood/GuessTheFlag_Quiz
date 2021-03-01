let questionsAnswered,
    questionsRight,
    questionsWrong,
    input;

function startGame() {
    let button = document.getElementById("start-button");
    button.style.display = "none";

    let paragraph = document.querySelector(".description");
    paragraph.style.display = "none";

    parentDiv = document.querySelector(".container");
    questionsAnswered = 0;
    questionsRight = 0;
    questionsWrong = 0;

    getCountries();
}


function getCountries() {
    fetch('https://restcountries.eu/rest/v2/all')
        .then(response => response.json())
        .then(data => {

            // Get countries

            let randomElement = data[Math.floor(Math.random() * data.length)];
            let rightCountry = randomElement;
            let wrongCountries = [];

            for (let i = 0; i < 3; i++) {
                let randomElement = data[Math.floor(Math.random() * data.length)];
                wrongCountries.push(randomElement);
            }


            // Setup board
            parentDiv.innerHTML += "<div class='question-container'></div>";
            let questionContainer = document.querySelector(".question-container");

            questionContainer.innerHTML = "";
            questionContainer.innerHTML += "<img class='quiz-image' src='" + rightCountry.flag + "'>";

            let hasRight = false;
            for (let i = 0; i < 4; i++) {
                if (i == 3 && !hasRight) {
                    input = $("<input type=submit value='" + rightCountry.name + "'>")
                        .click(function() {
                            reviewQuestion(this.value, rightCountry.name);
                        })
                        .appendTo(questionContainer);
                    hasRight = true;
                }

                if (!hasRight) {
                    let rand = (Math.random() * 4) + 1;
                    if (rand == 0) {
                        if (!hasRight) {
                            input = $("<input type=submit value='" + rightCountry.name + "'>")
                                .click(function() {
                                    reviewQuestion(this.value, rightCountry.name);
                                })
                                .appendTo(questionContainer);
                            hasRight = true;
                        }
                    } else {
                        input = $("<input type=submit value='" + wrongCountries[i].name + "'>")
                            .click(function() {
                                reviewQuestion(this.value, rightCountry.name);
                            })
                            .appendTo(questionContainer);
                    }
                }
            }
        })
};



function reviewQuestion(a, rightAnswer) {
    if (a == rightAnswer) {
        questionsRight++;
    } else {
        questionsWrong++;
    }

    questionsAnswered++;

    if (questionsAnswered == 5) {
        showScore();
    } else {
        getCountries();
    }
}

function showScore() {
    total = questionsWrong + questionsRight
    let questionContainer = document.querySelector(".question-container");
    questionContainer.innerHTML =
        "<div class='score-container'>" +
        "<h1>Your score:</h1>" +  "<h3>" + questionsRight + "/" + (total) + "</h3>" +
       
        "</div>" +
        "<input type='submit' value='New Game' onclick='startGame();'" +
        "</div>";
    
}

function stopGame() {
    let button = document.getElementById("start-button");
    button.style.display = "block";
   
}