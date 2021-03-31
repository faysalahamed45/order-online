import React, { useContext, useState } from 'react';
import './LogIn.css'
import firebase from "firebase/app";
import "firebase/auth";
// import Header from '../components/Header/Header';
import firebaseConfig from './firebase.config';

import { useHistory, useLocation } from 'react-router';
import { userCreate } from '../../App';
import Header from '../Header/Header';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

const LogIn = () => {
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    // const {loogedInUser,setLoggedInUser} = useContext(UserContext);
    const [password, setPassword] = useState({})
    const [newUser, setNewUser] = useState(false);
    const [loggedInUser, setLoggedInUser] = useContext(userCreate);



    const [user, setUser] = useState({
        isSigned: false,
        name: "",
        email: "",
        password: "",
        error: "",
        errorDisMatch: "",
        passworError: "",
        success: false,

    })


    const googleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((res) => {
                const { displayName, email } = res.user;
                const signedInUser = {
                    isSigned: true,
                    name: displayName,
                    email: email,
                    success: true,
                }
                setUser(signedInUser);
                const signedInUser1 = { name: displayName, email, success: true };
                setLoggedInUser(signedInUser1);
                history.replace(from);
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
    }

    const inputFieldChange = (e) => {
        console.log(e.target.value);
        let isValid;
        if (e.target.name === 'name') {
            isValid = e.target.value;
        }
        if (e.target.name === 'email') {
            const valid = /\S+@\S+\.\S+/.test(e.target.value);
            if (valid) {
                isValid = valid;

            }
            else {
                const emailError = "email is not correct";
                const userInfo = { ...user };
                userInfo.passworError = "";
                userInfo.errorDisMatch = "";
                userInfo.error = "";
                userInfo.emailError = emailError;
                setUser(userInfo);

            }
        }
        if (e.target.name === 'confrimPassword') {
            const isValue = e.target.value;
            const isLengthValid = e.target.value.length > 6;
            const isCharacterValid = /\d{1}/.test(e.target.value);
            const valid = isLengthValid && isCharacterValid
            if (valid) {
                setPassword(isValue);
                const userInfo = { ...user };
                userInfo.error = "";
                userInfo.passworError = "";
                userInfo.errorDisMatch = "";
                setUser(userInfo);
            }
            else {
                const passworError = "password must be 6 character and contain 1 number"
                const userInfo = { ...user };
                userInfo.errorDisMatch = "";
                userInfo.passworError = passworError;
                userInfo.error = "";
                setUser(userInfo);

            }
        }
        if (e.target.name === 'password') {
            const isValue = e.target.value;
            const isLengthValid = e.target.value.length > 6;
            const isCharacterValid = /\d{1}/.test(e.target.value);
            const valid = isLengthValid && isCharacterValid
            if (valid) {
                if (password === isValue) {
                    isValid = valid;

                    console.log("password match");
                }
                else {
                    const passworError = "password do not match"
                    const userInfo = { ...user };
                    userInfo.passworError = "";
                    userInfo.errorDisMatch = passworError;
                    userInfo.error = "";
                    setUser(userInfo);
                    console.log("password do not match");
                }
            }
            else {
                const passworError = "password do not match"
                const userInfo = { ...user };
                userInfo.passworError = "";
                userInfo.errorDisMatch = passworError;
                userInfo.error = "";
                setUser(userInfo);
            }
        }

        if (isValid) {
            const userInfo = { ...user };
            userInfo.errorDisMatch = "";
            userInfo.emailError = "";
            userInfo.error = "";
            userInfo[e.target.name] = e.target.value;
            setUser(userInfo);
        }
        e.preventDefault();
    }

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const userInfo = { ...user };
                    userInfo.error = "";
                    setUser(userInfo);
                    handleUserUpdate(user.name)
                })
                .catch((error) => {
                    var errorCode = error.code;
                    const userInfo = { ...user };
                    userInfo.error = error.message;
                    setUser(userInfo);
                });
            console.log(user.email, user.password);
        }
        if (!newUser && user.email && user.password) {

            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const userInfo = { ...user };
                    userInfo.error = "";
                    userInfo.success = true;
                    setUser(userInfo);
                    const { displayName, email } = res.user;
                    //const success=true;
                    const signedInUser = { name: displayName, email, success: true };
                    setLoggedInUser(signedInUser);
                    history.replace(from);
                })
                .catch((error) => {
                    var errorCode = error.code;
                    const userInfo = { ...user };
                    userInfo.error = error.message;
                    userInfo.success = false;
                    setUser(userInfo);
                    console.log(error.message);
                });
        }
        e.preventDefault();
    }
    const handleUserUpdate = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,

        }).then(function () {
            // Update successful.
        }).catch(function (error) {
            // An error happened.
        });
    }

    return (
        <div>
            <Header userName={loggedInUser.name} success={loggedInUser.success}></Header>
            {/* <p>name:{user.name}</p>
                <h6>error:{user.errorDisMatch}</h6>
                <h1>name: {user.password}</h1>
                <h2>email: {user.email}</h2>
                <p>fa:{user.success}</p> */}
            <div className="login-container">
            <div className="container-margin">
                    <div className="create-account-container">
                        <h2>{newUser ? "Create an account" : "Login"}</h2>
                        <form onSubmit={handleSubmit}>
                            {newUser && <input type="text" name="name" placeholder="Name" onBlur={inputFieldChange} required />}<br />
                            <h6></h6>

                            <input type="text" name="email" placeholder="Username or Email" onChange={inputFieldChange} required /><br />
                            <h6>{user.emailError}</h6>

                            <input type="password" name="confrimPassword"
                                placeholder="Password"
                                onChange={inputFieldChange} required /><br />
                            <h6>{user.passworError}</h6>


                            <input type="password" name="password" placeholder="Confrim Password" onChange={inputFieldChange} required />
                            <h6>{user.errorDisMatch}</h6><br />

                            <div className="submit-btn">
                                <input className="submit" type="submit" value={newUser ? "Create a Account" : "LogIn"} />
                            </div>
                            <p className="have-account"> {newUser ? "Already have an account" : "Create an account"} <span onClick={() => setNewUser(!newUser)}>{newUser ? "Login" : "SignUp"}</span></p>

                        </form>
                        <small style={{ color: "green" }}>{user.error}</small>
                        {
                            user.success && <small style={{ color: "green" }}>{loggedInUser.name} user {newUser ? "created" : "login"} successfully</small>
                        }
                        <h3 className="sign-up-heading">Sign Up With</h3>
                        <div className="btn-container">

                            <div> <button className="button" onClick={googleSignIn}><i className="fab fa-google fa-2x"></i> <i className="icon-text"></i>GOOGLE</button>
                            </div>
                            <div>
                                <button className="button" onClick=""><i className="fab fa-github-square fa-2x"></i><i className="icon-text"></i>GITHUB</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default LogIn;