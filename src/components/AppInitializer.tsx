"use client";

import { getProfile } from "@/redux/features/auth/authThunk";
import { AppDispatch } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    //  ALWAYS call profile
    dispatch(getProfile());
  }, [dispatch]);

  return <>{children}</>;
};

export default AppInitializer;