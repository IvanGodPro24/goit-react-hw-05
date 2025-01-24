import { Link } from "react-router-dom";
import css from "./BackLink.module.css";
import { IoArrowBackCircleSharp } from "react-icons/io5";

const BackLink = ({ to }) => {
  return (
    <Link to={to} className={css.backbtn}>
      <IoArrowBackCircleSharp size="40" />
    </Link>
  );
};

export default BackLink;
