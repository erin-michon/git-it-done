let getUserRepos = function(user) {
    //format the github api url
    let apiUrl = "http://api.github.com/users/" + user + "/repos";

    //make a request to the url                     
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data){
        console.log(data);
        });
    });
};

getUserRepos("erin-michon");