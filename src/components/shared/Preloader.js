import LoaderImg from "../../assets/images/loader.gif";

const Loader = () => {
  return (
    <>
      <div className="loaderOuter">
        <div className="loaderInner">
          <img src={LoaderImg} alt="Loader" />
        </div>
      </div>
    </>
  );
};
export default Loader;
