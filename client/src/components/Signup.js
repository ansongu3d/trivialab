import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const SIGNUP_URL = "/signup";

export const Signup = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidEmail(email ? true : false);
  }, [email]);

  useEffect(() => {
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        SIGNUP_URL,
        JSON.stringify({ username: user, password: pwd, email }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser("");
      setEmail("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <div className="row d-flex justify-content-center align-items-center ">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="images/login_pic.png"
              className="img-fluid"
              alt="Sample image"
            />
          </div>{" "}
          <div className="col-md-8 col-lg-6 col-xl-3 offset-xl-1">
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                <label className="form-label" for="form3Example4">
                  Username:
                </label>{" "}
                <input
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  className="form-control form-control-lg"
                  placeholder="Enter a valid username"
                />
                <p
                  id="uidnote"
                  className={
                    userFocus && user && !validName
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  4 to 24 characters. Must begin with a letter.
                </p>{" "}
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" for="email">
                  Email:
                </label>{" "}
                <input
                  type="text"
                  id="email"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" for="password">
                  Password:
                </label>{" "}
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  className="form-control form-control-lg"
                  placeholder="Enter a valid password"
                />
                <p
                  id="pwdnote"
                  className={
                    pwdFocus && !validPwd ? "instructions" : "offscreen"
                  }
                >
                  8 to 24 characters. Must include uppercase and lowercase
                  letters, a number and a special character.{" "}
                  <span aria-label="exclamation mark">!</span>{" "}
                  <span aria-label="at symbol">@</span>{" "}
                  <span aria-label="hashtag">#</span>{" "}
                  <span aria-label="dollar sign">$</span>{" "}
                  <span aria-label="percent">%</span>
                </p>{" "}
              </div>

              <div className="form-outline mb-4">
                <label htmlFor="confirm_pwd">Confirm Password:</label>
                <input
                  type="password"
                  id="confirm_pwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                  className="form-control form-control-lg"
                  placeholder="Enter a confirm password"
                />
                <p
                  id="confirmnote"
                  className={
                    matchFocus && !validMatch ? "instructions" : "offscreen"
                  }
                >
                  Must match the first password input field.
                </p>
              </div>
              <div className="form-outline mb-4">
                <button
                  className="btn btn-primary btn-lg"
                  disabled={
                    validName && validEmail && validPwd && validMatch
                      ? true
                      : false
                  }
                >
                  Sign Up
                </button>
              </div>
            </form>
            <p>
              Already registered?
              <br />
              <span className="line">
                <Link to="/login">Log In</Link>
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;