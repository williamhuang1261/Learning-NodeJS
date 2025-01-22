console.log('Before')

// getUser(1)
//     .then(user => getRepositories(user.gitHubUsername))
//     .then(repos => getCommits(repos[0]))
//     .then(commits => console.log('commits'))
//     .catch(err => console.log('Error', err.message));

//Async and Await approach
async function displayCommits() {
    try{
        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    }
    catch (err){
        console.log('Error', err.message);
    }
}

displayCommits();

console.log('After');

function getUser(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({id: id, gitHubUsername: 'William'});
        }, 2000);
    });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Calling GitHub ${username}'s API...`);
            //resolve(['repo1','repo2','repo3']);
            reject(new Error('Could not get the repos'))
        }, 2000);
    }) 
}

function getCommits(repo){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Calling GitHub ${repo} API...`);
            resolve(['commit']);
        }, 2000);
    })
}