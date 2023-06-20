import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const HomePage = (props) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  return (
    <div className="homepage-container">
      <div className="homepage-content">
        <h1 className="title-1">There's a better way to ask</h1>
        <p size="1" className="sc-e4119f42-0 sc-f0926ccc-0 jdzYAR cOwCAv">
          You don't want to make a boring form. And your audience won't answer
          one. Create a typeform instead—and make everyone happy.
        </p>
        <div className="title-2">Test</div>
        <div className="title-3">
          {isAuthenticated == false ? (
            <button onClick={() => navigate("/login")}>
              Get Get started - it's free
            </button>
          ) : (
            <button onClick={() => navigate("/user")}>Doing Quiz Now</button>
          )}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
