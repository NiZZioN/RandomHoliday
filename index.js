let holidayAPI = "https://date.nager.at/api/v3/PublicHolidays/";
let countrysrc = "https://date.nager.at/api/v3/AvailableCountries";
let year = "";
let country = "";
let countryCode = "";
let foundHoliday = [];
let outputtext;


async function getHolidays(newSrc){
    const response = await fetch(newSrc);
    const data = await response.json();
    return data;
}

async function getAvailableCountries(){
    const response = await fetch(countrysrc);
    const countries = await response.json();
    return countries;
}


function checkYear(year){
    let inputYear = year;
    console.log(inputYear);
    if(inputYear > 1949 && inputYear < 2022){
        year = inputYear;
    } else {
        console.log(inputYear + " Ist nicht zwischen 1949 und 2022!")
    }
}

const wrapper = document.querySelector('.formWrapper'),
form          = wrapper.querySelectorAll('.basisForm'),
submitInput   = form[0].querySelector('input[name="submit"]');

function getDataForm(e){
    e.preventDefault();
    var formData = new FormData(form[0]);
    country = formData.get("country");
    checkYear(formData.get("year"));
}

console.log(wrapper, form, submitInput);


document.addEventListener("DOMContentLoaded", async () => {
    let data = [];
    let countries = [];
    
    submitInput.addEventListener('click', getDataForm, false);
    console.log(year, country);
    let inputCountry = country;
    try {
        countries = await getAvailableCountries();
        for(let i=0; i < countries.length; i++){
            if(inputCountry === countries[i].name.toLowerCase()){
                console.log("It\'s a match");
                countryCode = countries[i].countryCode;
            }
        }
        if(countryCode == ""){
            console.log("Fehler, Land gibt es nicht!");
        }
 
        let newSrc = holidayAPI.concat(year+"/"+countryCode);
        data = await getHolidays(newSrc);
    } catch (e){
        console.log("Fehler!");
        console.log(e);
    }

    let len = data.length;
    let value = () => Math.floor(Math.random()*(len-1));
    foundHoliday = [data[value()].date,data[value()].name];
    outputtext = "Date: " + foundHoliday[0];
    outputtext2 = "Name: " + foundHoliday[1];

    
    var tag = document.createElement("p");
    var text = document.createTextNode(outputtext);
    tag.appendChild(text);
    var element = document.getElementById("new");
    element.appendChild(tag);

    var tag = document.createElement("p");
    var text = document.createTextNode(outputtext2);
    tag.appendChild(text);
    var element = document.getElementById("new");
    element.appendChild(tag);

})