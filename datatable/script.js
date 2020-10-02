const datatable = document.querySelector('.datatable')
const tbody = datatable.querySelector('tbody')
const thead = datatable.querySelector('thead')

const columns = ['#', 'Name', 'Email']
const rows = [
    { id: 1, name: 'Kevin', email: 'kevingoodd120@gmail.com' },
    { id: 2, name: 'Guilherme', email: 'guilherme@gmail.com' },
    { id: 3, name: 'Eduarda', email: 'eduarda@gmail.com' }
]

const templateColumn = columns.map(column => (
    `<th>${column}</th>`
))

thead.rows.item(0).innerHTML = templateColumn.join('')

const templateRows = rows.map(row => (
    `
        <tr>
            <td>${row.id}</td>
            <td>${row.name}</td>
            <td>${row.email}</td>
        </tr>
    `
))

tbody.innerHTML = templateRows.join('')

