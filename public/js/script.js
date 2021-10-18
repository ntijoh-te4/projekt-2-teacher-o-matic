const apiUrl = 'https://api.github.com/';
// const user = "ntijoh-my-lovell"

async function readFile(file) {
  const result = await fetch(file);
  return result.text();
}
async function getToken() {
  const response = await readFile('../api.key');
  return response;
}

async function clearInput(e) {
  if (e.target.id === 'clear-input') {
    document.querySelector('#search').value = '';
    const repoDiv = document.querySelector('.show_repos');
    const forkDiv = document.querySelector('.show_fork');
    repoDiv.innerHTML = '';
    forkDiv.innerHTML = '';
  }
}

async function getForks(user, repository) {
  const response = await fetch(`${apiUrl}repos/${user}/${repository}/forks`, { method: 'GET', headers: { Authorization: `token ${await getToken()}` } });
  const respBody = await response.json();
  const forkDiv = document.querySelector('.show_fork');
  forkDiv.innerHtml = '';
  const repoDiv = document.querySelector('.show_repos');
  repoDiv.innerHTML = '';
  console.log(respBody);
  if (respBody.length === 0) {
    // eslint-disable-next-line no-alert
    alert('No forks here!');
    return undefined;
  }

  respBody.forEach((singleFork) => {
    const template = document.querySelector('#fork-template-id');
    const clone = template.content.cloneNode(true);

    clone.querySelector('.fullName').textContent = singleFork.full_name;
    clone.querySelector('.gitUrl').href = singleFork.clone_url;

    forkDiv.appendChild(clone);
  });

  // for (let index = 0; index < respBody.length; index++) {
  //   const template = document.querySelector('#fork-template-id');
  //   const clone = template.content.cloneNode(true);

  //   clone.querySelector('.fullName').textContent = respBody[index].full_name;
  //   clone.querySelector('.gitUrl').href = respBody[index].clone_url;

  //   forkDiv.appendChild(clone);
  // }
  return respBody.data;
}

// Function that gets things to call the getForks function
async function fork(e) {
  e.preventDefault();
  // Gets the reponame of the link that was clicked
  const repoName = e.target.parentElement.parentElement.querySelector('.repo_title').textContent;
  // Gets the user again
  const user = document.querySelector('input').value;
  // Calls the getForks function and brings with the reponame and the user
  getForks(user, repoName);
}

async function getRepositories(user) {
  const response = await fetch(`${apiUrl}users/${user}/repos`, { method: 'GET', headers: { Authorization: `token ${await getToken()}` } });
  const respBody = await response.json();
  const repoDiv = document.querySelector('.show_repos');
  if (!response.ok) {
    // eslint-disable-next-line no-alert
    alert('User Was Not Found!');
    return undefined;
  }
  if (respBody.length === 0) {
    // eslint-disable-next-line no-alert
    alert('User Exist But Does Not Have Any Repositories');
    return undefined;
  }
  repoDiv.innerHTML = '';

  respBody.forEach((repo) => {
    const template = document.querySelector('#repo-template-id');
    const clone = template.content.cloneNode(true);
    // This picks changes the h5 title to the repo name
    clone.querySelector('.repo_title').textContent = repo.name;

    // This changes the github link so it gets the correct directory using user and the repo name
    clone.querySelector('.github_link').href = `https://github.com/${user}/${repo.name}`;

    // adds eventlistener on fork links
    clone.querySelector('.fork_link').addEventListener('click', fork);
    // This adds the repos to divs
    repoDiv.appendChild(clone);
  });

  // for loop which loops through the repo promises
  // for (let index = 0; index < respBody.length; index++) {
  //   // This picks out the template, im totally sure how
  //   const template = document.querySelector('#repo-template-id');
  //   const clone = template.content.cloneNode(true);
  //   // This picks changes the h5 title to the repo name
  //   clone.querySelector('.repo_title').textContent = respBody[index].name;

  //   // This changes the github link so it gets the correct directory using user and the repo name
  //   clone.querySelector('.github_link').href = `https://github.com/${user}/${respBody[index].name}`;

  //   // adds eventlistener on fork links
  //   clone.querySelector('.fork_link').addEventListener('click', fork);
  //   // This adds the repos to divs
  //   repoDiv.appendChild(clone);
  // }
  return respBody.data;
}

function api(e) {
  e.preventDefault();
  const user = document.querySelector('input').value;
  getRepositories(user);
}

document.querySelector('#clear-input').addEventListener('click', clearInput);
// adds eventlistener on input
document.querySelector('#user-search').addEventListener('submit', api);
