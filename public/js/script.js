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
    const response = await fetch(api_url + "users/" + user + '/repos', { method: 'GET', headers: {'Authorization': 'token ' + await getToken()  }})
    const resp_body = await response.json()
    
    console.log(resp_body[0].name);

    return resp_body.data;
    //returns a promise containing a map with repos abd related data


    //const response = await fetch(api_url + "users/" + user + '/repos', { method: 'GET', headers: {'Authorization': 'token ' + await getToken()  }})
    //.then(response => response.json()).then(data => data).then(name => name);
    //console.log(response.get("name"));
    //return response;
} 










async function getForks(user, repository) {
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




