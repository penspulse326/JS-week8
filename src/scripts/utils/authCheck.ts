const axios = require("axios");

// 檢查認證
export default async function authCheck(auth: string) {
  return await axios
    .get("https://todoo.5xcamp.us/check", {
      headers: { Authorization: auth },
    })
    .then((res: any) => {
      if (res.status === 200) {
        return true;
      }
      return false;
    })
    .catch((err: any) => {
      console.clear(); // 清除 axios 的報錯 防止 API 網址暴露
      console.error(err.message);
      return false;
    });
}
