const apiUrl = 'https://api.github.com/';
// const user = "ntijoh-my-lovell"

async function readFile(file) {
  // eslint-disable-next-line no-return-await
  return await fetch(file)
    .then((response) => response.text())
    .then((text) => text);
}
async function getToken() {
  const response = await readFile('../api.key');
  return response;
}

// eslint-disable-next-line no-use-before-define
document.querySelector('#clear-input').addEventListener('click', clearInput);
async function clearInput() {
  // eslint-disable-next-line no-restricted-globals
  addEventListener('click', (e) => {
    if (e.target.id === 'clear-input') {
      document.querySelector('#search').value = '';
      const repoDiv = document.querySelector('.show_repos');
      const forkDiv = document.querySelector('.show_fork');
      repoDiv.innerHTML = '';
      forkDiv.innerHTML = '';
    }
  });
}

// adds eventlistener on input
// eslint-disable-next-line no-use-before-define
document.querySelector('#user-search').addEventListener('submit', api);

// eslint-disable-next-line no-unused-vars
async function getForks(user, repository) {
  const response = await fetch(`${apiUrl}repos/${user}/${repository}/forks`, { method: 'GET', headers: { Authorization: `token ${await getToken()}` } });
  const respBody = await response.json();
  const forkDiv = document.querySelector('.show_fork');
  forkDiv.innerHtml = '';
  const repoDiv = document.querySelector('.show_repos');
  repoDiv.innerHTML = '';
  // class=fullName in fork_listing.html
  // class=gitUrl in fork_listing.html
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < respBody.length; index++) {
    const template = document.querySelector('#fork-template-id');
    const clone = template.content.cloneNode(true);

    clone.querySelector('.fullName').textContent = respBody[index].full_name;
    clone.querySelector('.gitUrl').href = respBody[index].clone_url;

    forkDiv.appendChild(clone);
  }
  return respBody.data;
}

async function getRepositories(user) {
  const response = await fetch(`${apiUrl}users/${user}/repos`, { method: 'GET', headers: { Authorization: `token ${await getToken()}` } });
  if (!response.ok) {
    alert('User Was Not Found!');
    return undefined;
  }
  const respBody = await response.json();
  const repoDiv = document.querySelector('.show_repos');
  repoDiv.innerHTML = '';

  // for loop which loops through the repo promises
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < respBody.length; index++) {
    // This picks out the template, im totally sure how
    const template = document.querySelector('#repo-template-id');
    const clone = template.content.cloneNode(true);
    // This picks changes the h5 title to the repo name
    clone.querySelector('.repo_title').textContent = respBody[index].name;

    // This changes the github link so it gets the correct directory using user and the repo name
    clone.querySelector('.github_link').href = `https://github.com/${user}/${respBody[index].name}`;

    // adds eventlistener on fork links
    // eslint-disable-next-line no-use-before-define
    clone.querySelector('.fork_link').addEventListener('click', fork);
    // This adds the repos to divs
    repoDiv.appendChild(clone);
  }
  // when the repo is clicked we need to call getForks(user,the_repository_that_has_been_clicked)
  return respBody.data;
}

// Function that gets things to call the getForks function
async function fork(e) {
  e.preventDefault();
  // Gets the reponame of the link that was clicked
  // eslint-disable-next-line no-console
  const repoName = e.target.parentElement.parentElement.querySelector('.repo_title').textContent;
  // Gets the user again
  const user = document.querySelector('input').value;
  // Calls the getForks function and brings with the reponame and the user
  // eslint-disable-next-line no-use-before-define
  getForks(user, repoName);
}

function api(e) {
  e.preventDefault();
  const user = document.querySelector('input').value;
  getRepositories(user);
  // getForks();
}
