document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('crud-form');
    const nameInput = document.getElementById('name');
    const ageInput = document.getElementById('age');
    const tableBody = document.getElementById('crud-table-body');

    let items = JSON.parse(localStorage.getItem('crudItems')) || [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addItem();
    });

    function addItem() {
        const name = nameInput.value.trim();
        const age = ageInput.value.trim();

        if (name && age) {
            const item = { id: Date.now(), name, age };
            items.push(item);
            saveToLocalStorage();
            renderTable();
            nameInput.value = '';
            ageInput.value = '';
        }
    }

    function deleteItem(id) {
        items = items.filter(item => item.id !== id);
        saveToLocalStorage();
        renderTable();
    }

    function updateItem(id) {
        const item = items.find(item => item.id === id);
        nameInput.value = item.name;
        ageInput.value = item.age;
        deleteItem(id);
    }

    function saveToLocalStorage() {
        localStorage.setItem('crudItems', JSON.stringify(items));
    }

    function renderTable() {
        tableBody.innerHTML = '';
        items.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.age}</td>
                <td class="actions">
                    <button onclick="updateItem(${item.id})">Edit</button>
                    <button onclick="deleteItem(${item.id})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Expose functions to global scope
    window.updateItem = updateItem;
    window.deleteItem = deleteItem;

    // Initial render
    renderTable();
});