import axios from "axios";

export const downloadAccessPass = (salt, refId, ticket) => {
  return axios({
    method: "GET",
    url: `${process.env.SPC_API}/v1/download/${salt}/${refId}/${ticket}`,
  }).then((res) => {
    return res.data;
  });
};
