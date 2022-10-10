//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  console.log(allEpisodes.id);
  makePageForEpisodes(allEpisodes);
}
var h1 = document.createElement("h1");
h1.innerHTML = "The list of the episodes are as follows";
document.body.prepend(h1);

const rootElem = document.getElementById("root");
function makePageForEpisodes(episodeList) {
  episodeList.forEach((episodeListElm) => {
    let containerEpisode = document.createElement("div");
    rootElem.appendChild(containerEpisode);
    let nameEpisode = document.createElement("p");
    nameEpisode.className = nameEpisode;
    containerEpisode.appendChild(nameEpisode);
    let seasonNumber = "S" + episodeListElm.season.toString().padStart(2, "0");
    let episodeNumber = "E" + episodeListElm.number.toString().padStart(2, "0");
    nameEpisode.innerHTML = `${episodeListElm.name} - ${
      seasonNumber + episodeNumber
    }`;
  });
}

window.onload = setup;
