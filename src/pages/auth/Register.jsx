import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import registerImg from "../../assets/register.png";
import styles from "./auth.module.css";
import Pulse from "react-reveal/Pulse";

import { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    return (
      password !== cpassword ? toast.error("Password did not match") : "",
      setIsLoading(true),
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          // eslint-disable-next-line
          const user = userCredential.user;
          setIsLoading(false);
          toast.success("Registration Successfull...");
          navigate("/login");
          // ...
        })
        .catch((error) => {
          toast.error(error.message);
          setIsLoading(false)
        })
    );
  };
  return (
    <>
      {isLoading && <Loader />}
      <section className="w-full py-16 px-[20px] max-w-[1000px] my-0 mx-auto">
        <Pulse>
          <main className=" py-10 sm:grid grid-cols-2 text-white w-full h-full">
            <div className={styles.card}>
              <h2 className="text-[#fffa5b] font-bold text-center text-2xl">
                Register
              </h2>
              <form
                className="flex flex-col py-5 gap-5"
                onSubmit={handleSubmit}
              >
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
                <input
                  className="px-5 py-3 border-black rounded-md focus:outline-none focus:ring focus:ring-[#fffa5b] text-gray-600"
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={cpassword}
                  onChange={(e) => setCPassword(e.target.value)}
                />
                <button type="submit" className={styles["neu-btn"]}>
                  Register
                </button>
              </form>
              <p className="flex items-center justify-center gap-2">
                Already have an account?{" "}
                <Link to="/login">
                  <strong className="text-[#fffa5b]">Login</strong>
                </Link>
              </p>
            </div>
            <img
              src={registerImg}
              alt="Register"
              className="w-[600px] hidden sm:w-[600px] sm:block"
            />
          </main>
        </Pulse>
      </section>
    </>
  );
};

export default Register;
