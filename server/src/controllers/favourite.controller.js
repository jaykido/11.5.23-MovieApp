import responseHandler from "../handlers/response.handler.js";
import favouriteModel from "../models/favourite.model.js";

const addFavourite = async (req, res) => {
  try {
    const isFavourite = await favouriteModel.findOne({
      user: req.user.id,
      mediaId: req.body.mediaId,
    });

    if (isFavourite) {
      console.log("isFavourite:", isFavourite);
      return responseHandler.ok(res, isFavourite);
    }

    const favourite = new favouriteModel({
      ...req.body,
      user: req.user.id,
    });

    console.log("New favourite:", favourite);

    await favourite.save();

    responseHandler.created(res, favourite);
  } catch (error) {
    responseHandler.error(res, error);
  }
};

const removeFavourite = async (req, res) => {
  try {
    const { favouriteId } = req.params;

    const favourite = await favouriteModel.findOne({
      user: req.user.id,
      _id: favouriteId,
    });

    if (!favourite) return responseHandler.notfound(res);

    await favourite.remove();

    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

const getFavouriteOfUser = async (req, res) => {
  try {
    const favourite = await favouriteModel
      .find({ user: req.user.id })
      .sort("-createdAt");

    // console.log("User's favourites:", favourite);

    responseHandler.ok(res, favourite);
  } catch (error) {
    responseHandler.error(res, error);
  }
};

export default { addFavourite, removeFavourite, getFavouriteOfUser };
