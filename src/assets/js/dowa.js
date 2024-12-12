import { fetchData } from "./common.js";
import { loading } from "./main.js";
const queryParams = new URLSearchParams(window.location.search);
const category = queryParams.get('category');
let allDowa = null

// Fetch Namaz Niyat data
async function getData() {
    const url = `././assets/data/dowa/dowa.json`;
    try {
        loading(true)
        const response = await fetchData(url);
        const [tags, contents] = response;
        allDowa = contents;
        displayDowa(contents);
        loading(false)
        /* displayTag(tags) */
    } catch (error) {
        console.error(error);
    }
}


// Display Namaz Niyat data in the UI
const displayDowa = (namazData) => {
    let namazContainer = document.getElementById('dowa');
    namazContainer.innerText = "";

    namazData.forEach((data) => {
        const createNiyatCard = createDowaCard(data);
        namazContainer.appendChild(createNiyatCard)
    });
}

// Create a Namaz Niyat card element
const createDowaCard = ({ title, arabic, pronunciation }) => {
    const cardElement = document.createElement('div');
    cardElement.className = 'py-6 border-b flex flex-col items-center';
    cardElement.innerHTML = `
        <h2 class="text-lg font-bold mb-3 text-center">${title}।</h2>
        <p class="font-arabic text-lg md:text-xl leading-[30px] md:!leading-8 mb-2 font-semibold text-center" dir="rtl">${arabic}</p>
        <p class="font-normal text-[17px] leading-6 text-center"><strong>উচ্চারণঃ </strong>${pronunciation}</p>
    `;
    return cardElement
}


// Handle tag filtering
function handleTagClick(event) {
    if (event.target.matches('button')) {
        const allButtons = document.querySelectorAll('.filter-button');
        allButtons.forEach((button) => button.classList.remove('active'));
        event.target.classList.add('active');

        const dataType = event.target.dataset.type;
        const filterData = dataType === "all"
            ? allDowa
            : allDowa.filter((data) => data.tag === dataType);
        displayDowa(filterData);
    }
}

// Add event listener for tag clicks
/* const tags = document.getElementById('tags');
tags.addEventListener('click', handleTagClick); */



const displayTag = (contents) => {
    const tagUl = document.getElementById('tags');
    contents.forEach((content, index) => {
        const createTagCard = createTagElemnt(content, index === 0);
        tagUl.appendChild(createTagCard);
    })
}


const createTagElemnt = ({ tagName, dataType }, isActive) => {
    const li = document.createElement('li');
    li.className = 'min-w-fit'
    li.innerHTML = `
        <button class="capitalize text-left font-medium py-2 px-4 rounded-md block w-full filter-button ${isActive ? "active" : ""}" data-type="${dataType}">${tagName}</button>
    `
    return li
}

// Fetch Namaz Niyat data on page load
getData();