// Selecting DOM elements
const searchForm = document.querySelector('form');  
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');

// Function to fetch movie information from the API
const getMovieInfo = async (movieName) => {
    try {
        const myapiKey = "fb827ae5";
        // Using HTTPS for secure API calls
        const url = `https://www.omdbapi.com/?apikey=${myapiKey}&t=${movieName}`; // API URL to fetch movie details
        
        // Show loading state while fetching data
        movieContainer.innerHTML = '<p>Loading...</p>';
        
        const response = await fetch(url); // Fetching the data from the API
        
        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Failed to fetch movie data');
        }
        
        const data = await response.json(); // Converting the response to JSON format
        
        // Check if the API found the movie
        if (data.Response === "False") {
            throw new Error(data.Error);
        }
        
        // Clear previous results and show new movie data
        movieContainer.innerHTML = '';
        showMovieData(data);
        
    } catch (error) {
        console.error('Error:', error.message);
        movieContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

// Function to display movie data in the DOM
const showMovieData = (data) => {
    movieContainer.innerHTML = ''; // Clear previous movie data
    movieContainer.classList.remove('nobackground'); // Add class to movie container
    // Destructuring the data object to get the required properties
    const {Title, imdbRating, Genre, Released, Actors, Runtime, Plot, Poster} = data; 
    
    // Creating a new div element to display movie details
    const movieElement = document.createElement('div'); 
    movieElement.classList.add('movie-info');
    
    // Adding movie title and rating
    movieElement.innerHTML = `
        <h2>${Title}</h2>
        <p><strong>Rating: &#11088;</strong>${imdbRating}</p>
        <p><strong>Released:</strong> ${Released}</p>
        <p><strong>Runtime:</strong> ${Runtime}</p>
        <p><strong>Actors:</strong> ${Actors}</p>
        <p><strong>Plot:</strong> ${Plot}</p>
    `;
    
    // Creating and adding genre tags
    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');
    
    Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.innerText = element.trim(); // Trim to remove any extra spaces
        movieGenreElement.appendChild(p);
    });
    
    movieElement.appendChild(movieGenreElement); // Appending the genre element to the movie element
    movieContainer.appendChild(movieElement); // Appending the movie element to the movie container   
    
    // Creating and adding poster
    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML = `<img src="${Poster}" alt="${Title} Poster">`;
    movieContainer.appendChild(moviePosterElement); // Appending the poster element to the movie container
}

// * function to display error message if movie not found
const showError = (message) => {
    movieContainer.innerHTML = `<h2>${message}</h2>`; // Show error message
    movieContainer.classList.add('nobackground'); // Add class to movie container
}

// Event listener for form submission
const handleForm = (e) =>{e.preventDefault(); // Prevent the form from submitting and refreshing the page
    
    const movieName = inputBox.value.trim(); // Get the trimmed movie name from the input box
    
    if(movieName !== '') {
        showError("wait motherfucker....."); // Clear any previous error message
        getMovieInfo(movieName);
        inputBox.value = ''; // Clear the input field after search
    }
    else{
        // movieContainer.innerHTML = '<h2> Hey MotherFucker Please enter a movie name </h2>'; // Show error message if input is empty
        // movieContainer.classList.add('nobackground');
        showError("enter movie name to get movie information");
    }}
searchForm.addEventListener('submit', handleForm);

