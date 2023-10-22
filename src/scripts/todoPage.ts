import Todo from "./controllers/todoController";
import authCheck from "./utils/authCheck";
import navigate from "./utils/navigate";
import { $ } from "./utils/selector";
import { clearStorage, getStorageItem } from "./utils/storageAPI";

export default async function todoPage() {
  // 檢查 token 狀態，過期導回首頁
  const token = getStorageItem("todoToken");
  const isValidToken = await authCheck(token);
  if (!isValidToken) navigate("../");

  // 顯示 nickname
  const nickname = getStorageItem("nickname");
  const navNickname: HTMLElement = $(".nav-nickname")!;
  navNickname.textContent = `${nickname}的代辦`;

  // 監聽 todo 互動
  const todo = new Todo(token);
  todo.showTodo("全部");
  todo.addTodo();
  todo.toggleTodo();
  todo.toggleTabs();
  todo.deleteTodo();
  todo.clearDone();

  // 監聽登出
  $(".btn-logout")!.on("click", (e: Event) => {
    e.preventDefault();

    clearStorage();
    navigate("../");
  });
}
