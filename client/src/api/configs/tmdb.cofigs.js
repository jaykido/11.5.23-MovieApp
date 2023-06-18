const mediaType = {
  movie: "movie",
  tv: "tv",
};

const mediaCategory = {
  popular: "popular",
  top_rated: "top_rated",
};

const backdropPath = (imageEndpoint) =>
  `https://image.tmdb.org/t/p/original${imageEndpoint}`;

// https://api.themoviedb.org/3/collection/collection_id/
const posterPath = (imageEndpoint) =>
  `https://image.tmdb.org/t/p/w500${imageEndpoint}`;

const youtubePath = (videoId) =>
  `https://www.youtube.com/embed/${videoId}?controls=0`;

const tmdbConfigs = {
  mediaType,
  mediaCategory,
  backdropPath,
  posterPath,
  youtubePath,
};

export default tmdbConfigs;
