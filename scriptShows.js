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
labelAllShows.innerHTML = "List of all shows ";
labelAllShows.className = "labelAllShows";
labelAllShows.id = "labelAllShows";
containerHeader.appendChild(labelAllShows);
const selectAllShows = document.createElement("select");
containerHeader.appendChild(selectAllShows);
selectAllShows.name = "listOfAllShows";
selectAllShows.id = "listOfAllShows";

// Defining element for live search (input and label)
let inputShows = document.createElement("input");
inputShows.setAttribute("type", "search");
inputShows.setAttribute("autocomplete", "off");
inputShows.setAttribute("placeholder", "Search for Shows");
inputShows.setAttribute("id", "inputShows");
containerHeader.appendChild(inputShows);
const labelInputShows = document.createElement("label");
labelInputShows.setAttribute("for", inputShows);
// labelInputSearch.innerHTML = `  Display ${episodeMatch.length} / ${allEpisodes.length}  Episodes`;
labelInputShows.className = "labelInputShows";
labelInputShows.id = "labelInputShows";
containerHeader.appendChild(labelInputShows);
// definition of live search elements

const allShows = getAllShows();
dropDownListAllShows(allShows);
makePageForShows(allShows);
liveSearch(allShows);

//Dropdown List All shows
function dropDownListAllShows(allShows) {
  let countDropdownList = -1;
  let option = document.createElement("option");
  option.value = countDropdownList;
  option.text = "All Shows";
  selectAllShows.appendChild(option);
  for (const showsElm of allShows) {
    let option = document.createElement("option");
    countDropdownList++;
    option.value = countDropdownList;
    option.text = `${showsElm.name} `;
    // console.log(episodeElm.seasonAndEpisodeNumber);
    selectAllShows.appendChild(option);
  }

  selectAllShows.addEventListener("change", (event) => {
    console.log(allShows[selectAllShows.value]);
    if (selectAllShows.value >= 0) {
      showMatch = [allShows[selectAllShows.value]];
    } else {
      showMatch = allShows;
    }
    inputShows.value = "";
    labelInputSearch.innerHTML = `  Display ${showMatch.length} / ${allShows.length}  Episodes`;
    makePageForShows(showMatch);
    // console.log("KK");
  });
}

//Function  to make page for all episodes
function makePageForShows(allShows) {
  rootElem.innerHTML = "";
  allShows.forEach((allShowsElem, index) => {
    let containerShow = document.createElement("div");
    containerShow.className = "containerShow";
    rootElem.appendChild(containerShow);
    let nameShow = document.createElement("p");
    nameShow.className = "nameShow";
    containerShow.appendChild(nameShow);
    nameShow.innerHTML = `${allShowsElem.name} `;

    let detailsShow = document.createElement("ul");
    detailsShow.className = "detailsShow";
    containerShow.appendChild(detailsShow);
    detailsShow.innerHTML = `<li> <b>Rated: </b> ${allShowsElem.rating.average} </li>`;
    detailsShow.innerHTML += `<li> <b>Genres: </b> ${allShowsElem.genres} </li>`;
    detailsShow.innerHTML += `<li> <b>Status: </b> ${allShowsElem.status} </li>`;
    detailsShow.innerHTML += `<li> <b>Runtime: </b> ${allShowsElem.runtime} </li>`;
    // // console.log(episodeListElm.select);
    let image = document.createElement("img");
    containerShow.appendChild(image);
    image.className = "image";
    image.alt = "Image not found";
    if (allShowsElem.image == null) {
      image.src = "";
      // console.log("kkk");
    } else {
      image.src = allShowsElem.image.medium;
    }

    let summary = document.createElement("p");
    summary.className = "summary";
    summary.innerHTML = allShowsElem.summary;
    summary.style.textAlign = "left";
    containerShow.appendChild(summary);
    containerShow.addEventListener("click", function () {
      episodePage(allShows[index]);
    });
  });
}

function liveSearch(allShows) {
  //This part for live search
  inputShows.addEventListener("keyup", updateValue);
  let showMatch = "";
  function updateValue(e) {
    let realTimeInputValue = e.target.value.toLowerCase();
    rootElem.innerHTML = "";
    showMatch = allShows.filter(
      (showElm) =>
        showElm.name.toLowerCase().includes(realTimeInputValue) |
        showElm.summary.toLowerCase().includes(realTimeInputValue)
    );
    // console.log(episodeMatch);
    makePageForShows(showMatch);
    labelInputShows.innerHTML = `  Display ${showMatch.length} / ${allShows.length}  Shows`;
  }
  // End live search part
}

function episodePage(selectedShow) {
  const url = `https://api.tvmaze.com/shows/${selectedShow.id}/episodes`;
  console.log(url);
  rootElem.innerHTML = "";
  document.getElementById("listOfAllShows").style.display = "none";
  document.getElementById("labelAllShows").style.display = "none";
  document.getElementById("inputShows").style.display = "none";
  document.getElementById("labelInputShows").style.display = "none";
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
        resetPage();
        makePageForEpisodes(allEpisodes);
        // alert("Some data loaded in Fetch");
      }

      setup(allEpisodes);
    })
    .catch((error) => {
      alert("The data can't be loaded  " + error);
    });

  //Dropdown List for all Episode  start from here
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
      let seasonNumber =
        "S" + episodeListElm.season.toString().padStart(2, "0");
      let episodeNumber =
        "E" + episodeListElm.number.toString().padStart(2, "0");
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
      let seasonNumber =
        "S" + episodeListElm.season.toString().padStart(2, "0");
      let episodeNumber =
        "E" + episodeListElm.number.toString().padStart(2, "0");
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
  function resetPage() {
    const resetButton = document.createElement("button");
    resetButton.innerHTML = "Go Back to the Shows";
    containerHeader.appendChild(resetButton);
    resetButton.className = "resetButton";
    resetButton.addEventListener("click", refreshPage);
    function refreshPage() {
      window.location.reload();
    }
  }
}