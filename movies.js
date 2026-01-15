const API_KEY = "2eedac34";

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
  action: ["Die Hard","Mad Max","Gladiator","John Wick"],
  adventure: ["Indiana Jones","Jurassic Park","The Mummy","Pirates"],
  comedy: ["Superbad","The Mask","Step Brothers","Hangover"],
  drama: ["Forrest Gump","Shawshank","Fight Club","Godfather"],
  horror: ["Halloween","Conjuring","It","Exorcist"],
  romance: ["Titanic","Notebook","La La Land","Casablanca"],
  thriller: ["Se7en","Gone Girl","Prisoners","Zodiac"],
  scifi: ["Inception","Matrix","Interstellar","Blade Runner"],
  fantasy: ["Lord of the Rings","Harry Potter","Hobbit","Willow"],
  animation: ["Toy Story","Up","Frozen","Shrek"],
  war: ["Saving Private Ryan","1917","Fury","Dunkirk"],
  western: ["Unforgiven","Django","True Grit","Tombstone"]
};

const params = new URLSearchParams(window.location.search);
const type = params.get("type");

const title = document.getElementById("genreTitle");
const container = document.getElementById("movies");

title.textContent = `Top 30 ${genreMap[type]} Movies`;

let results = [];

async function fetchMovies() {
  for (let seed of genreSeeds[type]) {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${seed}&type=movie`);
    const data = await res.json();
    if (data.Search) results.push(...data.Search);
  }

  results = results.slice(0,30);

  for (let movie of results) {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`);
    const m = await res.json();

    if (m.Poster === "N/A") continue;

    container.innerHTML += `
      <div class="movie">
        <img src="${m.Poster}">
        <div class="info">
          <h3>${m.Title}</h3>
          <span>${m.Year}</span>
          <span>IMDb ⭐ ${m.imdbRating}</span>
        </div>
      </div>
    `;
  }
}

fetchMovies();
