import loginPage from "./loginPage";
import signupPage from "./signupPage";
import todoPage from "./todoPage";

const path = window.location.pathname;

// 判斷是什麼頁面就執行對應的內容
if (path === "/js-week8/") {
  loginPage();
}

if (path === "/js-week8/signup/") {
  signupPage();
}

if (path === "/js-week8/todo/") {
  todoPage();
}
