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

/* GLOBAL SET – prevents reuse */
const usedIMDbIDs = new Set();

/* Keyword pools per genre */
const genreSeeds = {
  action: [
    "The Raid","Extraction","Dredd","Upgrade","Atomic Blonde",
    "Nobody","Equilibrium","Man on Fire","Ronin","Hardcore Henry"
  ],
  adventure: [
    "The Lost City of Z","Into the Wild","Everest","Master and Commander",
    "The Edge","Romancing the Stone","The Way Back","Journey to the Center of the Earth"
  ],
  comedy: [
    "Game Night","Palm Springs","The Nice Guys","Office Space",
    "Burn After Reading","Midnight Run","Trading Places","Dr Strangelove"
  ],
  drama: [
    "There Will Be Blood","Manchester by the Sea","Mystic River",
    "Blue Valentine","The Wrestler","Network","Dog Day Afternoon"
  ],
  horror: [
    "The Descent","It Follows","The Invitation","The Babadook",
    "Sinister","Rosemary's Baby","The Omen","Black Christmas"
  ],
  romance: [
    "Call Me by Your Name","Carol","Atonement","Before Sunset",
    "Moonstruck","The Apartment","Brief Encounter"
  ],
  thriller: [
    "Prisoners","Nightcrawler","Wind River","Enemy",
    "The Conversation","Blow Out","Body Heat","The Vanishing"
  ],
  scifi: [
    "Ex Machina","Moon","Gattaca","Looper",
    "Annihilation","Solaris","Primer","Dark City"
  ],
  fantasy: [
    "The Green Knight","Willow","Stardust","Legend",
    "Excalibur","Ladyhawke","The Fall"
  ],
  animation: [
    "The Iron Giant","Fantastic Mr Fox","Coraline",
    "Persepolis","Akira","Ghost in the Shell","Wolfwalkers"
  ],
  war: [
    "Come and See","The Thin Red Line","Das Boot",
    "Paths of Glory","Letters from Iwo Jima","Army of Shadows"
  ],
  western: [
    "The Proposition","Dead Man","Slow West",
    "Hostiles","The Ox-Bow Incident","McCabe & Mrs Miller"
  ]
};

const params = new URLSearchParams(window.location.search);
const type = params.get("type");

document.getElementById("genreTitle").textContent =
  `Top 30 ${genreMap[type]} Movies`;

const container = document.getElementById("movies");

async function loadMovies() {
  let collected = [];

  for (let seed of genreSeeds[type]) {
    if (collected.length >= 30) break;

    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(seed)}&type=movie`
    );
    const data = await res.json();
    if (!data.Search) continue;

    for (let item of data.Search) {
      if (usedIMDbIDs.has(item.imdbID)) continue;

      usedIMDbIDs.add(item.imdbID);
      collected.push(item);

      if (collected.length >= 30) break;
    }
  }

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
