import { Triangle } from "react-loader-spinner";

const Loader = () => {
  return (
    <Triangle
      visible={true}
      height="80"
      width="80"
      color="#fff"
      ariaLabel="triangle-loading"
      wrapperStyle={{
        display: "flex",
        justifyContent: "center",
      }}
      wrapperClass=""
    />
  );
};

export default Loader;
