import formCheck from "./utils/formCheck";
import { signupController } from "./controllers/formController";

export default function signupPage() {
  const signup: HTMLFormElement = document.querySelector(".form-signup")!;

  // 監聽註冊
  signup.addEventListener("submit", (e: Event) => {
    e.preventDefault();

    // 呼叫表單檢查函式
    if (formCheck(signup, "signup")) {
      signupController(signup);
    }
  });
}
