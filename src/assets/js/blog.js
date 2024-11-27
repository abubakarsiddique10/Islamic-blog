/* import { fetchData } from "./common.js";
import { createArticleCard, setupCategoryClickListener } from "./components.js";

// Fetch Namaz Niyat data
async function getBlogData() {
    const url = `././assets/data/blogs/blogs.json`;
    try {
        const response = await fetchData(url);
        const sliceBlog = response[1].slice(0, 4);
        displayBlog(sliceBlog);
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





 */