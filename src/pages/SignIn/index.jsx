import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../../store/userSlice";
import "./signIn.css";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;
    const remember = e.target.rememberMe.checked;

    try {
      const userData = {
        email: username,
        password: password,
      };
      const payload = JSON.stringify(userData);
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: payload,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur de connexion.");
      }

      dispatch(logIn(data.body.token));
      if (remember) localStorage.setItem('token', data.body.token)
        
      navigate("/user");
    } catch (error) {
      console.error(error);
      alert(error.message || "Erreur de connexion.");
    }
  };

  return (
    <div className="page main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="rememberMe" name="rememberMe" />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <button className="sign-in-button">Sign In</button>
        </form>
      </section>
    </div>
  );
};

export default SignIn;
