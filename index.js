const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');


const githubData = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];
fetch(githubData)  //fetch itself returns a promise it doesnot returns the data
    .then(blob => blob.json()) //having a json even it returns us a promise ,so using  another .then which gives us the data
    .then(data => cities.push(...data));  //spread is used to change the array into individual arguments and it will give us proper cities
console.log(cities)

function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        // here we need to figure out if the city or state matches what was searched
        const regex = new RegExp(wordToMatch, 'gi'); //here the regExp takes two arguments ,wordToMatch is what ever the user passes and  in second argument g will be the global which search entire string for specific word serached and i is insensitive 
        return place.city.match(regex) || place.state.match(regex)
    });
}

// creating a display function 
function displayMatches() {
    console.log(this.value)
    const matchArray = findMatches(this.value, cities);
    console.log(matchArray)
    const html = matchArray.map(place => {
        return `
        <li>
          <span>${place.city}, ${place.state}</span>
        </li>
      `;
    }).join('') //map actually returns us an array ,if we call join it will turn array into one big string
    console.log(html)
    suggestions.innerHTML = html;
}

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
