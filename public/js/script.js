const api_url = "https://api.github.com/"
// const user = "ntijoh-my-lovell"
// hard coded user, needs to be changed into functions w/ get requests



async function readFile(file) {
    return await fetch(file)
    .then(response => response.text())
    .then(text => text)
}
async function getToken() {
    let response = await readFile('../../api.key');
    return response;
}

function api() {
    //adds eventlistener on input
    document.querySelector("#search").addEventListener("input", api)
    let user = document.querySelector("#search").value
    
    async function getRepositories() {
        return await fetch(api_url + "users/" + user + '/repos', { method: 'GET', headers: {'Authorization': 'token' + await getToken()}})
        .then(result => result.json())
        .then(data => data);
    }
    
    async function getForks() {
        return await fetch(api_url + "repos/" + user + "/" + repository + "forks", { method: 'GET', headers: {'Authorization': 'token' + await getToken() }})
        .then(result => result.json())
        .then(data => data);
    }

    getRepositories();
    getForks();
}




