import {fetchData} from "./common.js";
import { createArticleCard, setupCategoryClickListener } from "./components.js";


let allData = null;
// Fetch Namaz Niyat data
async function getBlogData() {
    const url = `././assets/data/blogs/blogs.json`;
    try {
        const response = await fetchData(url);
        allData = response[1]
        displayBlog(response[1]);
        displayTag(response[0]);
    } catch (error) {
        console.error('Error fetching Namaz Niyat data:', error);
    }
}
getBlogData()

// Display Namaz Niyat data in the UI
const displayBlog = (contents) => {
    let blogContainer = document.getElementById('blog');
    blogContainer.innerHTML = "";
    contents.forEach((content) => {
        const createBLogCard = createArticleCard(content);
        blogContainer.appendChild(createBLogCard);
    });
    setupCategoryClickListener()
}


// Handle tag filtering
function handleTagClick(event) {
    if (event.target.matches('button')) {
        const allButtons = document.querySelectorAll('.filter-button');
        allButtons.forEach((button) => button.classList.remove('active'));
        event.target.classList.add('active');

        const dataType = event.target.dataset.type;
        const filterData = dataType === "all" 
            ? allData 
            : allData.filter((data) => data.tags === dataType);
            displayBlog(filterData);
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

const createTagElemnt = ({tagName, dataType}, isActive) => {
    const li = document.createElement('li');
    li.className = 'min-w-fit'
    li.innerHTML = `
        <button class="capitalize text-left font-siliguri font-medium py-2 px-4 rounded-md text-secondary-200 block w-full filter-button ${isActive ? "active": ""}" data-type="${dataType}">${tagName}</button>
    `
    return li
}