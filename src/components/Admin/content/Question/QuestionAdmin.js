import Select from "react-select";
import './QuestionAdmin.scss'

import { BsFillPatchPlusFill, BsPatchMinusFill } from 'react-icons/bs'
import { AiFillPlusSquare, AiOutlineMinusCircle } from 'react-icons/ai'
import { useState } from "react";

import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'

const QuestionAdmin = () => {
    const options = [

    ];
    const [selectedQuiz, setSelectedQuiz] = useState({});

    const [questions, setQuestions] = useState(
        [
            {
                id: uuidv4(),
                description: '',
                imageFile: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            }
        ]
    )
    const handleOnChange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionsClone = _.cloneDeep(questions);
            let index = questionsClone.findIndex(item => item.id === questionId);
            if (index > -1) {
                questionsClone[index].description = value;
                setQuestions(questionsClone)
            }
        }
    }
    const handleOnChangeFileQuestion = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);

        if (index > -1 && event.target.value
            && event.target.files && event.target.files[0]) {
            questionsClone[index].imageFile = event.target.files[0];
            questionsClone[index].imageName = event.target.files[0].name;
            setQuestions(questionsClone);
        }
    }

    const handleAnswerQuestion = (type, answerId, questionId, value) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            questionsClone[index].answers = questionsClone[index].answers.map(answer => {
                if (answer.id === answerId) {
                    if (type === 'CHECKBOX') {
                        answer.isCorrect = value;
                    }
                    if (type === 'INPUT') {
                        answer.description = value;
                    }
                }
                return answer;
            });
            setQuestions(questionsClone)
        }
    }
    const handleSubmitQuestionForQuiz = () => {

    }
    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            }
            setQuestions([...questions, newQuestion])
        }
        if (type === 'REMOVE') {
            let questionsClone = _.cloneDeep(questions);
            questionsClone = questionsClone.filter(item => item.id !== id)
            setQuestions(questionsClone)
        }
    }
    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionsClone = _.cloneDeep(questions);
        if (type === 'ADD') {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false

            }
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers.push(newAnswer);
            setQuestions(questionsClone)
        }


        if (type === 'REMOVE') {
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers =
                questionsClone[index].answers.filter(item => item.id !== answerId)
            setQuestions(questionsClone)
        }
    }
    console.log(questions)

    return (
        <div className="questions-container">
            <div className="title">
                Manages Question
            </div>
            <div className="add-new-question">
                <div className="col-6 form-group">
                    <label className="mb-2">Select Quiz:</label>
                    <Select
                        // defaultValue={type}
                        // onChange={setType}
                        options={options}
                        placeholder={"Quiz type..."}
                    />
                </div>
                <div className='mt-3 mb-2'>


                    Add Questions
                </div>
            </div>
            {questions && questions.length > 0 &&
                questions.map((question, index) => {
                    return (
                        <div key={question.id} className='q-main mb-4'>
                            <div className="questions-content">
                                <div className="form-floating description">
                                    <input type="type"
                                        className="form-control"
                                        defaultValue={question.description}
                                        onChange={(event) => handleOnChange('QUESTION', question.id, event.target.value)}
                                    />
                                    <label>Question {index + 1}'s description</label>
                                </div>
                                <div className="group-upload">
                                    <label htmlFor={`${question.id}`}


                                    >< RiImageAddFill className="label-up" /></label>
                                    {/* <input type="file" hidden /> */}
                                    <span>0 files is uploaded</span>
                                </div>
                                <div className="btn-add">
                                    <span onClick={() => handleAddRemoveQuestion('ADD', '')}><BsFillPatchPlusFill className="icon-add" /></span>

                                    {question.length > 1 &&
                                        <span
                                            onClick={() => handleAddRemoveQuestion('REMOVE', '')}
                                        ><BsPatchMinusFill className="icon-remove" /></span>
                                    }

                                </div>

                            </div>
                            {question.answers && question.answers.length > 0
                                && question.answers.map((answer, index) => {
                                    return (

                                        <div key={answer.id} className="answers-content">
                                            <input className="form-check-input iscorrect" type="checkbox" />
                                            <div className="form-floating answer-name">
                                                <input type="text" className="form-control" />
                                                <label>answer 1</label>
                                            </div>
                                            <div className="btn-group">
                                                <span
                                                    onClick={() => handleAddRemoveAnswer('ADD', question.id)}
                                                ><AiFillPlusSquare className="icon-add" /></span>
                                                {question.answers.length > 1 &&
                                                    <span
                                                        onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}
                                                    >
                                                        <AiOutlineMinusCircle className="icon-add" />
                                                    </span>
                                                }


                                            </div>
                                        </div>

                                    )

                                })}
                        </div>

                    )
                })
            }


        </div>
    );
}

export default QuestionAdmin;