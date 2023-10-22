const axios = require("axios");

// 檢查認證
async function sendCheckRequest(token: string) {
  try {
    return axios.get(process.env.API_CHECK, {
      headers: { Authorization: token },
    });
  } catch (err) {
    throw err;
  }
}

export default async function (token: string) {
  try {
    const res = await sendCheckRequest(token);
    return res.status === 200 ? true : false;
  } catch (err) {
    return false;
  }
}
