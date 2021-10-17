import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile, OAuthProvider } from "firebase/auth";
import { useState } from "react";
import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';


initializeAuthentication();
const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const yahooProvider = new OAuthProvider('yahoo.com');


function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const auth = getAuth();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        console.log(user);
      })
  }

  const handleGithubSignIn = () => {
    signInWithPopup(auth, gitHubProvider)
      .then(result => {
        const user = result.user;
        console.log(user);
      })
  }

  const handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
      .then(result => {
        const user = result.user;
        console.log(user);
      })
  }

  const handleYahooSignIn = () => {
    signInWithPopup(auth, yahooProvider)
      .then(result => {
        const user = result.user;
        console.log(user);
      })
  }

  const toggleLogin = e => {
    setIsLogin(e.target.checked)
  }

  const handleNameChange = e => {
    setName(e.target.value);
  }
  const handleEmailChange = e => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const handleRegistration = e => {
    e.preventDefault();
    console.log(email, password);
    if (password.length < 6) {
      setError('Password Must be at least 6 characters long.')
      return;
    }
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setError('Password Must contain 2 upper case');
      return;
    }

    if (isLogin) {
      processLogin(email, password);
    }
    else {
      registerNewUser(email, password);
    }

  }

  const processLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        setError('');
      })
      .catch(error => {
        setError(error.message);
      })
  }

  const registerNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        setError('');
        verifyEmail();
        setUserName();
      })
      .catch(error => {
        setError(error.message);
      })
  }

  const setUserName = () => {
    updateProfile(auth.currentUser, { displayName: name })
      .then(result => { })
  }

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(result => {
        console.log(result);
      })
  }

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(result => { })
  }

  return (
    <>
      <div className="mx-5">
        <div className="form-container mx-auto">
          <form onSubmit={handleRegistration}>
            <h3 className="text-primary my-3">Please {isLogin ? 'Login' : 'Register'}</h3>
            <div className="input-style">
              {!isLogin && <div className="row mb-3">
                <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-10">
                  <input type="text" onBlur={handleNameChange} className="form-control" id="inputName" placeholder="Your Name" />
                </div>
              </div>}
              <div className="row mb-3">
                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                  <input onBlur={handleEmailChange} type="email" className="form-control" id="inputEmail3" placeholder="Enter Email" required />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                  <input type="password" onBlur={handlePasswordChange} className="form-control" id="inputPassword3" placeholder="Enter Password" required />
                </div>
              </div>
            </div>

            <div className="row text-danger">{error}</div>

            <div className="col-sm-10 ms-auto">
              {!isLogin ? <div></div> :
                <button type="button" onClick={handleResetPassword} className="button-reset mb-2">Reset Password</button>}
              <button type="submit" className="submit-button">
                {isLogin ? 'Login' : 'Register'}
              </button>
            </div>

          </form>

          {!isLogin ? <div className="my-4">SignUp with</div>
            :
            <div className="my-3">SignIn with</div>
          }

          <div>
            <button className="icon" onClick={handleGoogleSignIn}><i className="fab fa-google"></i></button>
            <button className="ms-4 icon" onClick={handleGithubSignIn}><i className="fab fa-github-square"></i></button>
            <button className="ms-4 icon" onClick={handleFacebookSignIn}><i className="fab fa-facebook-square"></i></button>
            <button className="ms-4 icon" onClick={handleYahooSignIn}><i className="fab fa-yahoo"></i></button>
          </div>

          <div className="mt-4">
            {!isLogin ? <p>Already Registered? <span className="para-pointer" onClick={() => { setIsLogin(true) }}>Login Now</span></p> :
              <p>Are you new user? <span className="para-pointer" onClick={() => { setIsLogin(false) }}>Signup here</span></p>}
          </div>


          {/* {!isLogin ? <div className="form-check my-5">
            <label className="form-check-label" htmlFor="gridCheck1">
              Already Registered? &nbsp;
            </label>
            <input onChange={toggleLogin} type="checkbox" id="gridCheck1" />&nbsp; Click Here
          </div>
            :
            <div></div>
          } */}

        </div>
      </div>
    </>
  );
}

export default App;
