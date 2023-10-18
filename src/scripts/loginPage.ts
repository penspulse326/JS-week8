import formCheck from "./utils/formCheck";
import { loginController } from "./controllers/formController";

export default function loginPage() {
  const login: HTMLFormElement = document.querySelector(".form-login")!;

  // 監聽登入
  login.addEventListener("submit", (e: Event) => {
    e.preventDefault();

    // 呼叫表單檢查函式
    if (formCheck(login, "login")) {
      loginController(login);
    }
  });
}
