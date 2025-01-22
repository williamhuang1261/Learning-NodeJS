//console.log('Before');
    //Asynchronous callback hell
    /*getUser(1, (user) => {
        //console.log('User', user);

        //Get repositories
        getRepositories(user.gitHubgusername, (repos) => {
            console.log('Repos', repos)
        });
    });*/
console.log('Before')
getUser(1, getRepositories);
console.log('After');


function getRepositories(user){
    getRepositories(user.gitHubgusername, getCommits);
}

function getCommits(repos){
    getCommits(repo, displayCommits);
}

function displayCommits(commits){
    console.log(commits);
}


function getUser(id, callback){
    setTimeout(() => {
        console.log('Reading a user from a database...');
        callback({id: id, gitHubUsername: 'William'});
    }, 2000);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log('Calling GitHub API...');
        callback(['repo1','repo2','repo3']);
    }, 2000);
}

/*Avoid callback hell (nesting async functions)*/