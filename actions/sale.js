import axios from "axios";

export const getAccessPass = (salt, refid) => {
  return axios({
    method: "GET",
    url: `${process.env.SPC_API}/v1/access-pass`,
    params: {
      salt: salt,
      refid: refid,
    },
  }).then((res) => {
    return res.data;
  });
};
