import { async } from "../../../node_modules/validate.js/validate";

const axios = require("axios");
const apiUrl = "https://todoo.5xcamp.us/users";
const Swal = require("sweetalert2");

// 登入請求
async function sendLoginRequest(data: UserData) {
  const repoUrl = "/js-week8";
  //測試用url
  // const path = window.location.pathname;
  // const target = path === "/" ? "." : "..";

  try {
    return axios.post(`${apiUrl}/sign_in`, data);
  } catch (err) {
    throw err;
  }
}

// 登入行為
async function login(data: UserData) {
  try {
    const res: ResData = await sendLoginRequest(data);
    localStorage.setItem("todo", res.headers.authorization);
    //window.location.href = `${repoUrl}/todo/?nickname=${res.data.nickname}`;
  } catch (err: any) {
    showAlert(err.response.data.message, "電子信箱或密碼錯誤。");
  }
}

// 登入事件處理
export function loginController(form: HTMLFormElement) {
  const data: UserData = {
    user: {
      email: form.email.value,
      password: form.password.value,
    },
  };

  login(data);
}

// 註冊請求
async function sendSignupRequest(data: UserData) {
  const repoUrl = "/js-week8";
  //測試用url
  // const path = window.location.pathname;
  // const target = path === "/" ? "." : "..";

  try {
    return await axios.post(apiUrl, data);
  } catch (err) {
    throw err;
  }
}

// 註冊事件處理 註冊成功會透過呼叫 login 導向到 todo 頁面
export async function signupController(form: HTMLFormElement) {
  const data: UserData = {
    user: {
      email: form.email.value,
      nickname: form.nickname.value,
      password: form.password.value,
    },
  };

  try {
    const res: ResData = await sendSignupRequest(data);
    localStorage.setItem("todo", res.headers.authorization);
    login(data);
  } catch (err: any) {
    showAlert(err.response.data.message, err.response.data.error);
  }
}

const showAlert = (title: string, text: string) =>
  Swal.fire({
    title,
    text,
    icon: "error",
    confirmButtonText: "確認",
  });

// 型別定義
type UserData = {
  user: {
    email: string;
    password: string;
    nickname?: string;
  };
};

type ResData = {
  data: UserData;
  headers: any;
  status: number;
};
