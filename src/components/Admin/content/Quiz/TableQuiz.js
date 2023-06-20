import { useEffect } from "react";
import { useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiService";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
const TableQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState([])

    const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
    const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({})
    useEffect(() => {
        fetchQuiz();
    }, [])
    const handleClickBtnDelete = (quiz) => {
        setDataDelete(quiz)
        setShowModalDeleteQuiz(true)
    }
    const handleClickBtnUpdate = (quiz) => {
        setDataUpdate(quiz)
        setShowModalUpdateQuiz(true)
    }

    const fetchQuiz = async () => {
        setDataUpdate({})
        setDataDelete({})
        let res = await getAllQuizForAdmin();

        if (res) {
            setListQuiz(res.data.listResult)
        }
    }

    return (<>
        <div>List Quiz</div>
        <table className="table table-hover table-bordered my-2">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    {/* <th scope="col">Type</th> */}
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {listQuiz &&
                    listQuiz.length > 0 &&
                    listQuiz.map((item, index) => {
                        return (
                            <tr key={`table-quiz-${index}`}>
                                <td>{item.id}</td>
                                <td>{item.namequiz}</td>
                                <td>{item.description}</td>
                                <td style={{ display: "flex", gap: "15px" }}>

                                    <button
                                        className="btn btn-warning"
                                        onClick={() => handleClickBtnUpdate(item)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleClickBtnDelete(item)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}

                {listQuiz && listQuiz.length === 0 && (
                    <tr>
                        <td colSpan={"4"}>Not found data</td>
                    </tr>
                )}
            </tbody>
        </table>
        <ModalUpdateQuiz
            show={showModalUpdateQuiz}
            setShow={setShowModalUpdateQuiz}
            dataUpdate={dataUpdate}
            fetchQuiz={fetchQuiz}
            setDataUpdate={setDataUpdate}
        />
        <ModalDeleteQuiz
            show={showModalDeleteQuiz}
            setShow={setShowModalDeleteQuiz}
            dataDelete={dataDelete}
            fetchQuiz={fetchQuiz}

        />
    </>);
}

export default TableQuiz;