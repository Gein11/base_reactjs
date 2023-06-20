import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQuizByUser } from "../../services/apiService";
import "./ListQuiz.scss";
const ListQuiz = () => {
  const [arrQuiz, setArrayQuiz] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = async () => {
    const rest = await getQuizByUser();
    if (rest) {
      setArrayQuiz(rest.data.listResult);
    }
  }

  return (

    <div className="list-quiz-container container">
      {arrQuiz.map((quiz, index) => {
        return (
          <div
            key={`${index}-quiz`}
            className="card"
            style={{ width: "18rem" }}
          >
            {/* <img
            src={`data:image/jpeg;base64,${quiz.imagequiz}`}
            className="card"
          /> */}
            <div className="card-body">

              <h5 className="card-title">Quiz {index + 1}</h5>
              <p className="card-text">{quiz.namequiz}</p>
              <button
                className="btn btn-primary"
                onClick={() =>
                  navigate(`/quiz/${quiz.id}`, {
                    state: { quizTitle: quiz.namequiz }
                  })
                }
              >
                Start Now
              </button>
            </div>
          </div>
        );
      })}
      {arrQuiz && arrQuiz.length === 0 && <div>You don't have quiz now</div>}
    </div>
  );
};

export default ListQuiz;
