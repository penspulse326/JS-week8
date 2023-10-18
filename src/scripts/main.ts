import loginPage from "./loginPage";
import signupPage from "./signupPage";

const path = window.location.pathname;

// 判斷是什麼頁面就執行對應的內容
if (path === "/") {
  loginPage();
}

if (path === "/signup/") {
  signupPage();
}
