const form = document.querySelector("form")!;
const ul = document.querySelector("ul")!;

const template = document.querySelector("template")!;

type User = {
  name: string;
  age: number;
};

const users: User[] = [];

function updateUI(users: User[]) {
  users.forEach((user) => {
    const clone = template.content.cloneNode(true) as HTMLTemplateElement;

    const h4 = clone.querySelector("h4") as HTMLHeadElement;
    const h5 = clone.querySelector("h5") as HTMLHeadElement;
    const editBtn = clone.querySelector(".edit") as HTMLButtonElement;
    const deleteBtn = clone.querySelector(".delete") as HTMLButtonElement;

    h4.textContent = user.name;
    h5.textContent = user.age.toString();

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
  form.reset();
});
