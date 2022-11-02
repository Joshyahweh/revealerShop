import React from "react";
import ReactDOM from "react-dom";
import loaderImg from "../../assets/loader.gif";
const Loader = () => {
  return ReactDOM.createPortal(
    <div className="fixed w-[100vw] h-[100vh] bg-black z-10 ">
      <main className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-[999]">
        <img src={loaderImg} alt="Loading..." />
      </main>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;
