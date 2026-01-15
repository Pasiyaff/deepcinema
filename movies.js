const API_KEY = "2eedac34";

const FALLBACK_POSTER =
  "https://via.placeholder.com/300x450/111111/ffffff?text=No+Poster";

const genreMap = {
  action: "Action",
  adventure: "Adventure",
  comedy: "Comedy",
  drama: "Drama",
  horror: "Horror",
  romance: "Romance",
  thriller: "Thriller",
  scifi: "Sci-Fi",
  fantasy: "Fantasy",
  animation: "Animation",
  war: "War",
  western: "Western"
};

const genreSeeds = {
  action: ["Die Hard","Mad Max","John Wick","Gladiator","Terminator"],
  adventure: ["Indiana Jones","Jurassic Park","Pirates","Mummy","Avatar"],
  comedy: ["Superbad","Hangover","Step Brothers","Dumb and Dumber","Mask"],
  drama: ["Shawshank","Forrest Gump","Godfather","Fight Club","Joker"],
  horror: ["Halloween","Conjuring","It","Exorcist","Insidious"],
  romance: ["Titanic","Notebook","La La Land","Casablanca","Her"],
  thriller: ["Se7en","Gone Girl","Zodiac","Prisoners","Heat"],
  scifi: ["Inception","Matrix","Interstellar","Blade Runner","Alien"],
  fantasy: ["Lord of the Rings","Harry Potter","Hobbit","Pan","Willow"],
  animation: ["Toy Story","Up","Frozen","Shrek","Lion King"],
  war: ["Saving Private Ryan","1917","Dunkirk","Fury","Platoon"],
  western: ["Django","Unforgiven","True Grit","Tombstone","Rio Bravo"]
};

const params = new URLSearchParams(window.location.search);
const type = params.get("type");

document.getElementById("genreTitle").textContent =
  `Top 30 ${genreMap[type]} Movies`;

const container = document.getElementById("movies");
let collected = [];

async function loadMovies() {
  for (let seed of genreSeeds[type]) {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${seed}&type=movie`
    );
    const data = await res.json();
    if (data.Search) collected.push(...data.Search);
  }

  collected = collected.slice(0, 30);

  for (let item of collected) {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&i=${item.imdbID}`
    );
    const m = await res.json();

    const poster =
      m.Poster && m.Poster !== "N/A" ? m.Poster : FALLBACK_POSTER;

    container.innerHTML += `
      <div class="movie">
        <img src="${poster}">
        <div class="info">
          <h3>${m.Title}</h3>
          <span>${m.Year}</span>
          <span>IMDb ⭐ ${m.imdbRating || "N/A"}</span>
        </div>
      </div>
    `;
  }
}

loadMovies();
