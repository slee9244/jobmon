import React from "react";
import useJob from "../context/JobContext";

const LoadingBar = () => {
  const {
    state: { isLoading },
  } = useJob();

  return (
    isLoading && (
      <div className="fixed left-0 w-full">
        <div className="h-1 bg-purple-600 animate-pulse"></div>
      </div>
    )
  );
};

export default LoadingBar;
