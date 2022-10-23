// Creating container of header of the page
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

// Root element is here rootElem
const rootElem = document.getElementById("root");
const labelAllShows = document.createElement("label");
labelAllShows.innerHTML = "List of All Shows ";
labelAllShows.className = "labelInputSearch";
containerHeader.appendChild(labelAllShows);
const selectAllShows = document.createElement("select");
containerHeader.appendChild(selectAllShows);
selectAllShows.name = "listOfAllShows";
selectAllShows.id = "listOfAllShows";
const allShows = getAllShows();
dropDownListAllShows(allShows);

//Getting Data using APIs
var url;
function loadData() {
  fetch(url)
    .then((response) => {
      // alert("Some data loaded in Fetch");
      return response.json();
    })
    .then((allEpisodes) => {
      // console.log(allEpisodes);
      function setup(allEpisodes) {
        dropDownListOfEpisodes(allEpisodes);
        liveSearch(allEpisodes);
        makePageForEpisodes(allEpisodes);
        // alert("Some data loaded in Fetch");
      }

      setup(allEpisodes);
    })
    .catch((error) => {
      alert("The data can't be loaded  " + error);
    });
}
//End of Getting Data

//Function  to make page for all episodes
function makePageForEpisodes(episodeList) {
  rootElem.innerHTML = "";
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

//DropDown list function
//Dropdown List part start from here
const labelListOfEpisodes = document.createElement("label");
labelListOfEpisodes.innerHTML = "List of all episodes ";
labelListOfEpisodes.className = "labelListOfEpisodes";
containerHeader.appendChild(labelListOfEpisodes);
const selectEpisodes = document.createElement("select");
containerHeader.appendChild(selectEpisodes);
selectEpisodes.name = "listOfEpisodes";
selectEpisodes.id = "listOfEpisodes";
function dropDownListOfEpisodes(allEpisodes) {
  selectEpisodes.innerHTML = "";
  let option = document.createElement("option");
  option.value = -1;
  option.text = "Show All";
  // console.log(episodeElm.seasonAndEpisodeNumber);
  selectEpisodes.appendChild(option);
  let countDropdownList = 0;
  for (const episodeListElm of allEpisodes) {
    let option = document.createElement("option");
    let seasonNumber = "S" + episodeListElm.season.toString().padStart(2, "0");
    let episodeNumber = "E" + episodeListElm.number.toString().padStart(2, "0");
    option.value = countDropdownList;
    countDropdownList++;
    option.text = `${seasonNumber + episodeNumber} - ${episodeListElm.name} `;
    // console.log(episodeElm.seasonAndEpisodeNumber);
    selectEpisodes.appendChild(option);
  }
  labelInputSearch.innerHTML = `  Display ${allEpisodes.length} / ${allEpisodes.length}  Episodes`;

  selectEpisodes.addEventListener("change", (event) => {
    if (selectEpisodes.value >= 0) {
      episodeMatch = [allEpisodes[selectEpisodes.value]];
    } else {
      episodeMatch = allEpisodes;
    }
    input.value = "";
    labelInputSearch.innerHTML = `  Display ${episodeMatch.length} / ${allEpisodes.length}  Episodes`;
    makePageForEpisodes(episodeMatch);
    console.log("episodeMatch");
  });
}
//End dropdown list

const input = document.createElement("input");
input.setAttribute("type", "search");
input.setAttribute("autocomplete", "off");
input.setAttribute("placeholder", "Search for your episod");
input.setAttribute("id", "inputSearch");
containerHeader.appendChild(input);
const labelInputSearch = document.createElement("label");
labelInputSearch.setAttribute("for", inputSearch);
// labelInputSearch.innerHTML = `  Display ${episodeMatch.length} / ${allEpisodes.length}  Episodes`;
labelInputSearch.className = "labelInputSearch";
containerHeader.appendChild(labelInputSearch);
function liveSearch(allEpisodes) {
  //This part for live search
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
}

//DropDown list function
//Dropdown List All shows

function dropDownListAllShows(allShows) {
  let countDropdownList = 0;
  for (const showsElm of allShows) {
    let option = document.createElement("option");
    option.value = countDropdownList;
    if (countDropdownList === 0) {
      option.selected = true;
    }
    countDropdownList++;
    option.text = `${showsElm.name} `;
    // console.log(episodeElm.seasonAndEpisodeNumber);
    selectAllShows.appendChild(option);
  }
  url = `https://api.tvmaze.com/shows/${
    allShows[selectAllShows.value].id
  }/episodes`;
  console.log(url);
  loadData();
  selectAllShows.addEventListener("change", (event) => {
    url = `https://api.tvmaze.com/shows/${
      allShows[selectAllShows.value].id
    }/episodes`;
    loadData();
  });
}
//End dropdown list
