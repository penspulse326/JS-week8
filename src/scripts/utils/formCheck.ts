import { $, $all } from "./selector";

const validate = require("validate.js");

// 處理表單檢查 回傳 boolean 表示檢查結果
export default function formCheck(
  form: HTMLFormElement,
  formName: string
): boolean {
  let validationResult: ValidateType = {};

  if (formName === ".form-login") {
    validationResult = validate(form, loginRule);
  }
  if (formName === ".form-signup") {
    validationResult = validate(form, signupRule);
  }

  $all(".input-alert").forEach((item) => (item.textContent = "")); // 清空警告訊息

  // 判斷 validate，若欄位有誤則抽取出來後在 DOM 顯示警告文字
  if (!validationResult) return true; // validate 的"真值"表示欄位"有誤"，"假值"為驗證通過

  Object.entries(validationResult).forEach((item) => {
    const [key, value] = item;
    const input = $(`[name="${key}"]`, form); // 用 name 去選取指定的 input
    const alertElement = input.nextElementSibling!;

    alertElement.textContent = value[0];
  });

  return false;
}

// 型別定義
// 表單驗證結果
type ItemsType = Record<string, string[]>;
type ValidateType = undefined | ItemsType;

// 驗證規則
type MessageType = { message: string };
type LengthType = { minimum: number; message: string };
type EqualityType = { attribute: string; message: string };

type LoginRuleType = {
  email: {
    presence: MessageType;
    email: MessageType;
  };
  password: {
    presence: MessageType;
    length: LengthType;
  };
};

type SignupRuleType = {
  email: {
    presence: MessageType;
    email: MessageType;
  };
  nickname: {
    presence: MessageType;
  };
  password: {
    presence: MessageType;
    length: LengthType;
  };
  passwordCheck: {
    presence: MessageType;
    equality: EqualityType;
  };
};

const signupRule: SignupRuleType = {
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
};

const loginRule: LoginRuleType = {
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
};
