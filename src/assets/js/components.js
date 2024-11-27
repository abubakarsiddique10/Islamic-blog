// Create blog article card element
const createArticleCard = ({ id, title, subtitle, blogImg, publicationDate }) => {
    const cardElement = document.createElement('article');
    cardElement.className = 'blog__card border-b py-6 cursor-pointer select-none';
    cardElement.setAttribute('data-id', `${id}`)
    cardElement.innerHTML = `
        <div class="flex items-center justify-between">
            <!-- Content Section -->
            <div class="content">
                <h2 class="title text-xl md:text-2xl lg:text-2xl text-gray-900 font-bold pb-2">${title}</h2>
                <p class="description text-base font-normal text-gray-600 lg:text-[17px]">${subtitle}</p>
            </div>
            <!-- Image Section -->
             <div class="image-container w-full max-w-[120px] h-20 sm:max-w-[160px] sm:h-[100px] ml-8 lg:ml-14">
                <img class="image w-full h-full object-cover"src="./assets/images/blog/${blogImg}.webp" alt="Blog thumbnail about finding a good mentor" loading="lazy">
            </div>
        </div>
        <!-- Date Section -->
        <div class="date mt-2">
            <span class="text-gray-600 text-sm">${publicationDate}</span>
        </div>
    `;
    return cardElement
}
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