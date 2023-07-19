import React from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

export default function RootLayout() {
  return (
    <>
      <MainNavigation />
      {/* This component marks where the child route is rendered */}
      <Outlet></Outlet>
    </>
  );
}
