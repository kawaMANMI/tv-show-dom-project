//You can edit ALL of the code here
var allEpisodes = getAllEpisodes();
function setup() {
  makePageForEpisodes(allEpisodes);
}
//Conatiner header start
var containerHeader = document.createElement("div");
containerHeader.className = "containerHeader";
document.body.prepend(containerHeader);

var h1 = document.createElement("h1");
h1.innerHTML = "Info about all episodes are as follows";
containerHeader.appendChild(h1);
var SourceInfo = document.createElement("p");
SourceInfo.innerHTML = "the data has (originally) come from ";
SourceInfo.className = "sourceInfo";
containerHeader.appendChild(SourceInfo);
var linkSource = document.createElement("a");
var linkText = document.createTextNode("TVMaze.com");
linkSource.appendChild(linkText);
linkSource.title = "";
linkSource.href = "https://www.tvmaze.com/";
SourceInfo.appendChild(linkSource);

// container header end

const rootElem = document.getElementById("root");

function makePageForEpisodes(episodeList) {
  console.log("Kawa");
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
    // episodeListElm[seasonAndEpisodeNumber] = seasonNumber + episodeNumber;
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

//This part for live search
const input = document.createElement("input");
input.setAttribute("type", "search");
input.setAttribute("autocomplete", "off");
input.setAttribute("placeholder", "Search for your episod");
input.setAttribute("id", "inputSearch");
containerHeader.appendChild(input);
const labelInputSearch = document.createElement("label");
labelInputSearch.setAttribute("for", inputSearch);
// labelInputSearch.innerHTML = `  Number of found episodes is ${episodeMatch.length} `;
labelInputSearch.className = containerHeader.appendChild(labelInputSearch);

input.addEventListener("keyup", updateValue);

let episodeMatch = "";
function updateValue(e) {
  let realTimeInputValue = e.target.value.toLowerCase();
  rootElem.innerHTML = "";
  episodeMatch = allEpisodes.filter(
    (episodeElm) =>
      episodeElm.name.toLowerCase().includes(realTimeInputValue) |
      episodeElm.summary.toLowerCase().includes(realTimeInputValue)
  );
  console.log(episodeMatch);
  makePageForEpisodes(episodeMatch);
  labelInputSearch.innerHTML = `  Display ${episodeMatch.length} / ${allEpisodes.length}  episodes`;
}
// End live search part

window.onload = setup;
