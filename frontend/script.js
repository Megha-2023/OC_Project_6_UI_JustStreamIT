const BASE_URL = "http://localhost:8000/api/v1/titles"

async function getBestMovie() {
  try {
  const response = await axios.get("http://localhost:8000/api/v1/titles/499549");
  const title = response.data.title;
  console.log('Movie title:', title);
  return title
} catch(errors) {
  console.error(errors);
}
};

const best_movie = document.getElementById("best-movie")
best_movie.innerHTML = getBestMovie();