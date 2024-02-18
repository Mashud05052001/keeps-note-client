import React from "react";

type PropTypes = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({ children, className }: PropTypes) => {
  return (
    <div className={`${className} min-h-screen max-w-7xl mx-auto`}>
      {children}
    </div>
  );
};

export default Container;
