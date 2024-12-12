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

const blogDetailsDisplay = ({ title, blogImg, content, publishedDate }) => {
    const blogDetails = document.getElementById('blog_details');
    blogDetails.innerHTML = `
        <h1 id="blog_title" class="text-[32px] leading-[46px] lg:text-[40px] lg:leading-[56px] font-bold mb-4">${title}</h1>
       <figure class="mb-4">
            <img id="blog_img" src="${blogImg}" alt="Blog banner for ভালো মেন্টর কিভাবে খুজবেন?" class="w-full h-auto">
        </figure>
        <div class="flex items-center space-x-1.5 text-sm">
            <span class="font-medium">প্রকাশ:</span>
            <time" class="text-nowrap">${publishedDate}</time>
        </div>
        <article class="my-6 text-[17px] lg:text-lg lg:leading-[30px]">${content.join('')}
        </article >
    `
}



// Initialize the application
document.addEventListener('DOMContentLoaded', getBlogData)












