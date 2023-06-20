
import './ManageQuiz.scss';
import Select from 'react-select';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { postCreateNewQuiz } from '../../../../services/apiService';
import Accordion from 'react-bootstrap/Accordion';
import TableQuiz from './TableQuiz';
const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
]
const ManageQuiz = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState(null);
    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        };
    }
    const handleSubmitQuiz = async () => {
        if (!name || !description) {
            toast.error('Name/Description is required');
            return;
        }

        let res = await postCreateNewQuiz(name, image, description)
        // if (res) {
        //     toast.success('Success');
        //     setName('')
        //     setDescription('')
        //     setImage(null)
        // } else {
        //     toast.error('Fail');
        // }
    }
    return (

        <div className='quiz-container'>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>ManageQuizzes</Accordion.Header>
                    <Accordion.Body>
                        <div className='add-new'>
                            <fieldset className='border round-3 p-3'>
                                <legend className='float-none w-auto px-3'>Add New Quiz</legend>

                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        value={name}
                                        placeholder="Your quiz Name"
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                    <label htmlFor="floatingInput">Name </label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        value={description}
                                        placeholder="Description..."
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                    <label htmlFor="floatingInput">Description </label>
                                </div>
                                <div className='my-3'>
                                    <Select
                                        defaultValue={type}
                                        onChange={setType}
                                        options={options}
                                        placeholder={"Quiz type..."}
                                    />
                                </div>
                                <div className='more-actions form-group'>
                                    <label className='mb-1'>  Upload Image</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={(event) => handleChangeFile(event)}
                                    />
                                </div>
                                <div className='mt-3'>
                                    <button
                                        onClick={() => handleSubmitQuiz()}
                                        className='btn btn-warning'
                                    >Save</button>
                                </div>
                            </fieldset>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>

            </Accordion>


            <div className='list-detail'>
                <TableQuiz />
            </div>
        </div>
    );
}

export default ManageQuiz;