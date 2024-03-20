document.addEventListener("click", (evt) => {
  if (evt.target.dataset.type === "remove") {
    const id = evt.target.dataset.id;

    remove(id).then(() => {
      evt.target.closest("li").remove();
    });
  }

  if (evt.target.dataset.type === "edit") {
    const id = evt.target.dataset.id;

    const closestLi = evt.target.closest("li");
    const noteValue = closestLi.querySelector("span").textContent;

    const newNoteValue = prompt("Введите новое значение", noteValue);

    if (!!newNoteValue) {
      editNote(id, newNoteValue).then(() => {
        closestLi.querySelector("span").textContent = newNoteValue;
      });
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function editNote(id, title) {
  return await fetch(`/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
