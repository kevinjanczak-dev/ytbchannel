const dropdown = document.querySelector('.container-dd')
const inputEl = dropdown.querySelector('#toggle-dd');
const textEl = dropdown.querySelector('.text')
const listEl = dropdown.querySelector('.list-dd')

const cars = [
    { id: 1, desc: 'Gol' },
    { id: 2, desc: 'Fox' },
    { id: 3, desc: 'Honda Civic' },
    { id: 4, desc: 'Corolla' },
    { id: 5, desc: 'Fiorino' },
]

const template = cars.map(car => `
    <li data-id="${car.id}">${car.desc}</li>
`)

listEl.innerHTML = template.join('')

listEl.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', ev => {
        const selectedItem = listEl.querySelector('.active')
        if(selectedItem) 
            selectedItem.classList.remove('active')
        item.classList.add('active')
        textEl.innerHTML = item.innerHTML
        inputEl.checked = false
    })
})