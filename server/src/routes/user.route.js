import express from "express";
import { body } from "express-validator";
import favouriteController from "../controllers/favourite.controller.js";
import userController from "../controllers/user.controller.js";
import requestHandler from "../handlers/request.handler.js";
import userModel from "../models/user.model.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

const router = express.Router();

const logRequestData = (req, res, next) => {
  console.log("The body is body:", body);
  next();
};

router.post(
  "/signup",
  body("username")
    .exists()
    .withMessage("username is required")
    .isLength({ min: 8 })
    .withMessage("Username must be at least 8 characters long")
    .custom(async (value) => {
      const user = await userModel.findOne({ username: value });
      if (user) return Promise.reject("Username already in use");
    }),
  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("Minimum password length is 8 characters"),
  body("confirmPassword")
    .exists()
    .withMessage("confirm password is required")
    .isLength({ min: 8 })
    .withMessage("Minimum Password confirmation should be 8 characters")
    .custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error("Password confirmation does not match");

      return true;
    }),
  body("displayName")
    .exists()
    .withMessage("display name is required")
    .isLength({ min: 8 })
    .withMessage("Minimum displayName length is 8 characters"),
  // logRequestData,
  userController.signup
);

router.post(
  "/signin",

  body("username")
    .exists()
    .withMessage("username is required")
    .isLength({ min: 8 })
    .withMessage("Username minimum must be 8 charactors"),
  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password minimum must be 8 charactors"),
  requestHandler.validate,
  userController.signin
);

router.put(
  "/update-password",
  tokenMiddleware.auth,
  body("password")
    .exists()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("password minimum must be 8 charactors"),
  body("newPassword")
    .exists()
    .withMessage("a new passord is required")
    .isLength({ min: 8 })
    .withMessage("new Password minimum must be 8 charactors"),
  body("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("Minimus Password confirmation should be 8 charactors")
    .custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error("Password confrirmation is not a match");
      return true;
    }),
  requestHandler.validate,
  userController.updatePassword
);

router.get("/info", tokenMiddleware.auth, userController.getInfo);

router.get(
  "/favourites",

  tokenMiddleware.auth,
  favouriteController.getFavouriteOfUser
);

router.post(
  "/favourites",
  tokenMiddleware.auth,
  body("mediaType")
    .exists()
    .withMessage("mediaType is required")
    .custom((value) => ["movie", "tv"].includes(value))
    .withMessage("MediaType is invalid"),
  body("mediaId")
    .exists()
    .withMessage("mediaId is required")
    .isLength({ min: 1 })
    .withMessage("mediaId can not be empty"),
  body("mediaTitle").exists().withMessage("mediaTitle is required"),
  body("mediaPoster").exists().withMessage("mediaPoster is required"),
  body("mediaRate").exists().withMessage("mediaRate is required"),
  requestHandler.validate,
  favouriteController.addFavourite
);

router.delete(
  "/favourites/:favouriteId",
  tokenMiddleware.auth,
  favouriteController.removeFavourite
);
export default router;
