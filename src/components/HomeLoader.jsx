import React from "react";
import { Oval } from "react-loader-spinner";

const HomeLoader = () => {
  return (
    <div className="loader-Home-container">
      <Oval
        height={100}
        width={100}
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

export default HomeLoader;
