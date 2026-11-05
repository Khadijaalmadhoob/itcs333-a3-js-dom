(() => {
    const form = document.getElementById("todo-form");
    const input = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");
    const errorMsg = document.getElementById("error-msg");
    const counter = document.getElementById("counter");

    const filterAll = document.getElementById("filter-all");
    const filterActive = document.getElementById("filter-active");
    const filterDone = document.getElementById("filter-done");

    let currentFilter = "all";

    function updateCounter() {
        const activeItems =
            todoList.querySelectorAll("li:not(.completed)").length;

        counter.textContent = `${activeItems} item(s) left`;
    }

    function applyFilter() {
        const items = todoList.querySelectorAll("li");

        items.forEach((item) => {
            const completed = item.classList.contains("completed");

            if (currentFilter === "all") {
                item.style.display = "";
            } else if (currentFilter === "active") {
                item.style.display = completed ? "none" : "";
            } else if (currentFilter === "done") {
                item.style.display = completed ? "" : "none";
            }
        });
    }

    function addItem(text) {
        const li = document.createElement("li");

        const itemText = document.createElement("span");
        itemText.className = "item-text";
        itemText.textContent = text;

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";

        li.appendChild(itemText);
        li.appendChild(deleteButton);

        todoList.appendChild(li);
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const text = input.value.trim();

        if (text === "") {
            errorMsg.classList.remove("hidden");
            return;
        }

        errorMsg.classList.add("hidden");

        addItem(text);

        input.value = "";

        applyFilter();
        updateCounter();
    });

    todoList.addEventListener("click", (event) => {
        const item = event.target.closest("li");

        if (!item) {
            return;
        }

        if (event.target.closest(".delete-btn")) {
            item.remove();
            applyFilter();
            updateCounter();
            return;
        }

        if (event.target.closest(".item-text")) {
            item.classList.toggle("completed");
            applyFilter();
            updateCounter();
        }
    });

    filterAll.addEventListener("click", () => {
        currentFilter = "all";
        applyFilter();
    });

    filterActive.addEventListener("click", () => {
        currentFilter = "active";
        applyFilter();
    });

    filterDone.addEventListener("click", () => {
        currentFilter = "done";
        applyFilter();
    });

    updateCounter();
})();