"use client";

import { useState, useEffect } from "react";
import Loading from "./loading";


export default function LoadingWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 7 seconds

    return () => clearTimeout(timer);
  }, []);

  return isLoading ? <Loading /> : <>{children}</>;
}
