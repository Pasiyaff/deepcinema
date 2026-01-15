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
  RULES FOLLOWED:
  - No overused IMDb spam titles
  - No genre crossover pollution
  - Classics ≠ obvious top-10 IMDb
  - Cleaner + more variety
*/
const genreSeeds = {
  action: [
    "The Raid","Extraction","Nobody","Upgrade","Atomic Blonde",
    "Equilibrium","Dredd","Shoot Em Up","Ronin","Man on Fire"
  ],

  adventure: [
    "The Lost City of Z","King Solomon's Mines","Romancing the Stone","Journey to the Center of the Earth",
    "The Secret Life of Walter Mitty","The Edge","Everest","Into the Wild","The Way Back","Master and Commander"
  ],

  comedy: [
    "Game Night","The Nice Guys","Palm Springs","Office Space","Burn After Reading",
    "Dr Strangelove","Midnight Run","Trading Places","The Jerk","Tootsie"
  ],

  drama: [
    "There Will Be Blood","Manchester by the Sea","Mystic River","Blue Valentine","The Wrestler",
    "Dog Day Afternoon","Network","On the Waterfront","A Streetcar Named Desire","Ordinary People"
  ],

  horror: [
    "The Descent","Sinister","It Follows","The Invitation","The Babadook",
    "Rosemary's Baby","The Omen","Don't Look Now","Black Christmas","Invasion of the Body Snatchers"
  ],

  romance: [
    "Blue Valentine","Call Me by Your Name","Carol","Atonement","Before Sunset",
    "Brief Encounter","An Affair to Remember","The Apartment","Moonstruck","The English Patient"
  ],

  thriller: [
    "Prisoners","Nightcrawler","No Country for Old Men","Wind River","Enemy",
    "The Conversation","Blow Out","Body Heat","The Vanishing","Seconds"
  ],

  scifi: [
    "Ex Machina","Moon","Looper","Gattaca","Annihilation",
    "Solaris","THX 1138","Primer","Dark City","Brazil"
  ],

  fantasy: [
    "The Green Knight","Legend","Excalibur","Willow","Stardust",
    "Time Bandits","Ladyhawke","The Fall","Dragonslayer","Krull"
  ],

  animation: [
    "The Iron Giant","Fantastic Mr Fox","Coraline","Persepolis","Kubo and the Two Strings",
    "Akira","Ghost in the Shell","The Secret of NIMH","The Red Turtle","Wolfwalkers"
  ],

  war: [
    "Come and See","The Thin Red Line","Das Boot","Letters from Iwo Jima","Paths of Glory",
    "Cross of Iron","The Deer Hunter","Breaker Morant","Gallipoli","Army of Shadows"
  ],

  western: [
    "The Proposition","Dead Man","The Assassination of Jesse James","Slow West","Hostiles",
    "The Ox-Bow Incident","Johnny Guitar","The Shootist","Ride the High Country","McCabe & Mrs Miller"
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
