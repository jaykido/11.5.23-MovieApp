import tmdbConfig from "./tmdb.config.js";

const tmdbEndpoints = {
  mediaList: ({ mediaType, mediaCategory, page }) =>
    tmdbConfig.geturl(`${mediaType}/${mediaCategory}`, page),
  mediaDetails: ({ mediaType, mediaId }) =>
    tmdbConfig.geturl(`${mediaType}/${mediaId}`),
  mediaGenres: ({ mediaType }) => tmdbConfig.geturl(`genre/${mediaType}/list`),
  mediaCredits: ({ mediaType, mediaId }) =>
    tmdbConfig.geturl(`${mediaType}/${mediaId}/credits`),
  mediaVideos: ({ mediaType, mediaId }) =>
    tmdbConfig.geturl(`${mediaType}/${mediaId}/videos`),
  mediaRecommend: ({ mediaType, mediaId }) =>
    tmdbConfig.geturl(`${mediaType}/${mediaId}/recommendations`),
  mediaImage: ({ mediaType, mediaId }) =>
    tmdbConfig.geturl(`${mediaType}/${mediaId}/images`),
  mediaSearch: ({ mediaType, query, page }) =>
    tmdbConfig.geturl(`${mediaType}/${mediaId}`, { query, page }),
  personDetails: ({ personId }) => tmdbConfig.geturl(`/person${personId}`),
  personMedias: ({ personId }) =>
    tmdbConfig.geturl(`/person${personId}/combibed_credits`),
};

export default tmdbEndpoints;
