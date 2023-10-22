export default (item: TodoItemType, tab: string) => {
  const { id, completed_at, content } = item;
  const undone = tab === "undone" && completed_at;
  const done = tab === "done" && !completed_at;

  const isHidden = undone || done;
  const checkboxStatus = !completed_at ? "" : "checked";

  return `
    <li class="card-todo ${isHidden && "hidden"}" id=${id}>
      <label class="flex items-center cursor-pointer">
        <input class="input-check hidden" type="checkbox" ${checkboxStatus}/>
        <div class="input-check-box"></div>
        <img class="hidden" src="../src/images/check.svg" alt="" />
        <span class="ml-4">${content}</span>
      </label>
      <img
        class="btn-close hidden cursor-pointer"
        src="../src/images/close.svg"
        alt="delete this todo item"
      />
    </li>`;
};

type TodoItemType = {
  id: string;
  content: string;
  completed_at: string | null;
};
