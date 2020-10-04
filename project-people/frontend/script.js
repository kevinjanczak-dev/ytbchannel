const tableEl = document.querySelector('.table')
const tbodyEl = tableEl.querySelector('tbody')
const theadEl = tableEl.querySelector('thead')
const btnOpenModalEl = document.querySelector('.open-modal')

btnOpenModalEl.addEventListener('click', ev => {
    document.querySelector('.backdrop').classList.add('active')
})

const columns = ['#', 'Nome', 'Email', 'CPF', 'Ações']

const templateColumns = columns.map(column => (
    `
        <th>${column}</th>
    `
))

theadEl.rows.item(0).innerHTML = templateColumns.join('')

let rows = [
    { name: 'Kevin', email: 'kevingood120@gmail.com', cpf: '99999999999'  }
]
let selectedIndex = null

function renderRows() {
    tbodyEl.innerHTML = ''
    let templateRows = ''
    if(rows.length === 0) {
        templateRows = `
            <tr>
                <td style="text-align: center" colspan="${columns.length}">Sem linhas para serem exibibas</td>
            </tr
        `
        console.log('ok')
        tbodyEl.innerHTML = templateRows
    }
    else {
        templateRows = rows.map((row, index) => (
            `
                <tr data-id="${index}">
                    <td>${index + 1}</td>
                    <td>${row.name}</td>
                    <td>${row.email}</td>
                    <td>${row.cpf}</td>
                    <td class="actions">
                        <a href="javascript:void(0)" class="delete">
                            <i class="fas fa-trash"></i>
                        </a>
                        <a href="javascript:void(0)" class="edit">
                            <i class="fas fa-pen"></i>
                        </a>
                    </td>
                </tr>
            `
        ))

        tbodyEl.innerHTML = templateRows.join('')

        tbodyEl.querySelectorAll('tr').forEach(tr => {
            const linkDeleteEl = tr.querySelector('.delete')
            const linkEditEl = tr.querySelector('.edit')
            const id = Number.parseInt(tr.dataset.id)
            linkDeleteEl.addEventListener('click', ev => {
                
                rows.splice(id,1)
                renderRows(rows)
            })

            linkEditEl.addEventListener('click', ev => {
                const people = rows[id]
                selectedIndex = id;
                const formPeopleEl = document.querySelector('#form-people')
                formPeopleEl.name.value = people.name
                formPeopleEl.email.value = people.email
                formPeopleEl.cpf.value = people.cpf
                document.querySelector('.backdrop').classList.add('active')
            })

        })
    }
}



renderRows()

