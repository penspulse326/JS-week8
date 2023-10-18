import listCard from "../components/listCard";

const axios = require("axios");
const url = "https://todoo.5xcamp.us/todos/";
const auth = localStorage.getItem("todo");
const list = document.querySelector(".list-todo")!;
let tab = "全部";
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
        showTodo(tab);
      })
      .catch((err: any) => {
        console.clear(); // 清除 axios 的報錯 防止 API 網址暴露
        console.log(err);
      });
  });
}

// 顯示 todo
export async function showTodo(tab: string) {
  const todoSection = document.querySelector(".section-todo")!; // todo 列表
  const emptySection = document.querySelector(".section-empty")!; // 圖案
  await getTodo();

  // 依照 todo 有沒有東西顯示區塊
  if (todoData.length) {
    list.innerHTML = "";
    todoData.forEach((item: any) => (list.innerHTML += listCard(item, tab)));

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

// 更改 todo 項目狀態
export function toggleTodo() {
  // 捕捉 checkbox 冒泡
  list.addEventListener("change", (e: Event) => {
    const target = e.target as HTMLInputElement;

    // 確定是 checkbox 才執行
    if (target.type === "checkbox") {
      const id = target.parentElement?.parentElement?.getAttribute("id");

      axios
        .patch(
          url + id + "/toggle",
          {}, // 這裡要加空物件不然 patch 結果不正確
          {
            headers: { Authorization: auth },
          }
        )
        .then(() => showTodo(tab))
        .catch(() => {
          console.clear();
          alert("變更狀態時發生錯誤，請稍後再試！");
        });
    }
  });
}

// 刪除單個 todo
export function deleteSingle() {
  // 監聽整個 list 捕捉冒泡
  list.addEventListener("click", (e: Event) => {
    // 確定使用者按到 X 才執行
    const target = e.target as HTMLElement;
    if (target.classList.contains("btn-close")) {
      const id = target.parentElement!.id;

      deleteTodo(id);
    }
  });
}

// 刪除已完成項目
export function deleteCompleted() {
  const deleteBtn = document.querySelector(".btn-delete")!;
  let isHandlingDelete = false; // 判斷是否還在處理刪除請求
  let handlingChecker = 0; // 計算刪除請求的完成次數

  // 監聽刪除按鈕
  deleteBtn.addEventListener("click", (e: Event) => {
    e.preventDefault();

    if (isHandlingDelete) return;

    // completed_at 如果不是 null 表示已完成，是要被刪除的項目
    const targetList = todoData.filter(
      (item: any) => item.completed_at !== null
    );

    // 因為 deleteTodo 為非同步函式，所以用 then 來確認已完成請求並 ++handlingChecker 計數
    // 當 handlingChecker 與 targetList.length 表示所有的刪除請求都已完成
    targetList.forEach((item: any) => {
      isHandlingDelete = true; // 改變狀態

      deleteTodo(item.id).then(() => ++handlingChecker);

      if (handlingChecker === targetList.length) {
        handlingChecker = 0;
        isHandlingDelete = false;
      }
    });
  });
}

// 更改 todo 分類頁籤狀態
export function toggleTabs() {
  const tabs = document.querySelector(".tabs-todo")!;

  // 監聽 tabs 點擊
  tabs.addEventListener("click", (e: Event) => {
    const target = e.target as HTMLElement;

    tabs.querySelectorAll("li").forEach((item) => {
      if (item.textContent === target.textContent) {
        tab = target.textContent!;
        showTodo(tab); // 根據 tab 標籤顯示 todo

        // 更改樣式
        item.classList.remove("btn-todoTab-inactive");
        item.classList.add("btn-todoTab-active");
      } else {
        // 更改樣式
        item.classList.remove("btn-todoTab-active");
        item.classList.add("btn-todoTab-inactive");
      }
    });
  });
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

// 請求 todo 刪除
async function deleteTodo(id: string) {
  return await axios
    .delete(url + id, {
      headers: { Authorization: auth },
    })
    .then(() => showTodo(tab))
    .catch(() => {
      console.clear();
      alert("刪除時發生錯誤，請稍後再試！");
    });
}
