import { fetchData } from "./common.js";

// Fetch presentation data and initialize the display
async function getPresentation() {
    const url = `././assets/data/speaking/presentation.json`;
    try {
        const presentation = await fetchData(url);
        displayPresentation(presentation);
    } catch (error) {
        console.error('Error fetching presentation data:', error)
    }
}

// Display presentations in the UI
const displayPresentation = (presentation) => {
    const presentationContainer = document.getElementById('presentation');
    presentation.forEach(item => {
        const presentationCardElement = createVocabulariesCard(item);
        presentationContainer.appendChild(presentationCardElement)
    });
    addReadMoreEventListeners()
}

// Create a presentation card element
const createVocabulariesCard = ({ title, content }) => {
    const truncatedContent = content.length > 250 ? content.slice(0, 250) : content;
    const presentationCard = document.createElement('a');
    presentationCard.innerHTML = `
    <article class="pt-6 pb-8 border-b w-full max-w-[728px] mx-auto">
        <div class="flex items-center justify-between pb-2 ">
            <h2 class="text-xl font-extrabold capitalize">${title}</h2>
            <img class="w-5" src="./assets/images/icons/play-circle.svg" alt="">
        </div>
        <p class="text-[#242424]">
            <span class="presentationPreview">${truncatedContent}</span>
            <span class="hidden">${content}</span>
            <button class="presentationBtn text-[#108a00]">...Read more</button>  
        </p>
    </article>
    `;
    return presentationCard
}

// Add event listeners for "Read more/less" buttons using event delegation
const addReadMoreEventListeners = () => {
    const presentationContainer = document.getElementById('presentation');
    presentationContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('presentationBtn')) {
            const button = event.target;
            const presentationPreview = button.previousElementSibling.previousElementSibling;
            const presentationContent = button.previousElementSibling;

            const isContentHidden = presentationContent.classList.contains('hidden');
            button.innerHTML = isContentHidden ? "Read less" : "...Read more";
            presentationContent.classList.toggle('hidden');
            presentationPreview.classList.toggle('hidden');

        }
    })
}
// Initialize the application
document.addEventListener('DOMContentLoaded', getPresentation)

