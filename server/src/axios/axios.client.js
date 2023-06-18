import axios from "axios";

const get = async (url) => {
  const response = await axios.get(url, {
    headers: {
      Accept: "Application/json",
      "Accept-Encoding": "identity",
    },
  });

  // console.log("Axios response:", response);

  return response.data;
};

export default { get };
