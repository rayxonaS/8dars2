"use strict";
const form = document.querySelector("form");
const ul = document.querySelector("ul");
const template = document.querySelector("template");
const users = [];
let editIndex = null;
function updateUI(users) {
    ul.innerHTML = "";
    users.forEach((user) => {
        const clone = template.content.cloneNode(true);
        const h4 = clone.querySelector("h4");
        const h5 = clone.querySelector("h5");
        const editBtn = clone.querySelector(".edit");
        const deleteBtn = clone.querySelector(".delete");
        h4.textContent = user.name;
        h5.textContent = user.age.toString();
        deleteBtn.addEventListener("click", () => {
            var _a, _b, _c, _d, _e, _f;
            const item = deleteBtn.closest("li");
            if (!item)
                return;
            // Найдём имя и возраст в этом элементе
            const nameText = (_c = (_b = (_a = item.querySelector("h4")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.replace("Name: ", "")) !== null && _c !== void 0 ? _c : "";
            const ageText = (_f = (_e = (_d = item.querySelector("h5")) === null || _d === void 0 ? void 0 : _d.textContent) === null || _e === void 0 ? void 0 : _e.replace("Age: ", "")) !== null && _f !== void 0 ? _f : "";
            const age = parseInt(ageText, 10);
            // Найдём пользователя в массиве по name и age
            const index = users.findIndex((u) => u.name === nameText && u.age === age);
            if (index > -1) {
                users.splice(index, 1);
                updateUI(users);
            }
        });
        editBtn.addEventListener("click", () => {
            const nameInput = form.elements.namedItem("name");
            const ageInput = form.elements.namedItem("age");
            nameInput.value = user.name;
            ageInput.value = user.age.toString();
            editIndex = index; // запоминаем индекс редактируемого пользователя
        });
        ul.appendChild(clone);
    });
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.elements.namedItem("name");
    const age = form.elements.namedItem("age");
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
    const parsed = JSON.parse(saved);
    users.push(...parsed);
    updateUI(users);
}
