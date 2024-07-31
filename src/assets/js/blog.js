import {fetchData} from "./common.js";
import { loading } from "./index.js";
/* const preloader = document.getElementById('preloader'); */
// Fetch Namaz Niyat data
async function getBlogData() {
    const url = `././assets/data/blogs/blogs.json`;
    try {
        const response = await fetchData(url);
        displayBlog(response[1]);
        loading(false)
    } catch (error) {
        console.error('Error fetching Namaz Niyat data:', error);
    }
}
getBlogData()

// Display Namaz Niyat data in the UI
const displayBlog = (contents) => {
    let blogContainer = document.getElementById('blog');
    contents.forEach((content) => {
        const createBLogCard = createArticleCard(content);
        blogContainer.appendChild(createBLogCard);
    });
    setupCategoryClickListener()
}


// Create a article card element
const createArticleCard = ({id, title, content, blogImg, publicationDate }) => {
    const cardElement = document.createElement('article');
    cardElement.className = 'blog__card border-b py-6 cursor-pointer';
    cardElement.setAttribute('data-id', `${id}`)
    cardElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <h2 class="text-xl font-extrabold pb-2">${title}</h2>
                <p class="text-secondary-100">${content.length > 200 ? content.slice(0, 200) : content}...</p>
            </div>
            <div class="w-full max-w-28 h-28 ml-14">
                <img class="w-full h-full object-cover" src="../src/assets/images/blog/blog.webp" alt="img" />
            </div>
        </div>
        <div class="mt-3">
            <span>${publicationDate}</span>
        </div>
    `;
    return cardElement
}

const setupCategoryClickListener = () => {
    // Use event delegation on a parent element that exists when the page loads
    const blogs = document.getElementById('blog');
    blogs.addEventListener('click', (event) => {
        const blogCard = event.target.closest('.blog__card');
        if(blogCard) {
           const blogId = blogCard.dataset.id;
           window.location.href = "blog-details.html?id=" + blogId;
        }
    })
}

/* getBlogData() */

/* 
// Display Namaz Niyat data in the UI
const displayNamazData = (namazData) => {
    let namazContainer = document.getElementById('namaz');
    namazContainer.innerText = "";

    namazData.forEach(({title, contents}) => {
        const categoryCard = document.createElement('div');
        const headingTwo = document.createElement('h2');
        headingTwo.className = 'text-xl font-semibold text-center mt-10';
        headingTwo.innerText = title;
        categoryCard.appendChild(headingTwo);

        contents.forEach((content) => {
           const createNiyatCard = createNamazNiyatCard(content);
           categoryCard.appendChild(createNiyatCard);
        })
        namazContainer.appendChild(categoryCard)
    });
}

// Create a Namaz Niyat card element
const createNamazNiyatCard = ({ subtitle, arabic, pronunciation }) => {
    const cardElement = document.createElement('div');
    cardElement.className = 'py-6 border-b border-[#f2f2f2]';
    cardElement.innerHTML = `
        <h3 class="text-lg font-semibold mb-3 text-left text-secondary-100">${subtitle}</h3>
        <p class="text-xl mb-2 font-medium md:font-semibold text-secondary-100" dir="rtl">${arabic}</p>
        <p class="font-normal md:font-medium text-secondary-100"><strong>উচ্চারণঃ </strong>${pronunciation}</p>
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


const createTagElemnt = ({tagName, dataType}, isActive) => {
    const li = document.createElement('li');
    li.className = 'min-w-fit'
    li.innerHTML = `
        <button class="capitalize text-left font-siliguri font-medium py-2 px-4 rounded-md text-secondary-200 block w-full filter-button ${isActive ? "active": ""}" data-type="${dataType}">${tagName}</button>
    `
    return li
}

// Fetch Namaz Niyat data on page load
getNamazData(); */
/* This code for blogs */

