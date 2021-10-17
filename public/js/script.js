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

// adds eventlistener on input
// eslint-disable-next-line no-use-before-define
document.querySelector('#user-search').addEventListener('submit', api);

// eslint-disable-next-line no-unused-vars
async function getForks(user, repository) {
  const response = await fetch(`${apiUrl}repos/${user}/${repository}/forks`, { method: 'GET', headers: { Authorization: `token ${await getToken()}` } });
  const respBody = await response.json();
  const fullName = respBody[0].full_name;
  const gitUrl = respBody[0].git_url;
  // class=fullName in fork_listing.html
  // eslint-disable-next-line no-console
  console.log(fullName);
  // class=gitUrl in fork_listing.html
  // eslint-disable-next-line no-console
  console.log(gitUrl);

  return respBody.data;
}

async function getRepositories(user) {
  const response = await fetch(`${apiUrl}users/${user}/repos`, { method: 'GET', headers: { Authorization: `token ${await getToken()}` } });
  const respBody = await response.json();
  const repoDiv = document.querySelector('.show_repos');
  // create a for loop instead of hard coded index=4
  const repository = respBody[4].name;
  // eslint-disable-next-line no-console
  console.log(repository);

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
    // This adds the repos to divs
    repoDiv.appendChild(clone);
  }
  getForks(user, repository);
  // when the repo is clicked we need to call getForks(user,the_repository_that_has_been_clicked)
  return respBody.data;
}

function api(e) {
  e.preventDefault();
  const user = document.querySelector('input').value;
  getRepositories(user);
  // getForks();
}
