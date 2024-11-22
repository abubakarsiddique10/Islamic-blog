import { fetchData } from "./common.js";
import { loading } from "./main.js"

const queryParams = new URLSearchParams(window.location.search);
const blogId = queryParams.get('id');


// Fetch Namaz Niyat data
async function getBlogData() {
    const url = `././assets/data/blogs/blogs.json`;
    try {
        const response = await fetchData(url);
        const filterData = response[1].find(({ id }) => id == blogId)
        blogDetailsDisplay(filterData);
        loading(false)
    } catch (error) {
        console.error(error);
    }
}

const blogDetailsDisplay = ({ title, blogImg, content, publicationDate }) => {
    const blogDetails = document.getElementById('blog_details');
    blogDetails.innerHTML = `
        <div class="flex items-center justify-between mb-4 space-x-5 text-left">
            <h2 id="blog_title" class="text-2xl md:text-2xl text-[#242424] font-bold">${title}</h2>
            <span>${publicationDate}</span>
        </div>
        <img id="blog_img" src="${blogImg}" alt="">
        <div class="my-6 text-lg text-secondary-100 ">${content}
        </div>
    `
}



// Initialize the application
document.addEventListener('DOMContentLoaded', getBlogData)