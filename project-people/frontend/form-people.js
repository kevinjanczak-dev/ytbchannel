const backdropEl = document.querySelector('.backdrop')
const formPeopleEl = backdropEl.querySelector('#form-people')
const btnCloseModalEl = backdropEl.querySelector('.close-modal')


function clearErrors() {
    const listErrorsEl = formPeopleEl.querySelector('.list-errors')
    if(listErrorsEl) listErrorsEl.remove()
}

function addErrors(errors) {
    if(errors.length > 0) {
        const templateErrors = errors.map(error => (
            `<li>${error}</li>`
        ))

        const listErrorsEl = document.createElement('ul')
        listErrorsEl.classList.add('list-errors')

        listErrorsEl.innerHTML = templateErrors.join('')

        formPeopleEl.appendChild(listErrorsEl)
    }

}

function closeModal() {
    backdropEl.classList.remove('active')
    formPeopleEl.name.value = ''
    formPeopleEl.email.value = ''
    formPeopleEl.cpf.value = ''
    selectedId = null;
    clearErrors();
}

btnCloseModalEl.addEventListener('click', ev => {
    closeModal()
})

formPeopleEl.addEventListener('submit', async ev => {
    ev.preventDefault()

    let errors = []
    clearErrors()
    const people = {
        id: selectedId,
        name: formPeopleEl.name.value,
        cpf: formPeopleEl.cpf.value,
        email: formPeopleEl.email.value
    }
    if(Number.isInteger(selectedId)){
        const response = await api.put(`/${selectedId}`, people, { validateStatus: false })
        errors = response.data
    }
    else {
        const response = await api.post('', people, { validateStatus: false })
        errors = response.data
    }
    if(Array.isArray(errors)) {
        addErrors(errors)
    }
    else {
        renderRows()
        closeModal()
    }

})


formPeopleEl.cpf.addEventListener('keypress', ev => {
    const digit = Number.parseInt(ev.key)
    if(Number.isNaN(digit))
        ev.preventDefault()
})

formPeopleEl.cpf.addEventListener('input', ev => {
    let value = ev.target.value

    value = value.replace(/\D/g, '')
    
    const cpfPattern = /^(\d\d\d)(\d\d\d)(\d\d\d)(\d{2})$/g

    value = value.replace(cpfPattern, "$1.$2.$3-$4")

    ev.target.value = value

})





