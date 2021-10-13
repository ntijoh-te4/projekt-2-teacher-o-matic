async function getRepositories (user){
    return await fetch(`https://api.github.com/users/${user}/repos`,
        {headers:{'Authorization': 'token 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'}})
        .then(response => response.json()).then(data => data);
}