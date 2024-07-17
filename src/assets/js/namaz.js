import { fetchData } from "./common.js";
const queryParams = new URLSearchParams(window.location.search);
const category = queryParams.get('category');
let namazNiyatData = null

// Fetch Namaz Niyat data
async function getNamazNiyat() {
    const url = `././assets/data/namaz/${category}.json`;
    try {
        const namazNiyat = await fetchData(url);
        namazNiyatData = namazNiyat[1];
        displayNamazNiyat(namazNiyat[1]);
        displayTag(namazNiyat[0])
    } catch (error) {
        console.error('Error fetching Namaz Niyat data:', error);
    }
}


// Display Namaz Niyat data in the UI
const displayNamazNiyat = (namazNiyat) => {
    let niyatContainer = document.getElementById('namaz__niyat');
    niyatContainer.innerText = "";

    namazNiyat.forEach(({title, contents}) => {
        const niyatCard = document.createElement('div');
        const headingTwo = document.createElement('h2');
        headingTwo.className = 'text-xl font-semibold text-center mt-10';
        headingTwo.innerText = title;
        niyatCard.appendChild(headingTwo);

        contents.forEach((content) => {
           const createNiyatCard = createNamazNiyatCard(content);
           niyatCard.appendChild(createNiyatCard);
        })
        niyatContainer.appendChild(niyatCard)
    });
}

// Create a Namaz Niyat card element
const createNamazNiyatCard = ({ subtitle, arabic, pronunciation }) => {
    const niyatCard = document.createElement('div');
    niyatCard.className = 'py-6 border-b border-[#f2f2f2]';
    niyatCard.innerHTML = `
        <h3 class="text-lg font-semibold mb-3 text-left text-secondary-100">${subtitle}</h3>
        <p class="text-xl mb-2 font-semibold text-secondary-100" dir="rtl">${arabic}</p>
        <p class="font-medium text-secondary-100"><strong>উচ্চারণঃ </strong>${pronunciation}</p>
    `;
    return niyatCard
}


// Handle tag filtering
function handleTagClick(event) {
    if (event.target.matches('button')) {
        const allButtons = document.querySelectorAll('.filter-button');
        allButtons.forEach((button) => button.classList.remove('active'));
        event.target.classList.add('active');

        const dataType = event.target.dataset.type;
        console.log(dataType)
        const filterData = dataType === "all" 
            ? namazNiyatData 
            : namazNiyatData.filter((data) => data.tag === dataType);
        displayNamazNiyat(filterData);
    }
}

// Add event listener for tag clicks
const tags = document.getElementById('tags');
tags.addEventListener('click', handleTagClick);
/* mobileTags.addEventListener('click', handleTagClick); */



const displayTag = (contents) => {
    const tagUl = document.getElementById('tags');
    contents.forEach((content, index) => {
        const createTagCard = createTagElemnt(content, index === 0);
        tagUl.appendChild(createTagCard);
     })
}


const createTagElemnt = ({tagName, dataType}, isActive) => {
    const li = document.createElement('li');
    li.className = 'min-w-fit'
    li.innerHTML = `
        <button class="capitalize text-left font-siliguri font-medium py-2 px-4 rounded-md text-secondary-200 block w-full filter-button ${isActive ? "active": ""}" data-type="${dataType}">${tagName}</button>
    `
    return li
}

// Fetch Namaz Niyat data on page load
getNamazNiyat();