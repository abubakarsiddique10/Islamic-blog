// Create blog article card element
const createArticleCard = ({ id, title, subtitle, blogImg, publishedDate }) => {
    const cardElement = document.createElement('article');
    cardElement.className = 'blog__card border-b py-6 cursor-pointer select-none';
    cardElement.setAttribute('data-id', `${id}`)
    cardElement.innerHTML = `
        <div class="flex items-center justify-between space-x-6 md:space-x-14">
            <!-- Content Section -->
            <div class="content">
                <h2 class="blog_card_title text-xl md:text-2xl lg:text-2xl font-bold pb-2">${title}</h2>
                <p class="blog_card_description text-base font-normal lg:text-[17px]">${subtitle}</p>
            </div>
            <!-- Image Section -->
             <div class="flex-none max-w-[100px] md:max-w-[150px]">
                <img class="image w-full h-auto"src="${blogImg}" alt="Blog thumbnail about finding a good mentor" loading="lazy">
            </div>
        </div>
        <!-- Date Section -->
        <div class="date mt-2">
            <span class="published_data text-sm">${publishedDate}</span>
        </div>
    `;
    return cardElement
}
/* w-full min-w-[80px] max-w-[80px] md:min-w-[160px] md:max-w-[160px] */
/* max-w-[120px] h-20 sm:max-w-[160px] sm:h-[100px] */
// blog card click listener
const setupCategoryClickListener = () => {
    // Use event delegation on a parent element that exists when the page loads
    const blogs = document.getElementById('blog');
    blogs.addEventListener('click', (event) => {
        const blogCard = event.target.closest('.blog__card');
        if (blogCard) {
            const blogId = blogCard.dataset.id;
            window.location.href = "blog-details.html?id=" + blogId;
        }
    })
}

// export all components function
export { createArticleCard, setupCategoryClickListener }