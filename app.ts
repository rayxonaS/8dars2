const form = document.querySelector("form")!;
const ul = document.querySelector("ul")!;

const template = document.querySelector("template")!;

type User = {
  name: string;
  age: number;
};

const users: User[] = [];

let editIndex: number | null = null;

function updateUI(users: User[]) {
  ul.innerHTML = "";
  users.forEach((user) => {
    const clone = template.content.cloneNode(true) as HTMLTemplateElement;

    const h4 = clone.querySelector("h4") as HTMLHeadElement;
    const h5 = clone.querySelector("h5") as HTMLHeadElement;
    const editBtn = clone.querySelector(".edit") as HTMLButtonElement;
    const deleteBtn = clone.querySelector(".delete") as HTMLButtonElement;

    h4.textContent = user.name;
    h5.textContent = user.age.toString();

    deleteBtn.addEventListener("click", () => {
      const item = deleteBtn.closest("li");
      if (!item) return;

      // Найдём имя и возраст в этом элементе
      const nameText =
        item.querySelector("h4")?.textContent?.replace("Name: ", "") ?? "";
      const ageText =
        item.querySelector("h5")?.textContent?.replace("Age: ", "") ?? "";
      const age = parseInt(ageText, 10);

      // Найдём пользователя в массиве по name и age
      const index = users.findIndex(
        (u) => u.name === nameText && u.age === age
      );
      if (index > -1) {
        users.splice(index, 1);
        updateUI(users);
      }
    });

    editBtn.addEventListener("click", () => {
      const nameInput = form.elements.namedItem("name") as HTMLInputElement;
      const ageInput = form.elements.namedItem("age") as HTMLInputElement;

      nameInput.value = user.name;
      ageInput.value = user.age.toString();

      editIndex = index; // запоминаем индекс редактируемого пользователя
    });

    ul.appendChild(clone);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = form.elements.namedItem("name") as HTMLInputElement;
  const age = form.elements.namedItem("age") as HTMLInputElement;

  if (!name.value.trim() && !age.value.trim()) {
    return;
  }

  users.push({ name: name.value, age: +age.value });
  updateUI(users);
  localStorage.setItem("users", JSON.stringify(users));
  form.reset();
});

const saved = localStorage.getItem("users");
if (saved) {
  const parsed = JSON.parse(saved) as User[];
  users.push(...parsed);
  updateUI(users);
}
