
async function main(){
  //Main function sets initial display of the webpage
  
  //Retrieve best movie
  bestmovie_page1 = await axios.get("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score");
  showBestMovie(bestmovie_page1.data.results[0]);

  //Retrieve next pages of the movies as per imdb_score and merge into single array, pass array to make movie carousel
  bestmovie_page2 = await axios.get("http://localhost:8000/api/v1/titles/?page=2&sort_by=-imdb_score");
  bestmovie_page3 = await axios.get("http://localhost:8000/api/v1/titles/?page=3&sort_by=-imdb_score");
  topMovieArray = getDataArray(bestmovie_page1, bestmovie_page2, bestmovie_page3);
  movieCarousel(1, topMovieArray, 0);
  
  //Retrieve Adventure category movies form 3 pages and merge into single array, pass array to make movie carousel
  cat1Movie_page1 = await axios.get("http://localhost:8000/api/v1/titles/?genre_contains=Adventure&sort_by=-imdb_score");
  cat1Movie_page2 = await axios.get("http://localhost:8000/api/v1/titles/?genre_contains=Adventure&page=2&sort_by=-imdb_score");
  cat1Movie_page3 = await axios.get("http://localhost:8000/api/v1/titles/?genre_contains=Adventure&page=3&sort_by=-imdb_score");
  cat1MovieArray = getDataArray(cat1Movie_page1, cat1Movie_page2, cat1Movie_page3);
  movieCarousel(0, cat1MovieArray, 1);

  //Retrieve Crime category movies form 3 pages and merge into single array, pass array to make movie carousel
  cat2Movie_page1 = await axios.get("http://localhost:8000/api/v1/titles/?genre_contains=Crime&sort_by=-imdb_score");
  cat2Movie_page2 = await axios.get("http://localhost:8000/api/v1/titles/?genre_contains=Crime&page=2&sort_by=-imdb_score");
  cat2Movie_page3 = await axios.get("http://localhost:8000/api/v1/titles/?genre_contains=Crime&page=3&sort_by=-imdb_score");
  cat2MovieArray = getDataArray(cat2Movie_page1, cat2Movie_page2, cat2Movie_page3);
  movieCarousel(0, cat2MovieArray, 2);

  //Retrieve Music category movies form 3 pages and merge into single array, pass array to make movie carousel
  cat3Movie_page1 = await axios.get("http://localhost:8000/api/v1/titles/?genre_contains=Music&sort_by=-imdb_score");
  cat3Movie_page2 = await axios.get("http://localhost:8000/api/v1/titles/?genre_contains=Music&page=2&sort_by=-imdb_score");
  cat3Movie_page3 = await axios.get("http://localhost:8000/api/v1/titles/?genre_contains=Music&page=3&sort_by=-imdb_score");
  cat3MovieArray = getDataArray(cat3Movie_page1, cat3Movie_page2, cat3Movie_page3);
  movieCarousel(0, cat3MovieArray, 3);
}

function getDataArray(response1, response2, response3){ 
  // Function to merge 3 pages response into single array and returns the array
  try{
  // take movies from page 1 and push to the array
  let movieArray = [];
  for(let i in response1.data.results)
    movieArray.push(response1.data.results[i]); 

  // take movies from page 2 and push to the array
  for(let i in response2.data.results)
    movieArray.push(response2.data.results[i]); 
  
  // take movies from page 3 and push to the array
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
  // Function to display best movie as per imdb score
  try{
  str = ' ' + bestMovieData.title + ' ';
  img_url = 'url("' + bestMovieData.image_url + '")';

  const bestMovie = document.querySelector(".best-movie");
  bestMovie.style.backgroundImage = img_url;
  const bestMovie_title = document.querySelector(".best-movie-title");
  bestMovie_title.innerHTML = bestMovieData.title;
  const bestMovie_details = document.querySelector(".best-movie-details");
  bestMovie_details.innerHTML = "Genres: " + bestMovieData.genres + "<br> Year: " + bestMovieData.year + "<br> IMDB SCORE: " + bestMovieData.imdb_score;
  
  // Modal window opens while clicking on 'More detail' button
  show_modal_window(bestMovieData.id, false);
  document.getElementById("more-details").addEventListener("click", () => {
    show_modal_window(bestMovieData.id, true); 
  });
  }
  catch (errors) {
    console.error(errors);
  }
}

async function movieCarousel(start, movieData, catNumber) {
  // Function takes movie data from an array and makes carousel
  count = start + 6;
  document.querySelector(`.category${catNumber}_movies`).innerHTML = "";
  for (let i=start; i<=count; i++){
    // check for image url exists or not
    if (checkImg(movieData[i].image_url)){  
      url = movieData[i].image_url;
      alt = "";
      id = movieData[i].id;
      title = movieData[i].title;
      // make li tag with single movie image and title
      const movies=`<li id=${id} onclick="show_modal_window(${id}, ${true})"><img id=${id} src="${url}" alt="${alt}"> <h2>${title}</h2>
      </li>`;
      document.querySelector(`.category${catNumber}_movies`).innerHTML += movies;
    }
  }
  // call slider function with starting index, array and category number
  slider(start, movieData, catNumber); 
}

function slider(prevStartIndex, movieData, catNumber){
  // function refeshes movie carousel for the category if left or right button is pressed
  lastIndex = movieData.length;
  
  let leftbtn = document.getElementById(`Category${catNumber}-btn-left`)
  // if left button of carousel is pressed, previous index of the array is decremented.
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
  
  let rightbtn = document.getElementById(`Category${catNumber}-btn-right`);
  // if left button of carousel is pressed, previous index of the array is incremented.
  rightbtn.addEventListener("click", () => {
    if (prevStartIndex == (lastIndex-7))
      prevStartIndex = 0;
    movieCarousel(prevStartIndex+1, movieData, catNumber);
  });
}

async function checkImg(url) {
  // Function checks image url, if doesn't exist returns false
  response = await fetch(url);
  if (response.status === 404 || !response)
  {
    console.log("Link doen't exist on API:", error);
    return false;
  }
  return true;
}

function show_modal_window(movieID, visible){
  // Function to display modal window containing details of the movie passes as an ID in parameter
  movie_url = "http://localhost:8000/api/v1/titles/" + movieID;
  axios.get(movie_url)
  .then((res) => {
    var modal = document.getElementById("movie-modal");
    //var btn = document.getElementById("more-details");
    var close_btn = document.getElementById("close");
    const description = document.getElementById("description");
    //descr_str = "<tr><td>Movie: </td><td>" + res.data.title +"</td><td>";
    descr_str = ("<tr><td class='header'>Movie: </td><td>" + res.data.title + "</td><td><img src=" + res.data.image_url + "></img></td>" +
                "<tr><td class='header'>Actors: </td><td>" + res.data.actors + "</td>" +
                "<tr><td class='header'>Director: </td><td>" + res.data.directors + "</td>" +
                "<tr><td class='header'>Release date: </td><td>" + res.data.date_published + "</td>" +
                "<tr><td class='header'>Duration: </td><td>" + res.data.duration + "</td>" +
                "<tr><td class='header'>Box Office Result: </td><td>" + res.data.rated + "</td>" +
                "<tr><td class='header'>Country of Origin: </td><td>" + res.data.countries + "</td>" +
                "<tr><td class='header'>Description: </td><td>" + res.data.description + "</td>");
  
  description.innerHTML = descr_str
  description.style.border = "2px grey solid"
  if (visible == true)
    modal.style.display = "block";
  
  // close button on the modal window to close it
  close_btn.onclick = function(){
    modal.style.display = "none";
  }
  //if clicks anywhere on the window, modal window closes
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}
)
  .catch((err) => console.log(err))
}


// When web page loads, the main function is called first.
main()
