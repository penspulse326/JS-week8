import {
  addTodo,
  deleteCompleted,
  deleteSingle,
  showTodo,
  toggleTabs,
  toggleTodo,
} from "./controllers/todoController";
import authCheck from "./utils/authCheck";

export default async function todoPage() {
  // 檢查 token 狀態，過期導回首頁
  const auth = localStorage.getItem("todo")!;
  const checkResult = await authCheck(auth);
  if (!checkResult) {
    alert("您的登入狀態已過期，將導向首頁");
    window.location.href = "../";
  }

  // 解析 query string 判斷 nickname 然後顯示在 nav 上
  const navNickname: HTMLElement = document.querySelector(".nav-nickname")!;
  if (navNickname) {
    const url = new URL(window.location.href);
    const nickname = url.searchParams.get("nickname");

    navNickname.textContent = `${nickname}的代辦`;
  }

  // 顯示 todo 內容
  showTodo("全部");

  // 監聽 todo 互動
  addTodo();
  toggleTodo();
  toggleTabs();
  deleteSingle();
  deleteCompleted();

  // 監聽登出
  const logout: HTMLLinkElement | null = document.querySelector(".btn-logout");
  logout?.addEventListener("click", (e: Event) => {
    e.preventDefault();

    localStorage.clear();
    window.location.href = "/JS-week8";
  });
}
