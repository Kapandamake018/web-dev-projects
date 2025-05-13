const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value.trim() === '') {
        alert("You gotta write something!");
        return;
    }

    let li = document.createElement("li");
    li.textContent = inputBox.value.trim();
    appendDeleteButton(li);
    listContainer.appendChild(li);
    inputBox.value = "";
    saveData();
}

function appendDeleteButton(li) {
    let span = document.createElement("span");
    span.innerHTML = "\u00d7"; // "×" character for delete
    span.classList.add("delete-btn");
    li.appendChild(span);

    span.addEventListener('click', function() {
        li.remove();
        saveData();
    });
}

listContainer.addEventListener("dblclick", function(e) {
    if (e.target.tagName === "LI") {
        const editInput = document.createElement('input');
        editInput.value = e.target.firstChild.textContent;
        e.target.innerHTML = '';
        e.target.appendChild(editInput);
        editInput.focus();

        editInput.addEventListener('blur', function() {
            if (editInput.value.trim() !== '') {
                e.target.innerHTML = editInput.value.trim();
                appendDeleteButton(e.target);
                saveData();
            } else {
                e.target.innerHTML = 'Item cannot be empty!';
                setTimeout(() => {
                    e.target.innerHTML = '';
                    appendDeleteButton(e.target);
                }, 1000);
            }
        });

        editInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                if (editInput.value.trim() !== '') {
                    e.target.innerHTML = editInput.value.trim();
                    appendDeleteButton(e.target);
                    saveData();
                }
            }
        });
    }
});

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    const items = listContainer.getElementsByTagName("li");
    for (let item of items) {
        appendDeleteButton(item);
    }
}

// Delete All Functionality
document.getElementById("deleteAllBtn").addEventListener("click", function() {
    listContainer.innerHTML = ''; // Clear all items
    saveData(); // Save the empty list to local storage
});

showTask();
