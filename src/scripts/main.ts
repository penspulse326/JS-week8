import { $ } from "./utils/selector";
import {
  loginController,
  signupController,
} from "./controllers/formController";
import formCheck from "./utils/formCheck";
import todoPage from "./todoPage";

const path = window.location.pathname;

// 判斷是什麼頁面就執行對應的內容
// switch (path) {
//   case "/js-week8/":
//     handleFormSubmit(".form-login");
//     break;
//   case "/js-week8/signup/":
//     handleFormSubmit(".form-signup");
//     break;
//   case "/js-week8/todo/":
//     todoPage();
//     break;
//   default:
//     break;
// }

// 本機測試用 url
switch (path) {
  case "/":
    handleFormSubmit(".form-login");
    break;
  case "/signup/":
    handleFormSubmit(".form-signup");
    break;
  case "/todo/":
    todoPage();
    break;
  default:
    break;
}

// 處理登入或註冊的表單行為
function handleFormSubmit(formName: string): void {
  const form: HTMLFormElement = $(formName)!;

  form.on("submit", (e: Event) => {
    e.preventDefault();

    const isValidForm = formCheck(form, formName);

    if (isValidForm && formName === ".form-login") {
      loginController(form);
    }
    if (isValidForm && formName === ".form-signup") {
      signupController(form);
    }
  });
}
