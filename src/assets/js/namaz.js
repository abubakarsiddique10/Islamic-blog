import { fetchData } from "./common.js";
let namazNiyatData = null

// Fetch Namaz Niyat data
async function getNamazNiyat() {
    const url = `././assets/data/namaz/niyat.json`;
    try {
        const namazNiyat = await fetchData(url);
        namazNiyatData = namazNiyat;
        displayNamazNiyat(namazNiyat)
    } catch (error) {
        console.error('Error fetching Namaz Niyat data:', error);
    }
}


// Display Namaz Niyat data in the UI
const displayNamazNiyat = (namazNiyat) => {
    let niyatContainer = document.getElementById('namaz__niyat');
    niyatContainer.innerText = "";

    namazNiyat.forEach(({namazName, contents}) => {
        const niyatCard = document.createElement('div');
        const title = document.createElement('h2');
        title.className = 'text-xl font-semibold text-center mt-10';
        title.innerText = namazName;
        niyatCard.appendChild(title);

        contents.forEach((content) => {
           const createNiyatCard = createNamazNiyatCard(content);
           niyatCard.appendChild(createNiyatCard);
        })
        niyatContainer.appendChild(niyatCard)
    });
}

// Create a Namaz Niyat card element
const createNamazNiyatCard = ({ title, niyatArabic, pronunciation }) => {
    const niyatCard = document.createElement('div');
    niyatCard.className = 'py-6 border-b border-[#f2f2f2]';
    niyatCard.innerHTML = `
        <h3 class="text-lg font-semibold mb-3 text-left">${title}</h3>
        <p class="text-xl mb-2 font-semibold" dir="rtl">${niyatArabic}</p>
        <p><strong>উচ্চারণঃ </strong>${pronunciation}</p>
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
        const filterData = dataType === "all" 
            ? namazNiyatData 
            : namazNiyatData.filter((data) => data.tags === dataType);

        displayNamazNiyat(filterData);
    }
}

// Add event listener for tag clicks
const tags = document.getElementById('tags');
const mobileTags = document.getElementById('mobile__tags');
tags.addEventListener('click', handleTagClick);
mobileTags.addEventListener('click', handleTagClick);

// Fetch Namaz Niyat data on page load
getNamazNiyat();