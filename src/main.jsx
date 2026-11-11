import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RouteProtector from "./components/RouteProtector";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import User from "./pages/User";
import "./main.css";
import { logIn } from "./store/userSlice";

const token = localStorage.getItem("token");
if (token) store.dispatch(logIn(token));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          {/* <ScrollToTop /> */}
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route element={<RouteProtector />}>
                <Route path="/user" element={<User />} />
              </Route>
              {/* <Route path='/404' element={<Error />} /> */}
              {/* <Route path='*' element={<Error />} /> */}
            </Route>
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
