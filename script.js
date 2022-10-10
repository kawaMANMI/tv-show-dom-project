//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  console.log(allEpisodes.id);
  makePageForEpisodes(allEpisodes);
}

var headerDiv = document.createElement("div");
headerDiv.className="headerInfo"
document.body.prepend(headerDiv);

var h1 = document.createElement("h1");
h1.innerHTML = "Info about all episodes are as follows";
headerDiv.appendChild(h1);
var SourceInfo = document.createElement("p");
SourceInfo.innerHTML = "the data has (originally) come from ";
SourceInfo.className = "sourceInfo";
headerDiv.appendChild(SourceInfo);
var linkSource = document.createElement("a");
var linkText = document.createTextNode("TVMaze.com");
linkSource.appendChild(linkText);
linkSource.title = "";
linkSource.href = "https://www.tvmaze.com/";
SourceInfo.appendChild(linkSource);

const rootElem = document.getElementById("root");

function makePageForEpisodes(episodeList) {
  episodeList.forEach((episodeListElm) => {
    let containerEpisode = document.createElement("div");
    containerEpisode.className = "containerEpisode";
    rootElem.appendChild(containerEpisode);
    let nameEpisode = document.createElement("p");
    nameEpisode.className = "nameEpisode";
    containerEpisode.appendChild(nameEpisode);
    let seasonNumber = "S" + episodeListElm.season.toString().padStart(2, "0");
    let episodeNumber = "E" + episodeListElm.number.toString().padStart(2, "0");
    nameEpisode.innerHTML = `${episodeListElm.name} - ${
      seasonNumber + episodeNumber
    }`;
    let image = document.createElement("img");
    containerEpisode.appendChild(image);
    image.className = "image";

    image.src = episodeListElm.image.medium;

    let summary = document.createElement("p");
    summary.className = "summary";
    summary.innerHTML = episodeListElm.summary;
    summary.style.textAlign = "left";
    containerEpisode.appendChild(summary);
  });
}

window.onload = setup;

