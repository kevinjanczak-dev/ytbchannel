const backdropEl = document.querySelector('.backdrop')
const formPeopleEl = backdropEl.querySelector('#form-people')
const btnCloseModalEl = backdropEl.querySelector('.close-modal')

function closeModal() {
    backdropEl.classList.remove('active')
    formPeopleEl.name.value = ''
    formPeopleEl.email.value = ''
    formPeopleEl.cpf.value = ''
    selectedIndex = null;
}

btnCloseModalEl.addEventListener('click', ev => {
    closeModal()
})

formPeopleEl.addEventListener('submit', ev => {
    ev.preventDefault()
    const people = {
        name: formPeopleEl.name.value,
        cpf: formPeopleEl.cpf.value,
        email: formPeopleEl.email.value
    }
    if(Number.isInteger(selectedIndex))
        rows.splice(selectedIndex, 1, people)
    else 
        rows.push(people)
    renderRows()
    closeModal()
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





