const api_url = "https://api.github.com/"
// const user = "ntijoh-my-lovell"

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
    
    resp_body.forEach(repo => {
        console.log(repo.name)
    });
    //this is how we get the first name: console.log(resp_body[0].name);
    //when the repository is clicked we need to call getForks(user,the_repository_that_has_been_clicked)
    return resp_body.data;
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




