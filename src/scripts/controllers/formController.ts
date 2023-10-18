const axios = require("axios");
const apiUrl = "https://todoo.5xcamp.us/users";

// 註冊事件處理
export function signupController(form: HTMLFormElement) {
  // 解構階段好像不能寫型別，所以為了減少後續狂寫 as 只好一個一個取出
  const email: HTMLInputElement = form.email;
  const nickname: HTMLInputElement = form.nickname;
  const password: HTMLInputElement = form.password;

  // 定義要打給 API 的資料
  const data = {
    user: {
      email: email.value,
      nickname: nickname.value,
      password: password.value,
    },
  };

  // 註冊請求成功會把 header 給的 token 存到 local
  // 再透過 login 函式轉跳進到 todo 畫面
  axios
    .post(apiUrl, data)
    .then((res: any) => {
      localStorage.setItem("todo", res.headers.authorization);
      login(email.value, password.value);
    })
    .catch((err: any) => {
      console.clear(); // 清除 axios 的報錯 防止 API 網址暴露
      console.error(err.message);
      alert("註冊失敗，請確認該 Email 是否已註冊，或者稍後再試");
    });
}

// 登入事件處理
export function loginController(form: HTMLFormElement) {
  const email: HTMLInputElement = form.email;
  const password: HTMLInputElement = form.password;

  login(email.value, password.value);
}

// 登入請求
function login(email: string, password: string) {
  const repoUrl = "/js-week8";
  //測試用url
  // const path = window.location.pathname;
  // const target = path === "/" ? "." : "..";
  axios
    .post(apiUrl + "/sign_in", {
      user: {
        email,
        password,
      },
    })
    .then((res: any) => {
      localStorage.setItem("todo", res.headers.authorization);
      window.location.href = `${repoUrl}/todo/?nickname=${res.data.nickname}`; // 帶入 query string 讓 todo 頁面可以抓到 nickname
    })
    .catch((err: any) => {
      console.clear(); // 清除 axios 的報錯 防止 API 網址暴露
      console.error(err.message);
      alert("請檢查 Email 及密碼是否有誤，或者是否已註冊該 Email");
    });
}
