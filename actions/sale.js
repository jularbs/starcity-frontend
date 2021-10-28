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

export const processPaypalPayment = (data) => {
  return axios({
    method: "PUT",
    url: `${process.env.SPC_API}/v1/payment/paypal`,
    data: data,
  }).then((res) => {
    return res.data;
  });
};

export const getSaleDetails = (refid) => {
  return axios({
    method: "GET",
    url: `${process.env.SPC_API}/v1/sale/${refid}`,
  }).then((res) => {
    return res.data;
  });
};
