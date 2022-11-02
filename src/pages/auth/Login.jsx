import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../assets/login.png";
import styles from "./auth.module.css";
import { FaGoogle } from "react-icons/fa";
import Pulse from "react-reveal/Pulse";
import { toast } from "react-toastify";
import { auth } from "../../firebase/config";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Loader from "../../components/loader/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(!isLoading);
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // eslint-disable-next-line
        const user = userCredential.user;
        setIsLoading(false);
        toast.success("Login Successfull");
        navigate("/");
        // ...
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };
// Login with Google
const provider = new GoogleAuthProvider();
  const signinWithGoogle = ()=> {
    signInWithPopup(auth, provider)
  .then((result) => {
    
    // The signed-in user info.
    // eslint-disable-next-line
    const user = result.user;
    toast.success('Login Successful')
    navigate('/')
    // ...
  }).catch((error) => {
    toast.error(error.message)
    
  });
  }
  return (
    <>
      {isLoading && <Loader />}
      <section className="w-full py-16 px-[20px] max-w-[1000px] my-0 mx-auto">
        <Pulse>
          <main className=" py-10 sm:grid grid-cols-2 text-white">
            <img
              src={loginImg}
              alt="Login"
              className=" hidden sm:w-[600px] sm:block"
            />
            <div className={styles.card}>
              <h2 className="text-[#fffa5b] font-bold text-center text-2xl">
                Login
              </h2>
              <form className="flex flex-col py-5 gap-5" onSubmit={handleLogin}>
                <input
                  className="px-5 py-3 border-black rounded-md focus:outline-none focus:ring focus:ring-[#fffa5b] text-gray-600"
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="px-5 py-3 border-black rounded-md focus:outline-none focus:ring focus:ring-[#fffa5b] text-gray-600"
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className={styles["neu-btn"]}>
                  Login
                </button>
                <div className="text-center">
                  <Link to="/reset" className="text-[#fffa5b]">
                    Forget Password
                  </Link>
                  <p>-- or --</p>
                </div>
              </form>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "10px",
                }}
              >
                <button
                  className={styles["neu-btn"]}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                  }}
                  onClick={signinWithGoogle}
                >
                  <FaGoogle /> Login With Google
                </button>
              </div>
              <p className="flex items-center justify-center gap-2">
                Don't have an account?{" "}
                <Link to="/register">
                  <strong className="text-[#fffa5b]">Register</strong>
                </Link>
              </p>
            </div>
          </main>
        </Pulse>
      </section>
    </>
  );
};

export default Login;
