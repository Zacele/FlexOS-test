import * as React from "react";
import Navbar from "./Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-screen overflow-hidden">
      <Navbar />
      {children}
    </div>
  );
};

export default MainLayout;
