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

async function getRepositories(user) {
  const response = await fetch(`${apiUrl}users/${user}/repos`, { method: 'GET', headers: { Authorization: `token ${await getToken()}` } });
  const respBody = await response.json();
  const main = document.querySelector('.show_repos');

  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < respBody.length; index++) {
    // console.log(respBody[index].name);

    const template = document.querySelector('#repo-template-id');
    const clone = template.content.cloneNode(true);
    clone.querySelector('.repo_title').textContent = respBody[index].name;
    clone.querySelector('.github_link').href = `https://github.com/${user}/${respBody[index].name}`;
    main.appendChild(clone);
  }
  // when the repo is clicked we need to call getForks(user,the_repository_that_has_been_clicked)
  return respBody.data;
}

// eslint-disable-next-line no-unused-vars
async function getForks(user, repository) {
  const response = await fetch(`${apiUrl}repos/${user}/${repository}forks`, { method: 'GET', headers: { Authorization: `token ${await getToken()}` } });
  const json = await response.json();
  return json.data;
}

function api(e) {
  e.preventDefault();
  const user = document.querySelector('input').value;
  getRepositories(user);
  // getForks();
}
