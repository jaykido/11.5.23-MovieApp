import publicClient from "../client/public.client";

const personEndpoints = {
  detail: ({ personId }) => `person/${personId}`,
  medias: ({ personId }) => `person/${personId}/medias`,
};

const personApi = {
  details: async ({ personId }) => {
    try {
      const response = await publicClient.get(
        personEndpoints.detail({ personId })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  medias: async ({ personId }) => {
    console.log("here in the medias:", personId);
    try {
      const response = await publicClient.get(
        personEndpoints.medias({ personId })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default personApi;
