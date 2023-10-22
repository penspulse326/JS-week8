import navigate from "../utils/navigate";
import { setStorageItem } from "../utils/storageAPI";

const axios = require("axios");
const Swal = require("sweetalert2");

// 登入請求
async function sendLoginRequest(data: PostData) {
  const repoUrl = "/js-week8";
  //測試用url
  // const path = window.location.pathname;
  // const target = path === "/" ? "." : "..";

  try {
    return axios.post(process.env.API_LOGIN, data);
  } catch (err) {
    throw err;
  }
}

// 登入行為
async function login(data: PostData) {
  const repoUrl = "/js-week8";
  //測試用url
  const path = window.location.pathname;
  const target = path === "/" ? "." : "..";

  try {
    const res: ResData = await sendLoginRequest(data);
    setStorageItem("todoToken", res.headers.authorization);
    setStorageItem("nickname", res.data.nickname!);
    navigate(`${target}/todo/`);
  } catch (err: any) {
    Swal.fire(err.response.data.message, "電子信箱或密碼錯誤。", "error");
  }
}

// 登入事件處理
export function loginController(form: HTMLFormElement) {
  const data: PostData = {
    user: {
      email: form.email.value,
      password: form.password.value,
    },
  };

  login(data);
}

// 註冊請求
async function sendSignupRequest(data: PostData) {
  try {
    return axios.post(process.env.API_SIGNUP, data);
  } catch (err) {
    throw err;
  }
}

// 註冊事件處理 註冊成功會透過呼叫 login 導向到 todo 頁面
export async function signupController(form: HTMLFormElement) {
  const data: PostData = {
    user: {
      email: form.email.value,
      nickname: form.nickname.value,
      password: form.password.value,
    },
  };

  try {
    sendSignupRequest(data);
    login(data);
  } catch (err: any) {
    Swal.fire(err.response.data.message, err.response.data.error[0], "error");
  }
}

// 型別定義
type UserData = {
  email: string;
  password: string;
  nickname?: string;
};
type PostData = {
  user: UserData;
};

type ResData = {
  data: UserData;
  headers: any;
  status: number;
};
