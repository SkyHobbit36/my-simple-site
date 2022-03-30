const burgerButton = document.querySelector('.burger')
const menu = document.querySelector('.header__menu')
const body = document.querySelector('body')
burgerButton.addEventListener('click', () => {
    burgerButton.classList.toggle('active')
    menu.classList.toggle('active')
    body.classList.toggle('lock')
})
