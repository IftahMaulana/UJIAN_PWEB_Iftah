var selectedRow = null;

// Show Alerts
function showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector("main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// Clear All Fields
function clearFields() {
    document.querySelector("#firstName").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#rollNo").value = "";
}

// Save Data to Local Storage
function saveDataToLocalStorage(firstName, lastName, rollNo) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.push({ firstName, lastName, rollNo });
    localStorage.setItem("students", JSON.stringify(students));
}

// Load Data from Local Storage
function loadDataFromLocalStorage() {
    let students = JSON.parse(localStorage.getItem("students")) || [];

    const list = document.querySelector("#student-list");
    list.innerHTML = "";

    students.forEach((student) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.rollNo}</td>
            <td>
                <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            `;
        list.appendChild(row);
    });
}

// Add Data
document.addEventListener("DOMContentLoaded", () => {
    loadDataFromLocalStorage();
});

document.querySelector("#student-form").addEventListener("submit", (e) => {
    e.preventDefault();

    // Get Form Values
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const rollNo = document.querySelector("#rollNo").value;

    // Validate
    if (firstName == "" || lastName == "" || rollNo == "") {
        showAlert("Please fill in all fields", "danger");
    } else {
        if (selectedRow == null) {
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${rollNo}</td>
                <td>
                    <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                    <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
                `;
            list.appendChild(row);
            showAlert("Student Added", "success");

            // Save to Local Storage
            saveDataToLocalStorage(firstName, lastName, rollNo);
        } else {
            selectedRow.children[0].textContent = firstName;
            selectedRow.children[1].textContent = lastName;
            selectedRow.children[2].textContent = rollNo;
            showAlert("Student Info Edited", "info");

            // Update Local Storage
            updateLocalStorage(selectedRow.rowIndex - 1, firstName, lastName, rollNo);
        }

        clearFields();
    }
});

// Update Local Storage
function updateLocalStorage(index, firstName, lastName, rollNo) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students[index] = { firstName, lastName, rollNo };
    localStorage.setItem("students", JSON.stringify(students));
}

// Delete Data
document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("delete")) {
        const rowIndex = target.parentElement.parentElement.rowIndex - 1;
        target.parentElement.parentElement.remove();
        showAlert("Student Data Deleted", "danger");

        // Remove from Local Storage
        removeFromLocalStorage(rowIndex);
    }
});

// Edit Data
document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("edit")) {
        // Find the selected row
        selectedRow = target.parentElement.parentElement;

        // Populate form fields with selected row data
        document.querySelector("#firstName").value = selectedRow.children[0].textContent;
        document.querySelector("#lastName").value = selectedRow.children[1].textContent;
        document.querySelector("#rollNo").value = selectedRow.children[2].textContent;
    } else if (target.classList.contains("delete")) {
        // ... (previous code)
    }
});

// Remove from Local Storage
function removeFromLocalStorage(index) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
}
