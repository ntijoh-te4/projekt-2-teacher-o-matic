const api_url = "https://api.github.com/"
const user = "ntijoh-my-lovell"
// hard coded user, needs to be changed into functions w/ get requests



async function readFile(file) {
    return await fetch(file)
    .then(response => response.text())
    .then(text => text)
}
async function getToken() {
    let response = await readFile('../../token.key');
    return response;
}


async function getRepositories(user) {
    return await fetch(api_url + "users/" + user + '/repos', { method: 'GET', headers: {'Authorization': 'token' + await getToken()}})
    .then(result => result.json())
    .then(data => data);
    console.log(data);
}

async function getForks(user, repository) {
    return await fetch(api_url + "repos/" + user + "/" + repository + "forks", { method: 'GET', headers: {'Authorization': 'token' + await getToken() }})
    .then(result => result.json())
    .then(data => data);
}
