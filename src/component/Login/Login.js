//import logo from "./logo.svg";

import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  handleGoogleSignIn,
  handleSignOut,
  initializeLoginFramework,
  signInWithEmailAndPassword,
} from "./loginManager";

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
  });
  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponse(res, true);
    });
  };

  const signOut = () => {
    handleSignOut().then((res) => {
      handleResponse(res, false);
    });
  };

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  };

  const handleBlur = (event) => {
    //console.log(event.target.name);
    //console.log(event.target.value, event.target.name);
    let isFormValid = true;
    if (event.target.name === "email") {
      isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
      //console.log(isEmailValid);
    }
    if (event.target.name === "password") {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFormValid = isPasswordValid && passwordHasNumber;
    }

    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };

  const handleSubmit = (event) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        (res) => {
          handleResponse(res, true);
        }
      );
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password).then((res) => {
        handleResponse(res, true);
      });
    }
    event.preventDefault();
  };

  return (
    <div style={{ textAlign: "center" }}>
      {user.isSignedIn ? (
        <button onClick={signOut}> sign out </button>
      ) : (
        <button onClick={googleSignIn}> sign in </button>
      )}

      {user.isSignedIn && (
        <div>
          <p>welcome {user.name}</p>
          <p>Your Email Account: {user.email} </p>
          <img src={user.photo} alt="" />
        </div>
      )}
      <h1>Our Own Authentication System.</h1>
      <input
        type="checkbox"
        onChange={() => setNewUser(!newUser)}
        name="newUser"
        id=""
      />
      <label htmlFor="newUser">Registration</label>
      <br />

      {/* <p>Email: {user.email}</p>
      <p>Password: {user.password}</p> */}

      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            type="text"
            name="name"
            onBlur={handleBlur}
            placeholder="Your"
            required
          />
        )}
        <br />

        <input
          type="text"
          name="email"
          onBlur={handleBlur}
          placeholder="Enter your Email"
          required
        />
        <br />
        <input
          type="password"
          name="password"
          onBlur={handleBlur}
          placeholder="Enter your password"
          required
        />
        <br />
        <input type="submit" value={newUser ? "Sign up" : "Sign In"} />
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>
          User {newUser ? "Created" : "Logged In"} successfully
        </p>
      )}
    </div>
  );
}
export default Login;
