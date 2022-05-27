var btn = document.querySelector(".search-form");
var album_container = document.querySelector(".album_container");
var loader_container = document.querySelector(".load-bar-container");

var message_box = document.getElementById("message-text");
var search_text = "";
var arr = [];

btn.addEventListener("submit", (e) => {
  e.preventDefault();
  search_text = document.getElementById("s_text").value;
  if (search_text !== "") {
    render_loader();
    fetch_data(search_text);
    document.getElementById("loader-wrapper").remove;
    document.getElementById("s_text").value = "";
    message_box.innerHTML = "Showing results.....";
  }
});

function fetch_data(artist) {
  fetchJsonp(
    `https://itunes.apple.com/search?term=${artist}&media=music&entity=album&attribute=artistTerm&limit=500`
  )
    .then((res) => res.json())
    .then((data) => {
      data.results.forEach((element) => {
        arr.push(element);
      });
      clear_loader();
      render_artist(arr);
    })
    .catch((err) => console.log(err));
}

function render_loader() {
  const html_string = `<div id="loader-wrapper"><span id="loader"><span class="loader-inner"></span></span></div>`;
  loader_container.insertAdjacentHTML("afterbegin", html_string);
}

function clear_loader() {
  loader_container.removeChild(loader_container.firstChild);
}

function render_artist(arr) {
  const html_string = arr
    .map((album) => {
      return `<div class="album-card">
          <div class="album-list">
              <div class="album-${album.artistId}>
                  <div class="album-info">
                      <div class="album__cover">
                          <img src=${album.artworkUrl100}>
                          </img>
                      </div>
                      <div class = "album__name">
                          <h1 class="album__title">${album.collectionName}</h1>
                      </div>
                  </div>
              </div>
          </div>
      </div>`;
    })
    .join("");
  album_container.insertAdjacentHTML("afterbegin", html_string);
}
