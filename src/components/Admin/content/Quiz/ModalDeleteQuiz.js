import { toast } from "react-toastify";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteQuizForAdmin } from "../../../../services/apiService";
const ModalDeleteQuiz = (props) => {
  const { show, setShow, dataDelete } = props;

  const handleClose = () => setShow(false);
  const handleSubmitDelete = async () => {
    let dataArray = [dataDelete.id];
    console.log(dataArray)
    let data = await deleteQuizForAdmin(dataArray);
    if (data && data.status === 200) {
      toast.success("sucess");
      handleClose();

      await props.fetchQuiz();
    }

    if (data && data.status !== 200) {
      toast.error("false");
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure delete Quiz?{" "}
          <b>{dataDelete && dataDelete.namequiz ? dataDelete.namequiz : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleSubmitDelete()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteQuiz;
