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

  respBody.forEach((repo) => {
    // eslint-disable-next-line no-console
    console.log(repo.name);
  });
  // this is how we get the first name: console.log(resp_body[0].name);
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
