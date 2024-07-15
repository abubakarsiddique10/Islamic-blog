
const queryParams = new URLSearchParams(window.location.search);
const category = queryParams.get('category');
import { fetchData } from "./common.js";
let namazNiyatData = null

async function getNamazNiyat() {
    const url = `././assets/data/namaz/niyat.json`;
    try {
        const namazNiyat = await fetchData(url);
        namazNiyatData = namazNiyat;
        displayNamazNiyat(namazNiyat)
    } catch (error) {
        console.error(error)
    }
}
getNamazNiyat();


// Display vocabularies in the UI
const displayNamazNiyat = (namazNiyat) => {
    let niyatContainer = document.getElementById('namaz__niyat');
    niyatContainer.innerText = "";
    namazNiyat.forEach(({namazName, contents}) => {
        const niyatCard = document.createElement('div');
        const title = document.createElement('h2');
        title.classList = 'text-xl font-semibold text-center mt-10'
        title.innerText = namazName;
        niyatCard.appendChild(title)
        contents.forEach((content) => {
           const createNiyatCard = createNamazNiyatCard(content)
           niyatCard.appendChild(createNiyatCard)
        })
        niyatContainer.appendChild(niyatCard)
    });
}

// Create a vocabulary card element: card-
const createNamazNiyatCard = ({ title, niyatArabic, pronunciation }) => {
    const niyatCard = document.createElement('div');
    niyatCard.classList = 'py-6 border-b border-[#f2f2f2]';
    niyatCard.innerHTML = `
        <h3 class="text-lg font-semibold mb-3 text-left">${title}</h3>
        <p class="text-xl mb-2 font-semibold niyat" dir="rtl">${niyatArabic}</p>
        <p><strong>উচ্চারণঃ </strong>${pronunciation}</p>
    `;
    return niyatCard
}


const tags = document.getElementById('tags');
tags.addEventListener('click', (event) => {
    if(event.target.matches('button')) {
        const allButton = document.querySelectorAll('.filter-button');
        allButton.forEach((button) => button.classList.remove('active'))
        event.target.classList.add('active')
        const button = event.target;
        const dataType = event.target.dataset.type;
        let filterData;
        if(dataType === "all") {
            filterData = namazNiyatData;
        }else {
            filterData = namazNiyatData.filter((data) => data.tags === dataType);
        }
        displayNamazNiyat(filterData)
    }
})

