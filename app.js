"use strict";
const form = document.querySelector("form");
const ul = document.querySelector("ul");
const template = document.querySelector("template");
const users = [];
function updateUI(users) {
    users.forEach((user) => {
        const clone = template.content.cloneNode(true);
        const h4 = clone.querySelector("h4");
        const h5 = clone.querySelector("h5");
        const editBtn = clone.querySelector(".edit");
        const deleteBtn = clone.querySelector(".delete");
        h4.textContent = user.name;
        h5.textContent = user.age.toString();
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
    form.reset();
});
