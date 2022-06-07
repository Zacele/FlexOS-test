import * as React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-screen overflow-hidden">
      {children}
    </div>
  );
};

export default MainLayout;
