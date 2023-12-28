const URL = 'https://jsonplaceholder.typicode.com/posts';

fetch(URL)
    .then((res) => res.json())
    .then((data) => {
        createTable(data);
    });

function createTable(posts) {
    let table = document.createElement('table');
    table.classList.add('table');

    let nameId = document.createElement('th');
    nameId.classList.add('table-id', 'table-number');
    nameId.innerHTML = "ID";
    nameId.setAttribute('data-type', 'number');
    table.append(nameId);

    function sortTable() {
        const th = document.querySelectorAll("th");
        let tbody = document.querySelector('tbody');
        let rows = Array.from(document.querySelector(".table").rows);

        let columnIndex = nameId.cellIndex;
        let sortDirection =
            nameId.getAttribute("data-sort-direction") === "asc" ? "desc" : "asc";
        nameId.setAttribute("data-sort-direction", sortDirection);

        rows.sort((a, b) => {
            let aValue = a.cells[columnIndex];
            let bValue = b.cells[columnIndex];

            if (sortDirection === "asc") {
                return aValue > bValue ? 1 : -1;
            } else {
                return bValue > aValue ? 1 : -1;
            }
        });

        tbody.remove();
        tbody = document.createElement("tbody");
        rows.forEach((row) => tbody.appendChild(row));
        table.appendChild(tbody);
    }

    nameId.addEventListener('click', sortTable);
    nameId.style.cursor = 'pointer';

    let title = document.createElement('th');
    title.classList.add('table-title');
    title.innerHTML = "Title";
    table.append(title);

    let body = document.createElement('th');
    body.classList.add('table-body');
    body.innerHTML = "Body";
    table.append(body);

    posts.forEach((post) => {
        let row = table.insertRow();

        let cell1 = row.insertCell();
        cell1.classList.add('table-id');

        let cell2 = row.insertCell();
        cell2.classList.add('table-title');

        let cell3 = row.insertCell();
        cell3.classList.add('table-body');

        cell1.innerHTML = `${post.id}`;
        cell2.innerHTML = `${post.title}`;
        cell3.innerHTML = `${post.body}`;

        document.body.appendChild(table);
    });
}

function tableSearch() {
    let phrase = document.getElementById('search-text');
    let table = document.querySelector('.table');
    let regPhrase = new RegExp(phrase.value, 'i');
    let flag = false;
    for (let i = 0; i < table.rows.length; i++) {
        flag = false;
        if (phrase.value.length >= 3)
            for (let j = table.rows[i].cells.length - 1; j >= 0; j--) {
                flag = regPhrase.test(table.rows[i].cells[j].innerHTML);
                if (flag) break;
            }
        if (flag || (!flag && phrase.value.length < 3))
            table.rows[i].style.display = "";
        else
            table.rows[i].style.display = "none";
    }
}
