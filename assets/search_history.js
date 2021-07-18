const clearSearch = document.querySelector(".clearHistory");
const CitySearchList = document.querySelector('.searchHistory');

//Clear search history
clearSearch.addEventListener('click', clearBtnClick)
function clearBtnClick() {
    localStorage.clear();
    location.reload();

};

//Display search history

const newCitiesSearched = JSON.parse(localStorage.getItem('newCities'))
if (newCitiesSearched) {

    for (let i = 0; i < newCitiesSearched.length; i++) {

        let createList = document.createElement("li");
        // createList.setAttribute("class", "button");
        createList.textContent = newCitiesSearched[i].cityInput;
        CitySearchList.appendChild(createList);
    }
}
