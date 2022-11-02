import React from "react";
// import styles from "./Footer.module.scss";

const year = new Date().getFullYear();

const Footer = () => {
  return (
    <div className="bg-gray-800  text-white text-center py-5">
      &copy; {year} All Right Reserved
    </div>
  );
};

export default Footer;
