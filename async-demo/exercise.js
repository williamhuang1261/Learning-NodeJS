
// getCustomer(1, (customer) => {
    
//     if (customer.isGold) {
//       getTopMovies((movies) => {
//         console.log('Top movies: ', movies);
//         sendEmail(customer.email, movies, () => {
//           console.log('Email sent...')
//         });
//       });
//     }
//   });

async function sendCustomer(){
    try {
        const customer = await getCustomer(1);
        console.log('Customer:', customer);
        if (customer.isGold) {
            const movies = await getTopMovies();
            console.log('Top movies: ', movies);
            await sendEmail(customer.email, movies);
            console.log('Email sent...');
        }
    }
    catch (err){
        console.log(err.message);
    }
}
sendCustomer();
  
function getCustomer(id, callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ 
            id: 1, 
            name: 'Mosh Hamedani', 
            isGold: true, 
            email: 'email' 
            });
        }, 4000); 
})
}

function getTopMovies(callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['movie1', 'movie2']);
        }, 4000);
})
}

function sendEmail(email, movies, callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 4000);
    })
}