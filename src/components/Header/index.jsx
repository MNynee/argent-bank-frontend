import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/argentBankLogo.webp";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/userSlice";
import { getAuthState, getUserState } from "../../store/selectors";

import "./header.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = useSelector(getAuthState)
  const userData = useSelector(getUserState)

  const handleLogOut = () => {
    dispatch(logOut())
    localStorage.removeItem('token')
    navigate('/')
  };

  return (
    <nav className="main-nav">
      <NavLink to="/" end="" className="main-nav-logo main-nav-link">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>
        {loggedIn !== null ? (
          <NavLink to={'/user'} className="main-nav-item main-nav-link">
            {userData.user.userName ?? ''}<i className="fa-solid fa-circle-user"></i>
          </NavLink>
        ):(null)}
        <button className="main-nav-item main-nav-link" onClick={() => {
          if (loggedIn !== null) {
            handleLogOut()
          } else {
            navigate("/sign-in")
          }
        }}>
          <i className="fa-solid fa-power-off"></i>
          {loggedIn !== null ? "Sign out" : "Sign In"}
        </button>
      </div>
    </nav>
  );
};

export default Header;
