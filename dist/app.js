const burgerButton=document.querySelector(".burger"),menu=document.querySelector(".header__menu"),body=document.querySelector("body");burgerButton.addEventListener("click",()=>{burgerButton.classList.toggle("active"),menu.classList.toggle("active"),body.classList.toggle("lock")});