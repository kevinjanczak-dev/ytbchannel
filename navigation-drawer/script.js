const menuLinksEl = document.querySelector('.menu-links')

const links = [
    { title: 'Adicionar Cliente', icon: 'fas fa-plus' },
    { title: 'Procurar Cliente', icon: 'fas fa-search' },
    { title: 'Remover Cliente', icon: 'fas fa-trash' },
    { title: 'Editar Cliente', icon: 'fas fa-pen' },
]

const templateLinks = links.map(link => (
    `
        <a href="javascript:void(0)" class="link">
            <i class="${link.icon}"></i>
            ${link.title}
        </a>
    `
))

menuLinksEl.innerHTML = templateLinks.join('')