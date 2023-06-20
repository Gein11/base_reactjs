import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postRegister } from "../../services/apiService";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
const Register = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [roles, setRoles] = useState([""]);
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleRegister = async () => {
    let data = await postRegister(
      fullname,
      username,
      email,
      avatar,
      password,
      roles
    );
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/login");
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  return (
    <div className="register-container">
      <div className="header">
        You have account
        <button onClick={() => navigate("/Login")}>Login now</button>
      </div>
      <div className="title col-4 mx-auto ">Hello, who is this</div>
      <div className="content-form">
        <div className="form-group pass-group">
          <label>User Name</label>
          <input
            type={"text"}
            value={username}
            className="form-control"
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>
        <div className="form-group pass-group">
          <label>Full Name</label>
          <input
            type={"text"}
            value={fullname}
            className="form-control"
            onChange={(event) => setFullname(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            className="form-control"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>password</label>
          <input
            type={isShowPassword ? "text" : "password"}
            value={password}
            className="form-control"
            onChange={(event) => setPassword(event.target.value)}
          />
          {isShowPassword ? (
            <span
              className="icons-eyes"
              onClick={() => setIsShowPassword(false)}
            >
              <VscEye />
            </span>
          ) : (
            <span
              className="icons-eyes"
              onClick={() => setIsShowPassword(true)}
            >
              <VscEyeClosed />
            </span>
          )}
        </div>

        <div>
          <button className="btn-submit" onClick={() => handleRegister()}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
