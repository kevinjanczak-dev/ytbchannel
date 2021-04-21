const sliderContainerEl = document.querySelector('.slider-container')
const slides = sliderContainerEl.querySelector('.slides')
const dots = sliderContainerEl.querySelector('.dots')
const navLeft = sliderContainerEl.querySelector('.nav.left')
const navRight = sliderContainerEl.querySelector('.nav.right')

let selectedSlide = 0

const items = [
    { text: 'Maça', color: '#275DAD' },
    { text: 'Banana', color: '#9A275A' },
    { text: 'Pessêgo', color: '#385F71' },
    { text: 'Manga', color: '#F4B942' },
    { text: 'Uva', color: '#62A8AC' },
    { text: 'Limão', color: '#FFA3AF' },
    { text: 'Abacaxi', color: '#7D80DA' },
]

//Carregar os itens no slider
const loadItems = () => {
    let innerHtml = []
    for(let item of items) {
        innerHtml.push(`
            <li class="slide">
                <div style="background-color: ${item.color}">
                    ${item.text}
                </div>
            </li>
        `)
    }

    slides.innerHTML = innerHtml.join('')
}

//criar os pontos de orientação do slider
const createDots = () => {
    let innerHtml = []

    for(let i=0; i<items.length; i++) {
        innerHtml.push(`
            <li class="dot">

            </li>
        `)
    }
    
    dots.innerHTML = innerHtml.join('')
}

//Setar o slider selecionado
const setSlide = (index = 0) => {

    //se superou o ultimo item, volta para o primeiro
    if(index >= items.length)
        index = 0

    //se ele for menor que a posicao do primeiro item, ele vai para o ultimo item (slide)
    if(index < 0)
        index = items.length - 1

    //Pegar o tamanho de cada slide
    const slideWidth = slides.children[0].clientWidth

    //realizar um scroll na horizontal com base no slideWidth * index (posição do slide)
    const posScrollX = slideWidth * index
    slides.scroll({
        left: posScrollX,
        behavior: 'smooth' //Suavidade na hora de realizar o scroll
    })

    //Tirando a class active de todos os dots
    for(let dot of dots.children) dot.classList.remove('active')

    //Setando a class active para o slide atual
    dots.children.item(index).classList.add('active')

    //setando a ultima posição que o slider esta 
    selectedSlide = index
}

const autoplaySlider = () => {
    //vai rodar o slider a cada 2,5s
    setInterval(() => {
        setSlide(selectedSlide + 1)
    }, 2500)
}

navLeft.addEventListener('click', ev => setSlide(selectedSlide - 1))
navRight.addEventListener('click', ev => setSlide(selectedSlide + 1))
window.addEventListener('resize', ev => setSlide(selectedSlide))

loadItems()
createDots()
setSlide(0)
autoplaySlider()