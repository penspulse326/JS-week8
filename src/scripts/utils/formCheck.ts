const validate = require("validate.js");

// 表單檢查 傳入 form 元素和 checkRule 字串
export default function formCheck(
  form: HTMLFormElement,
  checkRule: string
): boolean {
  // 依照 checkRule 篩選要用哪個規則
  const validationResult = validate(form, rules[checkRule]);

  // 先清空所有警告訊息
  document.querySelectorAll(".input-alert").forEach((item) => {
    item.textContent = "";
  });

  // validate 只回傳"有誤的"欄位，undefined 表示所有欄位無誤，驗證通過
  if (validationResult === undefined) {
    return true;
  } else {
    // 抽取 validate 回傳的欄位，注意 item 如果在參數列解構成 [key, value] 會沒辦法寫型別或斷言
    Object.entries(validationResult).forEach((item) => {
      const [key, value] = item as [string, string[]];
      const input = form.querySelector(`[name="${key}"]`) as HTMLInputElement;
      const alertElement = input.nextElementSibling!; // 警告文字在 input 的旁邊

      alertElement.textContent = value[0];
    });

    return false;
  }
}

// rules 包含 signup 規則與 login 規則
const rules: { [key: string]: any } = {
  // signup 規則
  signup: {
    email: {
      presence: { message: "^此欄位不可為空" },
      email: {
        message: "格式錯誤",
      },
    },
    nickname: {
      presence: { message: "^欄位不可為空" },
    },
    password: {
      presence: { message: "^此欄位不可為空" },
      length: {
        minimum: 6,
        message: "^密碼需至少 6 個字",
      },
    },
    passwordCheck: {
      presence: { message: "^此欄位不可為空" },
      equality: {
        attribute: "password",
        message: "^密碼不一致",
      },
    },
  },

  // login 規則
  login: {
    email: {
      presence: { message: "^此欄位不可為空" },
      email: {
        message: "格式錯誤",
      },
    },
    password: {
      presence: { message: "^此欄位不可為空" },
      length: {
        minimum: 6,
        message: "^密碼需至少 6 個字",
      },
    },
  },
};
