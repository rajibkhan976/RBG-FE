import React, { useState } from "react";
import ProductListing from "./products/productListing";


const Products = () => {
  document.title = "Products";
  const [createButton, setCreateButton] = useState(null);
  const [stateFilter, setStateFilter] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  const toggleCreate = (e) => {
    setCreateButton(e);
  };
  const toggleFilter = (e) => {
    setStateFilter(e);
  };
  /**
   * Get user from pagination component
   * @param {*} dataFromChild
   */
//   const getDataFn = (dataFromChild) => {
//     console.log("Filtered Data from child", dataFromChild);
//     if (dataFromChild) {
//       setFilteredData(dataFromChild);
//     }
//   };

  return (
    <>
      <ProductListing
        toggleFilter={toggleFilter}
        toggleCreate={toggleCreate}
        getFilteredData={filteredData}
        // key={Math.random().toString()}
      />
      {/* <ProductFilter
        stateFilter={stateFilter}
        setStateFilter={setStateFilter}
        getData={getDataFn}
      />
      <ProductCreateModal
        createButton={createButton}
        setCreateButton={setCreateButton}
      /> */}
    </>
  );
};

export default Products;
