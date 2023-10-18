import listCard from "../components/listCard";

const axios = require("axios");
const url = "https://todoo.5xcamp.us/todos/";
const auth = localStorage.getItem("todo");
const list = document.querySelector(".list-todo")!;
let todoData: any = null; // 存請求回傳的 todo

// 監聽 HTML Element 行為放這裡
// 新增 todo
export function addTodo() {
  const addBtn = document.querySelector(".btn-add")!;
  const input: HTMLInputElement = document.querySelector(".input-add")!;

  // 監聽 add 按鈕
  addBtn.addEventListener("click", () => {
    if (!input || !input.value) {
      alert("代辦內容不能為空");
      return;
    }

    // 要打給 API 的資料
    const data = {
      todo: {
        content: input.value,
      },
    };

    input.value = ""; // 存完資料記得清空 input

    axios
      .post(url, data, {
        headers: { Authorization: auth },
      })
      .then(() => {
        showTodo();
      })
      .catch((err: any) => {
        console.clear(); // 清除 axios 的報錯 防止 API 網址暴露
        console.log(err);
      });
  });
}

// 顯示 todo
export async function showTodo() {
  const todoSection = document.querySelector(".section-todo")!; // todo 列表
  const emptySection = document.querySelector(".section-empty")!; // 圖案
  await getTodo();

  // 依照 todo 有沒有東西顯示區塊
  if (todoData.length) {
    list.innerHTML = "";
    todoData.forEach((item: any) => (list.innerHTML += listCard(item)));

    // 有待辦項目就隱藏圖案
    todoSection.classList.remove("hidden");
    emptySection.classList.add("hidden");
  } else {
    // 沒有待辦項目就顯示圖案
    todoSection.classList.add("hidden");
    emptySection.classList.remove("hidden");
  }

  // 顯示待完成項目
  const todoNums = document.querySelector(".todo-nums")!;
  const todoTotal = todoData.filter(
    (item: any) => item.completed_at === null
  ).length;
  todoNums.textContent = `${todoTotal} 個待完成項目`;
}

// 請求行為的放這裡
// 請求 todo 資料
export async function getTodo() {
  return await axios
    .get(url, {
      headers: { Authorization: auth },
    })
    .then((res: any) => {
      todoData = res.data.todos;
      return todoData;
    })
    .catch((err: any) => {
      console.clear(); // 清除 axios 的報錯 防止 API 網址暴露
      console.error(err.message);
      alert("讀取資料時發生錯誤，請重新整理或稍後再試。");
    });
}
