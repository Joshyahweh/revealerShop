import React, { useState } from "react";
import { Link } from "react-router-dom";
import resetImg from "../../assets/forgot.png";
import styles from "./auth.module.css";
import Pulse from "react-reveal/Pulse";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false);
        toast.success("Check your email for a reset link");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };
  return (
    <>
      {isLoading && <Loader />}
      <section className="w-full py-16 px-[20px] max-w-[1000px] my-0 mx-auto">
        <Pulse>
          <main className=" py-10 sm:grid grid-cols-2 text-white">
            <img
              src={resetImg}
              alt="Reset Password"
              className="w-[600px] hidden sm:w-[600px] sm:block"
            />
            <div className={styles.cardd}>
              <h2 className="text-[#fffa5b] font-bold text-center text-2xl">
                Reset Password
              </h2>
              <form
                className="flex flex-col py-5 gap-5"
                onSubmit={resetPassword}
              >
                <input
                  className="px-5 py-3 border-black rounded-md focus:outline-none focus:ring focus:ring-[#fffa5b] text-gray-600"
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className={styles["neu-btn"]}>
                  Reset Password
                </button>
                <div className="flex justify-between items-center relative top-12">
                  <Link className="hover:text-[#fffa5b]" to="/login">
                    -Login
                  </Link>
                  <Link className="hover:text-[#fffa5b]" to="/register">
                    -Register
                  </Link>
                </div>
              </form>
            </div>
          </main>
        </Pulse>
      </section>
    </>
  );
};

export default Reset;
