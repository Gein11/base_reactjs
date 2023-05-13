import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {};
  return (
    <div className="login-container">
      <div className="header">Don't have account</div>
      <div className="title col-4 mx-auto ">Hello, who is this</div>
      <div className="content-form">
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
          <label>Email</label>
          <input
            type="password"
            value={password}
            className="form-control"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <butoon className="btn-submit" onClick={() => handleLogin()}>
            Login
          </butoon>
        </div>
      </div>
    </div>
  );
};

export default Login;
