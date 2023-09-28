import React from "react";
import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="loader-container">
      <Oval
        height={30}
        width={30}
        color="#000"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#aaa"
        strokeWidth={8}
        strokeWidthSecondary={8}
      />
    </div>
  );
};

export default Loader;
