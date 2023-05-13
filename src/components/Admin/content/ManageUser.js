import ModelCreateUser from "./ModelCreateUser";
import ModelUpdateUser from "./ModelUpdateUser";
import "./ManageUsers.scss";
import { FcPlus } from "react-icons/fc";
import { useEffect, useState } from "react";
import TableUser from "./TableUser";
import { getAllusers, getUserWithPaginate } from "../../../services/apiService";
import ModelDeleteUser from "./ModelDeleteUser";
import TableUserPaginate from "./TableUserPaginate";
const ManageUser = (props) => {
  const LIMIT_USER = 5;
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [showModelCreateUser, setShowModerCreateUser] = useState(false);
  const [showModalUpdateUser, setShowMOdalUpdateUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});

  const [showModelDeleteUser, setShowModelDeleteUser] = useState(false);
  const [dataDelete, setDataDelete] = useState({});

  const [listUsers, setListUsers] = useState([]);

  const handleClickBtnUpdate = (user) => {
    setShowMOdalUpdateUser(true);
    setDataUpdate(user);
  };

  const handleClickBtnDelete = (user) => {
    setShowModelDeleteUser(true);
    setDataDelete(user);
  };

  const resetUpdateData = () => {
    setDataUpdate({});
  };

  useEffect(() => {
    fetchListUsersWithPaginate();
  }, []);

  const fetchListUsersWithPaginate = async (page) => {
    let res = await getUserWithPaginate(page, LIMIT_USER);
    if (res.EC === 0) {
      setListUsers(res.DT.users);
      // coi chung sai
      setPageCount(res.DT.totalPages);
    }
  };

  return (
    <div className="manage-user-container">
      <div className="users-content">
        <div className="btn-add-new">
          <button
            className="btn btn-primary"
            onClick={() => setShowModerCreateUser(true)}
          >
            <FcPlus />
            Add new users
          </button>
        </div>
        <div className="table-users-container">
          {/* <TableUser
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnDelete={handleClickBtnDelete}
          /> */}
          <TableUserPaginate
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnDelete={handleClickBtnDelete}
            fetchListUsersWithPaginate={fetchListUsersWithPaginate}
            pageCount={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <ModelCreateUser
          show={showModelCreateUser}
          setShow={setShowModerCreateUser}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          currentPage={setCurrentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModelUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModerCreateUser}
          dataUpdate={dataUpdate}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          currentPage={setCurrentPage}
          setCurrentPage={setCurrentPage}
          resetUpdateData={resetUpdateData}
        />
        <ModelDeleteUser
          show={showModelDeleteUser}
          setShow={setShowModelDeleteUser}
          dataDelete={dataDelete}
          fetchListUsers={fetchListUsers}
        />
      </div>
    </div>
  );
};
export default ManageUser;
