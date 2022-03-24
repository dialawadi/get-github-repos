// main variables

let theInput = document.querySelector(".get-repos input"),
  getButton = document.querySelector(".get-repos .get-button"),
  reposData = document.querySelector(".show-data");

getButton.onclick = function () {
  getRepos();
};

// get repos function
function getRepos() {
  // if value is empty

  if (theInput.value === "") {
    reposData.innerHTML = "<span> Please Write Github Username. </span> ";
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((response) => response.json())

      .then((repostires) => {
        // empty the container
        reposData.innerHTML = "";
        // loop on repos
        repostires.forEach((repo) => {
          // create main div
          let mainDiv = document.createElement("div");

          // create repo name tex
          let repoName = document.createTextNode(repo.name);

          // append the text to the main div
          mainDiv.appendChild(repoName);

          // create repo url
          let theUrl = document.createElement("a");

          // create repo url text
          let theUrlText = document.createTextNode("Visit");

          // append the url text to a
          theUrl.appendChild(theUrlText);

          // add the hyperText reference
          theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;

          // set attrubite blank
          theUrl.setAttribute("target", "_blank");

          // append url a to div
          mainDiv.appendChild(theUrl);

          // create start count span
          let starsSpan = document.createElement("span");

          // create the start count text
          let starsText = document.createTextNode(
            `Stars ${repo.stargazers_count}`
          );

          // add stars text to star span
          starsSpan.appendChild(starsText);

          // append stars span to div
          mainDiv.appendChild(starsSpan);

          // add class to main div
          mainDiv.className = "repo-box";

          // append the main div to container
          reposData.appendChild(mainDiv);
        });
      });
  }
}
