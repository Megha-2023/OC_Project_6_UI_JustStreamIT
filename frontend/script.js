
async function main(){
  
  
  bestmovie_page1 = await axios.get("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score");
  showBestMovie(bestmovie_page1.data.results[0]);

  bestmovie_page2 = await axios.get("http://localhost:8000/api/v1/titles/?page=2&sort_by=-imdb_score");
  bestmovie_page3 = await axios.get("http://localhost:8000/api/v1/titles/?page=3&sort_by=-imdb_score");
  topMovieArray = getDataArray(bestmovie_page1, bestmovie_page2, bestmovie_page3);
  movieCarousel(1, topMovieArray, 0);
  
  cat1Movie_page1 = await axios.get("http://localhost:8000/api/v1/titles/?genre_contains=Adventure&sort_by=-imdb_score");
  cat1Movie_page2 = await axios.get("http://localhost:8000/api/v1/titles/?genre_contains=Adventure&page=2&sort_by=-imdb_score");
  cat1Movie_page3 = await axios.get("http://localhost:8000/api/v1/titles/?genre_contains=Adventure&page=3&sort_by=-imdb_score");
  cat1MovieArray = getDataArray(cat1Movie_page1, cat1Movie_page2, cat1Movie_page3);
  movieCarousel(0, cat1MovieArray, 1);

  cat2Movie_page1 = await axios.get("http://localhost:8000/api/v1/titles/?genre_contains=Crime&sort_by=-imdb_score");
  cat2Movie_page2 = await axios.get("http://localhost:8000/api/v1/titles/?genre_contains=Crime&page=2&sort_by=-imdb_score");
  cat2Movie_page3 = await axios.get("http://localhost:8000/api/v1/titles/?genre_contains=Crime&page=3&sort_by=-imdb_score");
  cat2MovieArray = getDataArray(cat2Movie_page1, cat2Movie_page2, cat2Movie_page3);
  movieCarousel(0, cat2MovieArray, 2);

  cat3Movie_page1 = await axios.get("http://localhost:8000/api/v1/titles/?genre_contains=Music&sort_by=-imdb_score");
  cat3Movie_page2 = await axios.get("http://localhost:8000/api/v1/titles/?genre_contains=Music&page=2&sort_by=-imdb_score");
  cat3Movie_page3 = await axios.get("http://localhost:8000/api/v1/titles/?genre_contains=Music&page=3&sort_by=-imdb_score");
  cat3MovieArray = getDataArray(cat3Movie_page1, cat3Movie_page2, cat3Movie_page3);
  movieCarousel(0, cat3MovieArray, 3);
  

  //cat2MovieArray = getDataArray("http://localhost:8000/api/v1/titles/?genre_contains=Animation&sort_by=-imdb_score", "Animation");
  //movieCarousel(0, cat2MovieArray, 2);

  //cat3MovieArray = getDataArray("http://localhost:8000/api/v1/titles/?genre_contains=Music&sort_by=-imdb_score", "Music");
  //movieCarousel(0, cat3MovieArray, 3);

}

function getDataArray(response1, response2, response3){
  try{
  // Make array of movies from page 1
  let movieArray = [];
  for(let i in response1.data.results)
    movieArray.push(response1.data.results[i]); 
  
  for(let i in response2.data.results)
    movieArray.push(response2.data.results[i]); 
  
  for(let i in response3.data.results)
    movieArray.push(response3.data.results[i]); 
  return movieArray;
}
catch(errors)
{
  console.log(errors);
  return false;
}
}

function showBestMovie(bestMovieData) {
  try{
  str = ' ' + bestMovieData.title + ' ';
  img_url = '' + bestMovieData.image_url + '';

  const bestMovie_title = document.querySelector("p.best-movie-title");
  bestMovie_title.innerHTML = bestMovieData.title;
  const bestMovie_details = document.querySelector("p.best-movie-genre");
  bestMovie_details.innerHTML = "Genres: " + bestMovieData.genres + "<br> Year: " + bestMovieData.year + "<br> IMDB SCORE: " + bestMovieData.imdb_score;
  document.querySelector("#best-movie-img").src = img_url;

  var btn = document.getElementById("more-details");
  //btn.onclick = show_modal_window(bestMovieData.id, true); 
  //get_movie_details(bestMovieData.id);
  //show_modal_window(bestMovieData.id);
  }
  catch (errors) {
    console.error(errors);
  }
}

async function movieCarousel(start, movieData, catNumber) {
  
  count = start + 6;
  document.querySelector(`.category${catNumber}_movies`).innerHTML = "";
  for (let i=start; i<=count; i++){
    
    if (checkImg(movieData[i].image_url)){  
      url = movieData[i].image_url;
      alt = "";
      id = movieData[i].id;
      title = movieData[i].title;
      const movies=`<li id=${id} onclick="show_modal_window(${id}, ${true})"><img id=${id} src="${url}" alt="${alt}"> <h2>${title}</h2>
      </li>`;
      document.querySelector(`.category${catNumber}_movies`).innerHTML += movies;
    }
  }
    slider(start, movieData, catNumber); 
}

function slider(prevStartIndex, movieData, catNumber){
  lastIndex = movieData.length;
  
  let leftbtn = document.getElementById(`Category${catNumber}-btn-left`)
  
  leftbtn.addEventListener("click", () => {
    if (prevStartIndex <= 1){
      if (catNumber == 0){
        prevStartIndex = 2;
      }
      else
        prevStartIndex = 1;  
    }
    movieCarousel(prevStartIndex-1, movieData, catNumber);
  });
  
  document.getElementById(`Category${catNumber}-btn-right`).addEventListener("click", () => {
    if (prevStartIndex == (lastIndex-7))
      prevStartIndex = 0;
    movieCarousel(prevStartIndex+1, movieData, catNumber);
  });
}

async function checkImg(url) {
  response = await fetch(url);
  if (response.status === 404 || !response)
  {
    console.log("Link doen't exist on API:", error);
    return false;
  }
  return true;
}

function get_movie_details(movieID) {
  movie_url = "http://localhost:8000/api/v1/titles/" + movieID;
  axios.get(movie_url)
  .then((res) => {show_modal_window(res.data)})
  .catch((err) => console.log(err))
}

function show_modal_window(movieID, visible){
  movie_url = "http://localhost:8000/api/v1/titles/" + movieID;
  axios.get(movie_url)
  .then((res) => {
    var modal = document.getElementById("movie-modal");
    //var btn = document.getElementById("more-details");
    var close_btn = document.getElementById("close");
    const description = document.getElementById("description");
    //descr_str = "<tr><td>Movie: </td><td>" + res.data.title +"</td><td>";
    descr_str = ("<tr><td>Movie: </td><td>" + res.data.title + "</td><td><img src=" + res.data.image_url + "></img></td>" +
                "<tr><td>Actors: </td><td>" + res.data.actors + "</td>" +
                "<tr><td>Director: </td><td>" + res.data.directors + "</td>" +
                "<tr><td>Release date: </td><td>" + res.data.date_published + "</td>" +
                "<tr><td>Duration: </td><td>" + res.data.duration + "</td>" +
                "<tr><td>Box Office Result: </td><td>" + res.data.rated + "</td>" +
                "<tr><td>Country of Origin: </td><td>" + res.data.countries + "</td>" +
                "<tr><td>Description: </td><td>" + res.data.description + "</td>");
  
  description.innerHTML = descr_str
  description.style.border = "2px grey solid"
  if (visible == true)
    modal.style.display = "block";
  
    close_btn.onclick = function(){
    modal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}
)
  .catch((err) => console.log(err))
}



main()
