import listCard from "../components/listCard";
import { $, $all } from "../utils/selector";

const axios = require("axios");
const Swal = require("sweetalert2");

class Todo {
  payload: { headers: { Authorization: string } };
  todoData: TodoItemType[];
  tab: string;

  constructor(auth: string) {
    this.payload = { headers: { Authorization: auth } };
    this.todoData = [];
    this.tab = "all";
  }

  // 請求 todo 資料
  async getTodo() {
    try {
      const response = await axios.get(process.env.API_TODO, this.payload);
      return response;
    } catch (err) {
      throw err;
    }
  }
  // 顯示 todo
  async showTodo(tab: string) {
    try {
      const res: ResType = await this.getTodo();
      this.todoData = res.data.todos;
    } catch (err) {
      Swal.fire("讀取失敗", "發生錯誤，請重新整理或稍後再試。", "error");
    }

    $(".list-todo")!.innerHTML = "";

    // 依照 todoData 有沒有東西顯示列表或圖案
    if (!this.todoData.length) {
      $(".section-todo")!.classList.add("hidden");
      $(".section-empty")!.classList.remove("hidden");
      return;
    }
    this.todoData.forEach(
      (item) => ($(".list-todo")!.innerHTML += listCard(item, tab))
    );

    $(".section-todo")!.classList.remove("hidden");
    $(".section-empty")!.classList.add("hidden");

    // 顯示待完成項目
    const todoTotal = this.todoData.filter(
      (item: TodoItemType) => item.completed_at === null
    ).length;
    $(".todo-nums")!.textContent = `${todoTotal} 個待完成項目`;
  }
  // 請求新增 todo
  async sendAddRequest(data: AddItemType) {
    try {
      const response = await axios.post(
        process.env.API_TODO,
        data,
        this.payload
      );
      return response;
    } catch (err) {
      throw err;
    }
  }
  // 新增 todo
  addTodo() {
    $(".btn-add")!.on("click", async () => {
      const input: HTMLInputElement = $(".input-add")!;
      const isInputValid = input.value;

      if (!isInputValid) {
        Swal.fire("新增失敗", "代辦內容不能為空", "error");
        return;
      }

      const data: AddItemType = {
        todo: {
          content: input.value,
        },
      };

      input.value = ""; // 存完資料記得清空 input

      try {
        await this.sendAddRequest(data);
        this.showTodo("全部");
      } catch (err) {
        Swal.fire("新增失敗", "發生錯誤，請稍後再試", "error");
      }
    });
  }
  // 請求更改 todo 項目狀態
  async sendToggleRequest(id: string) {
    try {
      const response = await axios.patch(
        `${process.env.API_TODO}/${id}/toggle`,
        {},
        this.payload
      );
      return response;
    } catch (err) {
      throw err;
    }
  }
  // 更改 todo 項目狀態
  toggleTodo() {
    $(".list-todo")!.on("change", async (e: Event) => {
      const isInputElement = e.target instanceof HTMLInputElement;

      if (isInputElement && e.target.type === "checkbox") {
        const id = e.target!.parentElement!.parentElement!.getAttribute("id")!;

        try {
          await this.sendToggleRequest(id);
          this.showTodo(this.tab);
        } catch (err) {
          Swal.fire("更改失敗", "發生錯誤，請稍後再試！", "error");
        }
      }
    });
  }
  // 更改 todo 分類頁籤狀態
  toggleTabs() {
    $(".tabs-todo")!.on("click", (e: Event) => {
      const isTab = e.target instanceof HTMLLIElement;

      $all(".tabs-todo li")!.forEach((item) => {
        if (isTab && item.textContent === e.target.textContent) {
          this.tab = e.target.getAttribute("tab")!;
          this.showTodo(this.tab); // 根據 tab 標籤顯示 todo

          item.classList.remove("btn-todoTab-inactive");
          item.classList.add("btn-todoTab-active");
        } else {
          item.classList.remove("btn-todoTab-active");
          item.classList.add("btn-todoTab-inactive");
        }
      });
    });
  }
  // 請求 todo 刪除
  async sendDeleteRequest(id: string) {
    try {
      const response = await axios.delete(
        `${process.env.API_TODO}/${id}`,
        this.payload
      );
      return response;
    } catch (err) {
      throw err;
    }
  }
  // 刪除單個 todo
  deleteTodo() {
    $(".list-todo")!.on("click", async (e: Event) => {
      const isDeleteBtn =
        e.target instanceof HTMLElement &&
        e.target.classList.contains("btn-close");

      if (isDeleteBtn) {
        const id = e.target.parentElement!.id;

        try {
          await this.sendDeleteRequest(id);
          this.showTodo(this.tab);
        } catch (err) {
          Swal.fire("刪除失敗", "發生錯誤，請稍後再試！", "error");
        }
      }
    });
  }
  // 刪除已完成項目
  clearDone() {
    let isHandling = false; // 是否還在處理請求
    let counter = 0; // 請求的完成次數
    $(".btn-clear")!.on("click", (e: Event) => {
      e.preventDefault();

      if (isHandling) return;

      const targets: TodoItemType[] = this.todoData.filter(
        (item) => item.completed_at // 非 null 就是已完成
      );

      targets.forEach(async (item) => {
        isHandling = true;
        try {
          await this.sendDeleteRequest(item.id);
          this.showTodo(this.tab);
          counter++;
        } catch (err) {
          Swal.fire("刪除失敗", "發生錯誤，請稍後再試！", "error");
          return; // 如果有錯誤就跳過後續操作
        }
      });
    });
  }
}

// 型別定義
type AddItemType = {
  todo: {
    content: string;
  };
};

type TodoItemType = {
  id: string;
  content: string;
  completed_at: string | null;
};

type ResType = {
  data: {
    todos: TodoItemType[];
  };
};

export default Todo;
