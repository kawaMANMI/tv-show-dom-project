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
h1.innerHTML = "TV Drama Series";
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

    // console.log(episodeListElm.select);
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

//Dropdown List part start from here
var select = document.createElement("select");
containerHeader.appendChild(select);
select.name = "listOfEpisodes";
select.id = "listOfEpisodes";
let option = document.createElement("option");
option.value = -1;
option.text = "Show All";
// console.log(episodeElm.seasonAndEpisodeNumber);
select.appendChild(option);

let countDropdownList = 0;
for (const episodeListElm of allEpisodes) {
  let option = document.createElement("option");
  let seasonNumber = "S" + episodeListElm.season.toString().padStart(2, "0");
  let episodeNumber = "E" + episodeListElm.number.toString().padStart(2, "0");
  option.value = countDropdownList;
  countDropdownList++;
  option.text = `${seasonNumber + episodeNumber} - ${episodeListElm.name} `;
  // console.log(episodeElm.seasonAndEpisodeNumber);
  select.appendChild(option);
}

select.addEventListener("change", (event) => {
  if (select.value > 0) {
    episodeMatch = [allEpisodes[select.value]];
  } else {
    episodeMatch = allEpisodes;
  }
  rootElem.innerHTML = "";
  makePageForEpisodes(episodeMatch);
});
//End dropdown list

//This part for live search
const input = document.createElement("input");
input.setAttribute("type", "search");
input.setAttribute("autocomplete", "off");
input.setAttribute("placeholder", "Search for your episod");
input.setAttribute("id", "inputSearch");
containerHeader.appendChild(input);
const labelInputSearch = document.createElement("label");
labelInputSearch.setAttribute("for", inputSearch);
labelInputSearch.innerHTML = "";
labelInputSearch.className = "labelInputSearch";
containerHeader.appendChild(labelInputSearch);

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
  // console.log(episodeMatch);
  makePageForEpisodes(episodeMatch);
  labelInputSearch.innerHTML = `  Display ${episodeMatch.length} / ${allEpisodes.length}  Episodes`;
}
// End live search part

window.onload = setup;
