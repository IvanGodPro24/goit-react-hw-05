import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onLoad }) => {
  return (
    <button className={css.load} onClick={onLoad}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
