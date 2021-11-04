//DOM REFERENCES
let issueContainerEl = document.querySelector('#issues-container');
let limitWarningEl = document.querySelector('#limit-warning');
let repoNameEl = document.querySelector('#repo-name');


let getRepoName = function () {
    //grab repo name from url query string
    let queryString = document.location.search;
    let repoName = queryString.split("=")[1];
    
    if (repoName) {
        //display repo name on page
        repoName.textContent = repoName;

        getRepoIssues(repoName);
    } else {
        //if no repp was given, redirect to homepage
        document.location.replace("./index.html");
    };
};

let getRepoIssues = function(repo) {
    var apiUrl = "http://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response) {
        //request was successful
        if(response.ok) {
            response.json().then(function(data) {
                //pass response data to dom function
                displayIssues(data);

                //check if api has paginated issues
                if (response.headers.get("Link")) {
                    displayWarning(repo);
                }
            });
        }
        else {
            //if not successful redirect to the homepage
            document.location.replace("./index.html");
        }
    });
};

let displayIssues = function(issues) {
    
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
    }

    for (let i =0; i < issues.length; i++) {
        //create a link element to take useres to the issue on github
        let issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        //create span to hold issue title
        let titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        //append to container
        issueEl.appendChild(titleEl);

        //create a type element
        let typeEl = document.createElement("span");

        //check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent ="(Issue)";
        };

        // append to container
        issueEl.appendChild(typeEl);
        issueContainerEl.appendChild(issueEl);
    };
    
};

let displayWarning = function(repo) {
    limitWarningEl.textContent="To see more than 30 issues, visit ";

    let linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com"
    linkEl.setAttribute("href", "http://api.github.com/repos/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    //append to container
    limitWarningEl.appendChild(linkEl);

};

getRepoName();