async function getRepos() {
    const username = document.getElementById('username').value || 'your-github-username';
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await response.json();
    displayRepos(repos);
}

function displayRepos(repos) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Clear any existing content
    repos.forEach(repo => {
        const repoDiv = document.createElement('div');
        repoDiv.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description}</p>
            <p>Created on: ${new Date(repo.created_at).toDateString()}</p>
            <p>Updated on: ${new Date(repo.updated_at).toDateString()}</p>
            <a href="${repo.html_url}">View Repo</a>
        `;
        gallery.appendChild(repoDiv);
    });
}
