import axios from "axios";

export const getPaymentOptions = () => {
  return axios({
    method: "GET",
    url: `${process.env.SPC_API}/v1/payment-option?f=s`,
  }).then((res) => {
    return res.data;
  });
};
