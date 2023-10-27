const axios = require("axios");

// 檢查認證
async function sendCheckAuthRequest(token: string) {
  const configData: configDataType = {
    headers: { Authorization: token },
  };
  try {
    const response = await axios.get(process.env.API_CHECK, configData);
    return response;
  } catch (err) {
    throw err;
  }
}

export default async function (token: string) {
  try {
    const res = await sendCheckAuthRequest(token);
    return res.status === 200 ? true : false;
  } catch (err) {
    return false;
  }
}

type configDataType = {
  headers: { Authorization: string };
};
