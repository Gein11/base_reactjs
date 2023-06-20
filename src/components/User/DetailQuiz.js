import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService";
import Question from "./Question";
import ModalResult from "./ModalResult";
import './DetailQuiz.scss'
import _ from 'lodash'
const DetailQuiz = () => {
  const params = useParams();
  const location = useLocation();
  const quizId = params.id;
  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0)
  const [isShowModalResult, setIsShowModalResult] = useState(false)
  const [dataModalResult, setDataModalResult] = useState({});

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const fetchQuestions = async () => {
    let res = await getDataQuiz(quizId);
    let raw = res.data

    let data = _.chain(raw)
      .groupBy("id")
      .map((value, key) => {

        let answers = [];
        let questionDescription, image = null;
        value.forEach((item, index) => {

          if (index === 0) {
            questionDescription = item.text;
            image = item.image
          }
          answers = item.answers.map(answer => ({ ...answer, isSelected: false }));


        })
        return { questionId: key, answers, questionDescription, image }
      })
      .value()

    setDataQuiz(data)

  };

  const handleCheckbox = (answerId, questionId) => {

    let dataQuizClone = _.cloneDeep(dataQuiz);
    let question = dataQuizClone.find(item => +item.questionId === +questionId)

    if (question && question.answers) {

      let b = question.answers.map(item => {


        if (+item.id === +answerId) {
          item.isSelected = !item.isSelected
        } else {
          item.isSelected = false; // Đặt các checkbox khác về false
        }

        return item

      })

      question.answers = b;
    }

    let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)

    if (index > -1) {

      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone)
    }
  }

  console.log(dataQuiz)

  const handleFinishQuiz = async () => {
    let payload = {};
    var answers = [];
    if (dataQuiz && dataQuiz.length > 0) {

      dataQuiz.forEach(question => {
        let questionId = question.questionId;
        let selectedAnswer = null;

        question.answers.forEach(a => {
          if (a.isSelected === true) {

            selectedAnswer = a.id
          }
        })
        answers.push({
          quizQuestion: +questionId,
          selectedAnswer: selectedAnswer
        })

      })
      payload = answers;
      let res = await postSubmitQuiz(+quizId, JSON.stringify(answers));
      console.log(res.data)
      if (res && res.data != null) {
        setDataModalResult({
          correctQuestions: res?.data?.correctQuestions,
          totalQuestions: res?.data?.totalQuestions,
          // quizData: res?.data?.quizData
        })
        setIsShowModalResult(true)
      } else {

        alert("Wrong")
      }
    }
  }
  const handlePrev = () => {
    if (index - 1 < 0) return;
    setIndex(index - 1)
  }
  const handleNext = () => {
    if (dataQuiz.length > index + 1)
      setIndex(index + 1)
  }
  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title">
          Quiz {quizId} : {location?.state?.quizTitle}
        </div>
        <hr />
        <div className="q-body">
          <img />
        </div>
        <div className="q-content">
          <Question
            index={index}
            handleCheckbox={handleCheckbox}
            data={
              dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []
            }
          />


        </div>
        <div className="footer">
          <button className="btn btn-secondary" onClick={() => handlePrev()}>Prev</button>
          <button className="btn btn-primary" onClick={() => handleNext()}>Next</button>
          <button className="btn btn-warning" onClick={() => handleFinishQuiz()}>Finish</button>
        </div>
      </div>
      <div className="right-content"></div>
      <ModalResult show={isShowModalResult}
        setShow={setIsShowModalResult}
        dataModalResult={dataModalResult}
      />
    </div>
  );
};

export default DetailQuiz;
