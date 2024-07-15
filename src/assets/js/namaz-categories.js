import { fetchData } from "./common.js";

const categoriesContainer = document.getElementById('categories');
// Function to fetch and display vocabulary categories
async function fetchCategories() {
    const url = `././assets/data/categories/namaz-categories.json`;
    try {
        const categories = await fetchData(url);
        displayCategories(categories)
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

// Function to display categories
function displayCategories(catagories) {
    catagories.forEach(category => {
        const categoryCard = createCategoryCard(category);
        categoriesContainer.append(categoryCard)
    });
    setupCategoryClickListener()
}

// Function to create a category card element
function createCategoryCard({ name, img, dataValue }) {
    const categoryCard = document.createElement('div');
    categoryCard.classList = 'category-card flex items-center gap-1.5 shadow-3xl px-1 pr-1.5 sm:pr-1 cursor-pointer select-none';
    categoryCard.setAttribute('data-type', `${dataValue}`);

    categoryCard.innerHTML = `
    <figure class="w-12 h-12 flex items-center justify-center rounded">
        <img class="w-8" src="./assets/images/icons/${img}.svg" />
    </figure>
    <h3 class="font-semibold leading-6 text-xl font-['Hind_Siliguri'] text-[#363637] capitalize">
    ${name}
    </h3>
    `
    return categoryCard;
}

const setupCategoryClickListener = () => {
    // Use event delegation on a parent element that exists when the page loads
    const categories = document.getElementById('categories');
    categories.addEventListener('click', function (event) {
        const categoryCard = event.target.closest('.category-card');
        if (categoryCard) {
            const categoryName = categoryCard.dataset.type.toLowerCase();
            const categoryTitle = categoryCard.innerText.toLowerCase();
            localStorage.setItem('title', `${categoryTitle}`)
            window.location.href = "namaz.html?category=" + categoryName;
        }
    });
}


// Initialize the application
document.addEventListener('DOMContentLoaded', fetchCategories)