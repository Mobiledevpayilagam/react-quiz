import { Fragment, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { quiz } from "./quiz";

function App() {
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);
  const [currentQuestionToShow, setCurrentQuestionToShow] = useState(1);
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
  const [endQuiz, setEndQuiz] = useState(false);
  const [isQuizNotEnded, setIsQuizNotEnded] = useState(true);

  const quizLength = quiz.length;
  return (
    <div className="App">
      {isQuizNotEnded && (
        <>
          {quiz.map((quizItem, quizIndex) => (
            <Fragment key={quizIndex}>
              {currentQuestionToShow === quizIndex + 1 && (
                <div>
                  <p>
                    Question {quizIndex + 1} of {quizLength}
                  </p>

                  <p>{quizItem.question}</p>
                  <div className="answerContainer">
                    {Object.entries(quizItem.choices).map(
                      ([key, value], index) => (
                        <div
                          className="answerBox"
                          key={index}
                          onClick={() => {
                            console.log(key, index);
                            setIsQuestionAnswered(true);
                            if (quizItem.correctAnswer === key) {
                              setNumberOfCorrectAnswers((state) => state + 1);
                              // setIsAnsweredCorrectly(true);
                            } else {
                              console.log("wrong answer");
                              // setIsAnsweredCorrectly(false);
                            }
                            if (quizIndex + 1 === quizLength) {
                              setEndQuiz(true);
                            } else {
                              setEndQuiz(false);
                            }
                          }}
                        >
                          <p>
                            <span>{key}</span>: <span>{value}</span>
                          </p>
                        </div>
                      )
                    )}
                  </div>
                  {quizIndex !== 0 && isQuestionAnswered && (
                    <button
                      onClick={() => {
                        setCurrentQuestionToShow((state) => state - 1);
                        setIsQuestionAnswered(false);
                      }}
                    >
                      Prev question
                    </button>
                  )}
                  {quizIndex + 1 !== quizLength && isQuestionAnswered && (
                    <button
                      onClick={() => {
                        setCurrentQuestionToShow((state) => state + 1);
                        setIsQuestionAnswered(false);
                      }}
                    >
                      Next question
                    </button>
                  )}
                </div>
              )}
            </Fragment>
          ))}
          {endQuiz && (
            <button onClick={() => setIsQuizNotEnded(false)}>End quiz</button>
          )}
        </>
      )}
      {!isQuizNotEnded && (
        <div>
          <p>Quiz ended</p>
          {numberOfCorrectAnswers === quizLength ? (
            <p>Congrats, you answered every question correctly</p>
          ) : (
            <p>
              You only got {numberOfCorrectAnswers} out of {quizLength}{" "}
              questions
            </p>
          )}
          <button
            onClick={() => {
              setIsQuizNotEnded(true);
              setNumberOfCorrectAnswers((state) => 0);
              setCurrentQuestionToShow((state) => 1);
              setIsQuestionAnswered(false);
              setEndQuiz(false);
            }}
          >
            Restart quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
