import React from "react";
import { Outlet } from "react-router-dom";

const AuthenLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthenLayout;
