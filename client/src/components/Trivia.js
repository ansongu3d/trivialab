import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";

export const Trivia = () => {
  useEffect(() => {
    // const loggedIn = async () => {
    //   const loggedIn = await axios.get("/session");
    //   console.log(loggedIn);
    // };

    axios.get("/quizzes", { headers:{  
      "Content-Type": "application/json",
      'Accept': 'application/json',
    }} ) 
    .then(response => {
      const randomIndex = Math.floor(Math.random() * response.data.length);
  
      const randomQuiz = response.data[randomIndex];

      setQuestions(randomQuiz.questions);
      setQuizTitle(randomQuiz.title);
        }
    )
    .catch(err => alert(err))

    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get("/quizzes");
    //     console.log(response?.data);
    //     const randomIndex = Math.floor(Math.random() * response.data.length);
  
    //     const randomQuiz = response.data[randomIndex];
  
    //     setQuestions(randomQuiz.questions);
    //     setQuizTitle(randomQuiz.title);
    //   } catch ( err ) {
    //     alert(err)
    //   }
      
    // };

    // call the function
    // loggedIn();
    // make sure to catch any error
    //   .catch((window.location.href = "/"));
    // call the function
    // fetchData();
    // make sure to catch any error
    //   .catch((window.location.href = "/"));

    // try {
    //   // will throw error if they arnt logged in
    //   const loggedIn = await axios.get("/session");
    //   console.log(loggedIn);

    //   const response = await axios.get("/quizzes");
    //   console.log(response?.data);

    //   const randomIndex = Math.floor(Math.random() * response.data.length);

    //   const randomQuiz = response.data[randomIndex];

    //   setQuestions(randomQuiz.questions);
    //   setQuizTitle(randomQuiz.title);
    // } catch (err) {
    //   window.location.href = "/";
    // }
  }, []);

  const [questions, setQuestions] = useState([]);
  const [quizTitle, setQuizTitle] = useState([]);

  // const questions = [
  // 	{
  // 		questionText: 'What is the capital of France?',
  // 		answerOptions: [
  // 			{ answerText: 'New York', isCorrect: false },
  // 			{ answerText: 'London', isCorrect: false },
  // 			{ answerText: 'Paris', isCorrect: true },
  // 			{ answerText: 'Dublin', isCorrect: false },
  // 		],
  // 	},
  // 	{
  // 		questionText: 'Who is CEO of Tesla?',
  // 		answerOptions: [
  // 			{ answerText: 'Jeff Bezos', isCorrect: false },
  // 			{ answerText: 'Elon Musk', isCorrect: true },
  // 			{ answerText: 'Bill Gates', isCorrect: false },
  // 			{ answerText: 'Tony Stark', isCorrect: false },
  // 		],
  // 	},
  // 	{
  // 		questionText: 'The iPhone was created by which company?',
  // 		answerOptions: [
  // 			{ answerText: 'Apple', isCorrect: true },
  // 			{ answerText: 'Intel', isCorrect: false },
  // 			{ answerText: 'Amazon', isCorrect: false },
  // 			{ answerText: 'Microsoft', isCorrect: false },
  // 		],
  // 	},
  // 	{
  // 		questionText: 'How many Harry Potter books are there?',
  // 		answerOptions: [
  // 			{ answerText: '1', isCorrect: false },
  // 			{ answerText: '4', isCorrect: false },
  // 			{ answerText: '6', isCorrect: false },
  // 			{ answerText: '7', isCorrect: true },
  // 		],
  // 	},
  // ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };
  return (
    <div className="app" id="trivia_part">
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {questions.length}
        </div>
      ) : (
        questions.length > 0 && (
          <>
            <h2>{quizTitle}</h2>
            <div className="question-section">
              <div className="question-count">
                <span>Question {currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className="question-text">
                <h3>{questions[currentQuestion].questionText}</h3>
              </div>
            </div>
            <div className="answer-section">
              {questions[currentQuestion].answerOptions.map((answerOption) => (
                <div className="form-outline  d-inline">
                  <button
                    className="btn btn-secondary btn-lg mb-4  m-2"
                    onClick={() =>
                      handleAnswerOptionClick(answerOption.isCorrect)
                    }
                  >
                    {answerOption.answerText}
                  </button>
                </div>
              ))}
            </div>
          </>
        )
      )}
    </div>
  );
};