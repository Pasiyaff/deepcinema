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

/*
  Each genre has:
  - Modern hits
  - Popular favorites
  - 5–6 REAL classics
*/
const genreSeeds = {
  action: [
    "John Wick","Mad Max Fury Road","Gladiator","Die Hard","The Dark Knight",
    "Terminator 2","Lethal Weapon","Rambo","Predator","Commando"
  ],

  adventure: [
    "Indiana Jones","Jurassic Park","Pirates of the Caribbean","Avatar","The Mummy",
    "King Kong","National Treasure","Jumanji","The Goonies","Lawrence of Arabia"
  ],

  comedy: [
    "Superbad","The Hangover","Step Brothers","Anchorman","The Mask",
    "Dumb and Dumber","Groundhog Day","Airplane","Monty Python","Some Like It Hot"
  ],

  drama: [
    "The Shawshank Redemption","Forrest Gump","The Godfather","Fight Club","Joker",
    "One Flew Over the Cuckoo's Nest","12 Angry Men","Schindler's List","Taxi Driver","Rocky"
  ],

  horror: [
    "The Conjuring","It","Hereditary","Insidious","A Quiet Place",
    "The Exorcist","Halloween","Psycho","The Shining","Nightmare on Elm Street"
  ],

  romance: [
    "Titanic","La La Land","The Notebook","Before Sunrise","Her",
    "Casablanca","Roman Holiday","Gone with the Wind","Pretty Woman","Notting Hill"
  ],

  thriller: [
    "Se7en","Gone Girl","Zodiac","Prisoners","Shutter Island",
    "Heat","The Silence of the Lambs","Chinatown","Rear Window","Cape Fear"
  ],

  scifi: [
    "Inception","Interstellar","The Matrix","Blade Runner","Arrival",
    "Alien","2001 A Space Odyssey","Terminator","E.T.","Close Encounters"
  ],

  fantasy: [
    "The Lord of the Rings","Harry Potter","The Hobbit","Pan's Labyrinth","Stardust",
    "Willow","Legend","The NeverEnding Story","Excalibur","Clash of the Titans"
  ],

  animation: [
    "Toy Story","Up","Inside Out","Frozen","Spider-Man Into the Spider-Verse",
    "The Lion King","Beauty and the Beast","Aladdin","Spirited Away","Snow White"
  ],

  war: [
    "Saving Private Ryan","1917","Dunkirk","Fury","Hacksaw Ridge",
    "Apocalypse Now","Full Metal Jacket","Platoon","The Bridge on the River Kwai","Patton"
  ],

  western: [
    "Django Unchained","Unforgiven","True Grit","The Hateful Eight","3:10 to Yuma",
    "The Good the Bad and the Ugly","Once Upon a Time in the West","High Noon","Shane","Stagecoach"
  ]
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
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(seed)}&type=movie`
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
