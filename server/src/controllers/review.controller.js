import responseHandler from "../handlers/response.handler.js";
import reviewModel from "../models/review.model.js";

const create = async (req, res) => {
  try {
    const { movieId } = req.params;
    const review = new reviewModel({
      user: req.user.id,
      movieId,
      ...req.body,
    });
    await review.save();
    responseHandler.created(res, {
      ...review._doc,
      id: review.id,
      user: req.user,
    });
  } catch {
    responseHandler.error(res);
  }
};

const remove = async (req, res) => {
  try {
    const { reviewId } = req.params;
    console.log("The user:", req.user.id);

    const review = await reviewModel.findOneAndDelete({
      _id: reviewId,
      user: req.user.id,
    });
    console.log("The review:", review);

    if (!review) return responseHandler.notfound(res);

    responseHandler.ok(res, review);
  } catch {
    responseHandler.error(res);
  }
};

const getReviewsOfUser = async (req, res) => {
  try {
    const review = await reviewModel
      .find({
        user: req.user.id,
      })
      .sort("-createdAt");

    responseHandler.ok(res, review);
  } catch {
    responseHandler;
  }
};

export default { create, remove, getReviewsOfUser };
