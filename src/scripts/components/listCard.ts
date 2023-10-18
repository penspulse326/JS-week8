export default function listCard(item: any) {
  return `<li class="card-todo" id=${item.id}>
              <label class="flex items-center cursor-pointer">
                <input class="input-check hidden" type="checkbox" ${
                  item.completed_at && "checked"
                }/>
                <div class="input-check-box"></div>
                <img class="hidden" src="../src/images/check.svg" alt="" />
                <span class="ml-4">${item.content}</span>
              </label>
              <img
                class="btn-close hidden cursor-pointer"
                src="../src/images/close.svg"
                alt=""
              />
            </li>`;
}
