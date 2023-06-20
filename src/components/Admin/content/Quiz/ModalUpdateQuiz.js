import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import _ from "lodash";
import { putUpdateQuizForAdmin } from "../../../../services/apiService";
import { FcPlus } from 'react-icons/fc'

const ModalUpdateQuiz = (props) => {
  const { show, setShow, dataUpdate, setDataUpdate } = props;



  const handleClose = (props) => {
    setShow(false);
    setNameQuiz("");
    setDescription("");
    setImageQuiz("");
    setPreviewImage("");
    setDataUpdate({});
  };

  const handleSubmitUpdateQuiz = async () => {
    let data = await putUpdateQuizForAdmin(dataUpdate.id, namequiz, imagequiz, description);
    console.log(data.status)
    if (data && data.status == 200) {
      toast.success("success");
      handleClose();
      await props.fetchQuiz();
    } else {
      toast.error("false");
    }


  };

  const [namequiz, setNameQuiz] = useState("");
  const [imagequiz, setImageQuiz] = useState("");
  const [description, setDescription] = useState("");
  const [prevViewImage, setPreviewImage] = useState("");




  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {

      setNameQuiz(dataUpdate.namequiz);
      setDescription(dataUpdate.description);
      setImageQuiz("");

      if (dataUpdate.imagequiz) {



        setPreviewImage(`http://localhost:8081/images/${dataUpdate.imagequiz}`);


      }
    }
  }, [props.dataUpdate]);
  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      console.log("123", event.target.value);
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImageQuiz(event.target.files[0]);
    } else {
    }
  };
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo
      </Button> */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="xl"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal add news user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name Quiz</label>
              <input
                type="text"
                className="forn-control"
                value={namequiz}
                onChange={(event) => setNameQuiz(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="forn-control"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="lableUpload"> <FcPlus /> Upload image</label>
              <input
                type="file"
                className="form-control"
                hidden
                id="lableUpload"
                onChange={(event) => handleUploadImage(event)}
              />
            </div>
            <div className="col-md-12 img-preview">
              {prevViewImage ? (
                <img src={prevViewImage} />
              ) : (
                <span>PreviewImage</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitUpdateQuiz()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateQuiz;
