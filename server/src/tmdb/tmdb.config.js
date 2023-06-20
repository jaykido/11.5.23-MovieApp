const baseUrl = process.env.TMDB_BASE_URL;
const key = process.env.TMDB_KEY;

const geturl = (endpoint, params) => {
  const qs = new URLSearchParams(params);
  console.log("URL:", `${baseUrl}${endpoint}&api_key=${key}&${qs}`);
  // console.log("I am here in tmdb:", endpoint);

  if (endpoint.includes("search" || "person")) {
    return `${baseUrl}${endpoint}&api_key=${key}&${qs}`;
  } else {
    return `${baseUrl}${endpoint}?api_key=${key}&${qs}`;
  }
};

export default { geturl };
