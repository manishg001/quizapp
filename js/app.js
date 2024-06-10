// Declare variables for various elements and quiz state management
let answerOption = document.querySelector(".answer_option");
let mainPage = document.getElementById("mainPage");
let seeResult = document.querySelector(".see_result_btn");
let questionCategory;
let questionCount = 0;
let slNo = 1;
let questions = document.querySelector("#question_box .questions");
let categoryButtons = document.querySelectorAll(".questionsCategory");
let questionBox = document.getElementById("question_box");
let timerId; // Declare timerId variable here
let timeLeft = 100; // Declare timeLeft here
let element = document.querySelector("#timer"); // Timer display element

// Add event listeners to category buttons to fetch and display questions
categoryButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    questionCategory = QUESTIONS[event.currentTarget.dataset["category"]];
    mainPage.style.display = "none";
    questionBox.style.display = "block";

    // Start the timer when the quiz starts
    timerId = setInterval(counter, 1000);

    // Display the first question of the selected category
    showQuestion(0, questions, QUESTIONS[event.currentTarget.dataset["category"]]);

    // Display the question counter
    updateQuestionCount(1, QUESTIONS[event.currentTarget.dataset["category"]]);

    // Set the category name
    let categoryName = document.getElementById("categoryName");
    categoryName.innerHTML = event.currentTarget.dataset["category"];

    // Event listener for answer options
    answerOption.addEventListener('click', () => {
      if (questionCount < questionCategory.length - 1) {
        nextBtn.style.display = "block"; // Show next button if there are more questions
      } else {
        seeResult.style.display = "block"; // Show see result button if it's the last question
      }
    });

    // Event listener for the next button
    let nextBtn = document.querySelector("#next");
    nextBtn.addEventListener('click', () => {
      nextBtn.style.display = "none";
      if (questionCount < questionCategory.length - 1) {
        questionCount++;
        slNo++;
        showQuestion(questionCount, questions, questionCategory); // Display next question
        updateQuestionCount(slNo, questionCategory); // Update question counter
      }
    });
  });
});

let optionList = document.querySelector(".answer_option");

// Function to update the question counter
function updateQuestionCount(index, myApp) {
  let topQuesCounter = questionBox.querySelector(".question_count");
  let totalQuestionCount = "<span>" + index + " / " + myApp.length + "</span>";
  topQuesCounter.innerHTML = totalQuestionCount;
}

// Function to display the question and its options
function showQuestion(index, elementId, myApp) {
  let question = myApp[index].question;
  let showQuestion = "<span>" + slNo + ". " + question + "</span>";
  let showOptions =
    '<span class="option">' + myApp[index].options[0] + "</span>" +
    '<span class="option">' + myApp[index].options[1] + "</span>" +
    '<span class="option">' + myApp[index].options[2] + "</span>" +
    '<span class="option">' + myApp[index].options[3] + "</span>";
  elementId.innerHTML = showQuestion;
  optionList.innerHTML = showOptions;

  // Set onclick event for each option to handle answer selection
  let options = optionList.querySelectorAll(".option");
  for (let i = 0; i < options.length; i++) {
    options[i].setAttribute("onclick", "optionSelected(this)");
  }
}

// Initialize score and correct answer count
let score = 0;
let totalCorrectAnswers = 0;

// Function to handle answer selection
function optionSelected(answer) {
  let userAns = answer.textContent;
  let correctAnswer = questionCategory[questionCount].answer;
  let scoreShow = document.querySelector("#score");
  scoreShow.innerText = "Score";

  let allOptions = optionList.children.length;
  if (userAns == correctAnswer) {
    answer.classList.add("correct");
    score++;
    scoreShow.innerHTML = "Score : <b>" + score + "</b>";
    totalCorrectAnswers++;
  } else {
    answer.classList.add("incorrect");
    scoreShow.innerHTML = "Score : <b>" + score + "</b>";
    // If answer is incorrect, automatically select the correct answer
    for (let i = 0; i < allOptions; i++) {
      if (optionList.children[i].textContent == correctAnswer) {
        optionList.children[i].setAttribute("class", "option correct");
      }
    }
  }
  // Disable all options after selection
  for (let i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add("disabled");
  }
}

// Timer function
function counter() {
  if (timeLeft == 0) {
    clearInterval(timerId);
    showResult(); // Show result when time runs out
  } else {
    element.innerHTML = timeLeft;
    timeLeft--;
  }
}

// Function to show the result after all questions are answered
let resultBox = document.getElementById("result_box");
function showResult() {
  mainPage.style.display = "none";
  questionBox.style.display = "none";
  resultBox.style.display = "block";

  // Display the user's name in the result box
  let name = document.getElementById("user_name");
  let user = document.querySelector(".input_value").value;
  name.innerHTML = user + "<br>";

  // Display total time taken
  let timeTaken = 100 - timeLeft;
  resultBox.querySelector("#total_time_taken").innerHTML = "Total Time Taken : <b>" + timeTaken + "</b> Seconds";

  // Display correct answers count
  let correct = score;
  document.querySelector("#correct_answers").innerHTML = "Correct : <b>" + correct + "</b>";

  // Display total number of wrong answers
  let totalQuestion = 10;
  let wrong = totalQuestion - score;
  document.querySelector("#wrong_answers").innerHTML = "Wrong : <b>" + wrong + "</b>";

  // Display score in percentage
  let percentage = (score / totalQuestion) * 100 + " %";
  document.querySelector("#result_in_percent").innerHTML = "Percentage : <b>" + percentage + "</b>";
}

// Go back to the home page
let homePage = document.querySelector(".homePage");
homePage.onclick = () => {
  location.reload();
};

// Restart the quiz
let restart = document.querySelector(".restart");
restart.onclick = () => {
  location.reload();
};
