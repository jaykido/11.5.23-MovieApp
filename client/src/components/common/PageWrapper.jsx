// import React from 'react'
import { useDispatch } from "react-redux";
import { setAppState } from "../../redux/features/appStateSlice";
import { useEffect } from "react";

const PageWrapper = ({ state, children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setAppState(state));
  }, [state, dispatch]);

  return children;
};

export default PageWrapper;
