import { fetchData } from "./common.js";

/* NAVBAR START */
const navbarToggler = document.querySelector('.navbar-toggler');
const openMenu = document.getElementById('open-menu');
const closenMenu = document.getElementById('close-menu');
const header = document.getElementById('header');
let isOpen = false;

// Navbar active class
const navLink = document.querySelectorAll('.nav-link');
const navItems = document.querySelector('.nav__items')
navLink.forEach((link) => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-active').classList.remove('nav-active')
        link.classList?.add('nav-active')
    })
})

navbarToggler.addEventListener('click', (e) => {
    openMenu.style.display = e.target.id == "open-menu" ? "none" : "block";
    closenMenu.style.display = e.target.id == "close-menu" ? "none" : "block";
    navItems.classList.toggle('show')

    isOpen = !isOpen;
    header.classList.toggle('header__bg')
    if (window.scrollY > 0) {
        header.classList.add('header__bg')
    }
})
// windo scroll navbar bg color change
window.addEventListener('scroll', () => {
    if (window.scrollY > 0 && !isOpen) {
        header.classList.add('header__bg')
    } else if (isOpen) {
        header.classList.add('header__bg')
    } else {
        header.classList.remove('header__bg')
    }
})

// Load MenuItem
async function getMenuItem() {
    const url = `././assets/data/nav/menuItem.json`;
    try {
        const menuItem = await fetchData(url);
        displayMenuItem(menuItem)
    } catch (error) {
        console.error(error)
    }
}
getMenuItem();

// Display MenuItem in the UI
const displayMenuItem = (menuItem) => {
    const ul = document.getElementById('menuItem');
    menuItem.forEach(item => {
        const createMenuElement = createMenuItem(item)
        ul.appendChild(createMenuElement)
    });
}

// Create a menu element
const createMenuItem = (item) => {
    const li = document.createElement('li');
    li.className = 'nav-item'
    li.innerHTML = `
        <a class="capitalize font-medium lg:font-normal py-2 lg:py-0 rounded-md leading-5 lg:text-[17px] text-[#000000cc] tracking-[-0.45px] nav-active block" aria-current="page" href="${item.link}">${item.name}
        </a>
    `;
    return li
}
/* NAVBAR END */



// loading sppiner
function loading(value) {
    const preloader = document.getElementById('preloader');
    preloader.style.display = value ? "block" : "none";
}

// export loading function
export { loading }


/*=========================
    tags Slide Start
==========================*/
const tagBody = document.getElementById('tags');
let isdragging = false;

tagBody?.addEventListener('scroll', () => {
    tagBody.scrollWidth - tagBody.clientWidth;
})

tagBody?.addEventListener('mousemove', (e) => {
    if (!isdragging) return;
    tagBody.style.scrollBehavior = "auto";
    tagBody.scrollLeft = tagBody.scrollLeft - e.movementX;
    tagBody.style.scrollBehavior = "smooth";
})

tagBody?.addEventListener('mousedown', () => isdragging = true);
tagBody?.addEventListener('mouseup', () => isdragging = false);
tagBody?.addEventListener('mouseleave', () => isdragging = false);


/* console.log('Ah, web development. When I first dove into this field, I imagined building sleek websites, solving complex problems, and getting…'.length)
console.log('হুজুগে, বাপের হোটেল বন্ধ হয়ে যাওয়া দুর্যোগ কিংবা গুগল, মাইক্রোসফট, ফেসবুকের মতো বড় বড় কোম্পানিতে চাকরি পাওয়ার সুযোগে; যে যে কার...'.length) */