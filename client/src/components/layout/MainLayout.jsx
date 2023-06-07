// import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../common/GlobalLoading";
import Footer from "../common/Footer";
import Topbar from "../common/Topbar";
import AuthModal from "../common/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import userApi from "../../api/modules/user.api";
import favouriteApi from "../../api/modules/favourite.api";
import { setListFavourites, setUser } from "../../redux/features/userSlice";

const MainLayout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const authUser = async () => {
      const { response, err } = await userApi.getinfo();
      // console.log("Main Layout response:", response);

      if (response) {
        dispatch(setUser(response));
      }

      if (err) dispatch(setUser(null));
    };

    authUser();
  }, [dispatch]);

  useEffect(() => {
    const getFavourites = async () => {
      const { response, err } = await favouriteApi.getList();

      if (response) dispatch(setListFavourites(response));
      if (err) toast.error(err.message);
    };

    if (user) getFavourites();
    if (!user) dispatch(setListFavourites([]));
  }, [user, dispatch]);

  return (
    <>
      {/* global Loading */}
      <GlobalLoading />
      {/* global Loading */}

      {/* Login Modal */}
      <AuthModal />
      {/* Login Modal */}

      <Box display="flex" minHeight="100vh">
        {/* Header */}
        <Topbar />
        {/* Header */}

        {/* Main */}
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
        {/* Main */}
      </Box>

      {/* Footer */}
      <Footer />
      {/* Footer */}
    </>
  );
};

export default MainLayout;
