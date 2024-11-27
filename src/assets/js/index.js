import { fetchData } from "./common.js";
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

const createTagElemnt = ({ tagName, dataType }, isActive) => {
    const a = document.createElement('a');
    a.href = dataType + '.html';
    a.className = 'min-w-fit space-y-2 flex-shrink-0 lg:w-full lg:flex items-center lg:space-y-0 lg:space-x-4';
    a.innerHTML = `
        <img class="select-none w-8 mx-auto lg:w-7 lg:mx-0" src="./assets/images/banner/${dataType}.png" alt="">
        <span class="text-sm font-sans font-medium text-secondary-200 text-center block lg:text-left">${tagName}</span>
    `
    return a;
}




