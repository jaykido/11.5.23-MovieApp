const favoiriteUtils = {
  check: ({ listFavourites, mediaId }) =>
    listFavourites &&
    listFavourites.find((e) => e.mediaId.toString() === mediaId.toString()) !==
      undefined,
};

export default favoiriteUtils;
