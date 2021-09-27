import LoaderImg from "../../assets/images/lineLoading.gif";

const Loader2 = () => {
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
export default Loader2;
