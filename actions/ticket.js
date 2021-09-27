import axios from "axios";

export const getTickets = (sale) => {
  return axios({
    method: "get",
    url: `${process.env.SPC_API}/v1/ticket`,
  }).then((res) => {
    return res.data;
  });
};
