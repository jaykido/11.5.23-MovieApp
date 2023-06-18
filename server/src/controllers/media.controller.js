import userModel from "../models/user.model.js";
import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";
import favouriteModel from "../models/favourite.model.js";
import reviewModel from "../models/review.model.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
// const fetch = require("node-fetch");

const getList = async (req, res) => {
  try {
    const { page } = req.query;
    const { mediaType, mediaCategory } = req.params;
    // console.log("Backend:", req.query);
    // console.log("Backend also:", req.params);
    const response = await tmdbApi.MediaList({
      mediaType,
      mediaCategory,
      page,
    });

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getGenres = async (req, res) => {
  try {
    const { mediaType } = req.params;
    // console.log("The real MediaType is:", req.params);

    const response = await tmdbApi.MediaGenres({ mediaType });
    // console.log("The response is:", response);
    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const search = async (req, res) => {
  try {
    const { mediaType } = req.params;
    const { query, page } = req.query;

    const response = await tmdbApi.MediaSearch({
      query,
      page,
      mediaType: mediaType === "people" ? "person" : mediaType,
    });

    return responseHandler(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getDetails = async (req, res) => {
  try {
    const { mediaType, mediaId } = req.params;

    const params = { mediaType, mediaId };

    const media = await tmdbApi.MediaDetails(params);

    media.credits = await tmdbApi.MediaCredits(params);

    const video = await tmdbApi.MediaVideos(params);

    media.video = video;

    const recommend = await tmdbApi.MediaRecommend(params);

    media.recommend = recommend.results;

    media.image = await tmdbApi.MediaImages(params);

    const tokenDecoded = tokenMiddleware.tokenDecode(req);

    if (tokenDecoded) {
      const user = await userModel.findById(tokenDecoded.data);

      if (user) {
        const isFavourite = await favouriteModel.findOne({
          user: user.id,
          mediaId,
        });
        media.isFavourite = isFavourite !== null;
      }
    }

    media.review = await reviewModel
      .find({ mediaId })
      .populate("user")
      .sort("-createdAt");

    return responseHandler.ok(res, media);
  } catch {
    responseHandler.error(res);
  }
};

export default { getList, getGenres, search, getDetails };
