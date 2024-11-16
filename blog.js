// Simulating blog posts in localStorage
const apiUrl = 'http://localhost:5000'; // Placeholder, can be replaced with actual backend URL

// Initialize and load blog posts
window.onload = function() {
    loadBlogPosts();
};

// Load Blog Posts from Local Storage
function loadBlogPosts() {
    const blogList = document.getElementById('blog-list');
    blogList.innerHTML = ''; // Clear existing posts

    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.classList.add('blog-post');
        postElement.innerHTML = `
            <h3 class="post-title">${post.title}</h3>
            <p class="post-excerpt">${post.content}</p>
            <button class="update-btn" onclick="openUpdateModal(${index})">Update</button>
            <button class="delete-btn" onclick="deletePost(${index})">Delete</button>
        `;
        blogList.appendChild(postElement);
    });
}

// Open Create Modal
document.getElementById('open-create-modal').addEventListener('click', function () {
    document.getElementById('createModal').style.display = 'block';
});

// Close Create Modal
document.getElementById('close-create-modal').addEventListener('click', function () {
    document.getElementById('createModal').style.display = 'none';
});

// Create Blog Post
document.getElementById('create-btn').addEventListener('click', function () {
    const title = document.getElementById('create-title').value;
    const content = document.getElementById('create-content').value;

    if (title && content) {
        const newPost = { title, content };
        const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        posts.push(newPost);
        localStorage.setItem('blogPosts', JSON.stringify(posts));

        loadBlogPosts(); // Refresh the posts list
        document.getElementById('createModal').style.display = 'none';
    }
});

// Open Update Modal with Post Data
function openUpdateModal(index) {
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const post = posts[index];

    document.getElementById('update-title').value = post.title;
    document.getElementById('update-content').value = post.content;

    document.getElementById('update-btn').onclick = function () {
        updatePost(index);
    };

    document.getElementById('updateModal').style.display = 'block';
}

// Close Update Modal
document.getElementById('close-update-modal').addEventListener('click', function () {
    document.getElementById('updateModal').style.display = 'none';
});

// Update Blog Post
function updatePost(index) {
    const title = document.getElementById('update-title').value;
    const content = document.getElementById('update-content').value;

    if (title && content) {
        const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        posts[index] = { title, content };
        localStorage.setItem('blogPosts', JSON.stringify(posts));

        loadBlogPosts(); // Refresh the posts list
        document.getElementById('updateModal').style.display = 'none';
    }
}

// Delete Blog Post
function deletePost(index) {
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    posts.splice(index, 1);
    localStorage.setItem('blogPosts', JSON.stringify(posts));

    loadBlogPosts(); // Refresh the posts list
}
