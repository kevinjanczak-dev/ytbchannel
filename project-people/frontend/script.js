const tableEl = document.querySelector('.table')
const tbodyEl = tableEl.querySelector('tbody')
const theadEl = tableEl.querySelector('thead')
const btnOpenModalEl = document.querySelector('.open-modal')
const paginationEl = document.querySelector('.pagination')
const limitDataEl = document.querySelector('.limit-data')

btnOpenModalEl.addEventListener('click', ev => {
    document.querySelector('.backdrop').classList.add('active')
})

const api = axios.create({
    baseURL: 'http://localhost:8500/people'
})

const columns = ['#', 'Nome', 'Email', 'CPF', 'Ações']

const templateColumns = columns.map(column => (
    `
        <th>${column}</th>
    `
))

theadEl.rows.item(0).innerHTML = templateColumns.join('')

let selectedId = null



async function renderRows(page = 1) {
    tbodyEl.innerHTML = ''

    const limit = +limitDataEl.options[limitDataEl.selectedIndex].value

    const { data, headers } = await api.get(`/pagination?page=${page}&limit=${limit}`)

    const totalPages = +headers['x-total']
    console.log(headers['x-total'])

    const btnFirstEl = paginationEl.querySelector('.first')
    const btnBackEl = paginationEl.querySelector('.back')
    const btnNextEl = paginationEl.querySelector('.next')
    const btnLastEl = paginationEl.querySelector('.last')
    const pageStateEl = paginationEl.querySelector('.page-state')

    btnFirstEl.disabled = page === 1
    btnBackEl.disabled = page === 1
    btnNextEl.disabled = page === totalPages
    btnLastEl.disabled = page === totalPages

    btnFirstEl.onclick = () => {
        renderRows(1, limit)
    }

    btnBackEl.onclick = () => {
        renderRows(page - 1, limit)
    }

    btnNextEl.onclick = () => {
        renderRows(page + 1, limit)
    }
    
    btnLastEl.onclick = () => {
        renderRows(totalPages, limit)
    }

    pageStateEl.innerHTML = `Página ${page} de ${totalPages}`

    let templateRows = ''
    if(data.length === 0) {
        templateRows = `
            <tr>
                <td style="text-align: center" colspan="${columns.length}">Sem linhas para serem exibibas</td>
            </tr
        `
        tbodyEl.innerHTML = templateRows
    }
    else {
        templateRows = data.map(row => (
            `
                <tr data-id="${row.id}">
                    <td>${row.id}</td>
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
            linkDeleteEl.addEventListener('click', async ev => {
                await api.delete(`/${id}`)
                renderRows()
            })

            linkEditEl.addEventListener('click', ev => {
                selectedId = id;
                const formPeopleEl = document.querySelector('#form-people')
                formPeopleEl.name.value = tr.cells.item(1).innerText
                formPeopleEl.email.value = tr.cells.item(2).innerText
                formPeopleEl.cpf.value = tr.cells.item(3).innerText
                document.querySelector('.backdrop').classList.add('active')
            })

        })
    }
}

limitDataEl.onchange = async ev => {
    await renderRows(1)
}

renderRows()

