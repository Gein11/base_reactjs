import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postLogin } from "../../services/apiService";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
const Login = () => {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async () => {
    let data = await postLogin(username, password);

    if (data && data != null) {
      dispatch(doLogin(data));
      toast.success(data.EM);
      navigate("/");
    }
    if (data && data == null) {
      toast.error(data.EM);
      console.log("err");
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        Don't have account
        <button onClick={() => navigate("/register")}>signUp</button>
      </div>
      <div className="title col-4 mx-auto ">Hello, who is this</div>
      <div className="content-form">
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            className="form-control"
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            className="form-control"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <button className="btn-submit" onClick={() => handleLogin()}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
