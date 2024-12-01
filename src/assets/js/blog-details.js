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
    console.log(title)
    const blogDetails = document.getElementById('blog_details');
    blogDetails.innerHTML = `
        <h1 id="blog_title" class="text-[32px] leading-[46px] lg:text-[40px] lg:leading-[56px] text-[#242424] font-bold mb-4">${title}</h1>
       <figure class="mb-4">
            <img id="blog_img" src="./assets/images/blog/${blogImg}.webp" alt="Blog banner for ভালো মেন্টর কিভাবে খুজবেন?" class="w-full h-auto">
        </figure>
        <div class="flex items-center gap-2 text-gray-600 text-sm">
            <span class="font-medium">প্রকাশ:</span>
            <time" class="text-nowrap">${publicationDate}</time>
        </div>
        <article class="my-6 text-[17px] sm:text-lg text-secondary-100 leading-7 md:leading-[30px]">${content.join('')}
        </article >
    `
}



// Initialize the application
document.addEventListener('DOMContentLoaded', getBlogData)












