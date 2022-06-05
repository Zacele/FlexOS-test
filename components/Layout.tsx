import * as React from "react";
import Navbar from "./Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Navbar />
      {children}
    </div>
  );
};

export default MainLayout;
