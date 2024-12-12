import { fetchData } from "./common.js";
import { loading } from "./main.js";
let namazNiyatData = null

// Fetch Namaz Niyat data
async function getNamazData() {
    const url = `././assets/data/surah/surah.json`;
    try {
        loading(true)
        const namazData = await fetchData(url);
        namazNiyatData = namazData[1];
        displayNamazData(namazData[1]);
        displayTag(namazData[0])
        loading(false);
    } catch (error) {
        console.error('Error fetching Namaz Niyat data:', error);
    }
}


// Display Namaz Niyat data in the UI
const displayNamazData = (namazData) => {
    let namazContainer = document.getElementById('surah');
    namazContainer.innerText = "";
    namazData.forEach((contents) => {
        const createNiyatCard = createNamazNiyatCard(contents);
        namazContainer.appendChild(createNiyatCard)
    });
}

// Create a Namaz Niyat card element
const createNamazNiyatCard = ({ subtitle, arabic, pronunciation }) => {
    const cardElement = document.createElement('div');
    cardElement.className = 'py-6 border-b';
    cardElement.innerHTML = `
        <h2 class="text-lg font-semibold mb-2 text-center">সূরা ${subtitle}</h2>
        <p class="font-arabic text-center text-lg md:text-xl !leading-[30px] md:!leading-8 mb-2 font-semibold" dir="rtl">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
        <p class="font-arabic text-lg md:text-xl !leading-[30px] md:!leading-8 mb-2 font-semibold" dir="rtl">${arabic}</p>
        <p class="font-normal text-lg leading-[26px"><strong>উচ্চারণঃ </strong>${pronunciation}</p>
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
            ? namazNiyatData
            : namazNiyatData.filter((data) => data.tag === dataType);
        displayNamazData(filterData);
    }
}

// Add event listener for tag clicks
const tags = document.getElementById('tags');
tags.addEventListener('click', handleTagClick);

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
        <button class="font-medium text-[15px] md:text-base text-left py-[6px] px-3 rounded-md block w-full filter-button ${isActive ? "active" : ""}" data-type="${dataType}">সূরা ${tagName}</button>
    `
    return li
}

// Fetch Namaz Niyat data on page load
getNamazData();




