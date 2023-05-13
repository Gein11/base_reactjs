import { toast } from "react-toastify";
import { deleteUser } from "../../../services/apiService";

const ModelDeleteUser = (props) => {
  const { show, setShow, dataDelete } = props;
  const handleClose = () => setShow(false);
  const handleSubmitDelete = async () => {
    let data = await deleteUser(dataDelete.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      props.setCurrentPage(1);
      await props.fetchListUsersWithPaginate(1);
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure delete User{" "}
          <b>{dataDelete && dataDelete.email ? dataDelete.email : ""}</b>
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

export default ModelDeleteUser;
