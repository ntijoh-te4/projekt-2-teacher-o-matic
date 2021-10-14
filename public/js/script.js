const api_url = "https://api.github.com/"
// const user = "ntijoh-my-lovell"
// hard coded user, needs to be changed into functions w/ get requests



async function readFile(file) {
    return await fetch(file)
    .then(response => response.text())
    .then(text => text)
}
async function getToken() {
    const response = await readFile('../api.key');
    return response;
}

//adds eventlistener on input
document.querySelector("#user-search").addEventListener("submit", api);

async function getRepositories(user) {
    //const token = await getToken();
    //console.log(token);
    const response = await fetch(api_url + "users/" + user + '/repos', { method: 'GET', headers: {'Authorization': 'token ' + await getToken()  }})
    const json = await response.json()
    console.log(response);
    console.log(json);
    return json.data;
    //returns a promise containing a map with repos abd related data
}

async function getForks(user) {
    const response = await fetch(api_url + "repos/" + user + "/" + repository + "forks", { method: 'GET', headers: {'Authorization': 'token ' + await getToken() }})
    const json = await response.json()
    return json.data;
}

function api(e) {
    e.preventDefault();
    const user = document.querySelector("input").value   
    getRepositories(user);
    //getForks();
}




