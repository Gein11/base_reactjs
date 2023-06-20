import _ from 'lodash'
const Question = (props) => {
    const { data, index } = props;

    const handleCheckbox = (event, aId, qId) => {

        props.handleCheckbox(aId, qId)
    }


    if (_.isEmpty(data)) {
        return (<>
        </>);
    }
    return (<>
        {data.image ?
            <div className='q-image'>
                {/* <img src={`data:image/jpeg;base64,${data.image}`} /> */}
            </div>
            :
            <div className='q-image'></div>
        }
        <div className='question'>
            Question {index + 1} : {data.questionDescription}
        </div>
        <div className='answer'>
            {data.answers && data.answers.map((a, index) => {

                return (

                    <div key={`answer-${index}`} className="a-child">
                        <div className='form-check'>
                            <input className='form-check-input'
                                type="checkbox"
                                checked={a.isSelected}
                                onChange={(event) => { handleCheckbox(event, a.id, data.questionId) }}
                            />
                            <label className='form-check-label'>
                                {a.answerText}
                            </label>
                        </div>

                    </div>
                )
            })}
        </div>
    </>);
}

export default Question;