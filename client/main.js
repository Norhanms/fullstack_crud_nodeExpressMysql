
document.addEventListener('DOMContentLoaded', () => {
    console.log("content loaded");
    fetch('http://127.0.0.1:5000/getAll')
        .then(response => response.json())
        .then(data => loadTable(data['data']));

})
const addBtn = document.querySelector('#add-name-btn');
addBtn.addEventListener('click', () => {
    const nameInput = document.querySelector('#name-input');
    const name = nameInput.value;
    nameInput.value = '';
    fetch('http://127.0.0.1:5000/insert', {
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ name: name })
    }).then(response => response.json()).then(data => insertDataToTable(data['data']));
})

function insertDataToTable(data) {

}

function loadTable(data) {
    const tableBody = document.querySelector('table tbody');
    let tableHtml = "";
    if (data.length === 0) {
        tableBody.innerHTML = "<tr> <td class='nodata' colspan='5'>No Data</td></tr>";
        return;
    }

    data.forEach(({ id, name, date }) => {
        tableHtml += "<tr>";
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${name}</td>`;
        tableHtml += `<td>${date}</td>`;
        tableHtml += `<td><button class="delete-row-btn" 
        date-id=${id} >delete</button></td>`;
        tableHtml += `<td><button class="edit-row-btn" 
        date-id=${id} >Edit</button></td>`;
        tableHtml += "</tr>";

    });
    tableBody.innerHTML = tableHtml;
}