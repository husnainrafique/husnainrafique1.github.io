async function getRepos() {
    const username = document.getElementById('username').value || 'octocat';
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '<p>Loading repositories...</p>'; // Display a loading message

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!response.ok) {
            throw new Error(`User not found: ${response.statusText}`);
        }
        const repos = await response.json();
        displayRepos(repos);
    } catch (error) {
        console.error('Error fetching repos:', error);
        displayError(error.message);
    }
}

function displayRepos(repos) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Clear any existing content

    if (repos.length === 0) {
        gallery.innerHTML = `<p>No repositories found for this user.</p>`;
        return;
    }

    repos.forEach(repo => {
        const repoDiv = document.createElement('div');
        repoDiv.innerHTML = `
            <h3><i class="fab fa-github"></i> ${repo.name}</h3>
            <p>${repo.description || "No description available"}</p>
            <p>Created on: ${new Date(repo.created_at).toDateString()}</p>
            <p>Updated on: ${new Date(repo.updated_at).toDateString()}</p>
            <p class="repo-stats">Size: ${repo.size} KB</p>
            <p class="repo-stats">Watchers: ${repo.watchers_count}</p>
            <a href="${repo.html_url}" target="_blank">View Repository</a>
        `;
        gallery.appendChild(repoDiv);
    });
}

function displayError(message) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = `<p style="color:red;">${message}</p>`;
}
