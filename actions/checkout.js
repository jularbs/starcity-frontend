import axios from "axios";

export const createCheckout = (sale) => {
  return axios({
    method: "POST",
    url: `${process.env.SPC_API}/v1/create-checkout`,
    data: sale,
  }).then((res) => {
    return res.data;
  });
};