// Get the GitHub username input form
const gitHubForm = document.getElementById('gitHubForm');

// Listen for submissions on GitHub username input form
gitHubForm.addEventListener('submit', (e) => {

    let ul = document.getElementById('userRepos');
    ul.innerHTML = '';

    // Prevent default form submission action
    e.preventDefault();

    // Get the GitHub username input field on the DOM
    let usernameInput = document.getElementById('usernameInput');
    let repoInput = document.getElementById('repoInput');

    // Get the value of the GitHub username input field
    let gitHubUsername = usernameInput.value;
    let gitHubRepo = repoInput.value;

    // Run GitHub API function, passing in the GitHub username
    requestUserRepoCommits(gitHubUsername, gitHubRepo)
        .then(response => response.json()) // parse response into json
        .then(data => {
            // update html with data from github
            console.log(data)
            for (let i in data) {
                // Get the ul with id of userRepos

                if (data.message === "Not Found") {
                    let ul = document.getElementById('userRepos');

                    // Create variable that will create li's to be added to ul
                    let li = document.createElement('li');

                    // Add Bootstrap list item class to each li
                    li.classList.add('list-group-item')
                    // Create the html markup for each li
                    li.innerHTML = (`
                <p><strong>The user </strong> ${gitHubUsername} <strong>does not have the repository</strong> ${gitHubRepo}</p>`);
                    // Append each li to the ul
                    ul.appendChild(li);
                    break;
                } else {

                    let ul = document.getElementById('userRepos');

                    // Create variable that will create li's to be added to ul
                    let li = document.createElement('li');

                    // Add Bootstrap list item class to each li
                    li.classList.add('list-group-item')

                    // Create the html markup for each li
                    li.innerHTML = (`
                    <p><strong>Message:</strong> ${data[i].commit.message}</p>
                    <p><strong>Date:</strong> ${data[i].commit.author.date}</p>
                    <p><strong>URL:</strong> <a href="${data[i].html_url}">${data[i].html_url}</a></p>`);

                    // Append each li to the ul
                    ul.appendChild(li);
                }
            }
        })
})

function requestUserRepoCommits(username, repoName) {
    // create a variable to hold the `Promise` returned from `fetch`
    return Promise.resolve(fetch(`https://api.github.com/repos/${username}/${repoName}/commits`));
}
