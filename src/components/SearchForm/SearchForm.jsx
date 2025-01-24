import toast from "react-hot-toast";
import css from "./SearchForm.module.css";

const SearchForm = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const value = e.target.elements.query.value;

    if (value.trim() === "") {
      toast.error("Please enter search term!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

      return;
    }

    onSubmit(value);

    e.target.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input type="text" name="query" className={css.input} />

      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
