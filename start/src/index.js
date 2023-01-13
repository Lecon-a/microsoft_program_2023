//1

// form fields
const carbonForm = document.querySelector('.form-data');
const regionName = document.querySelector('.region-name');
const apiKey = document.querySelector('.api-key');
// results divs
const loading = document.querySelector('.loading');
const errors = document.querySelector('.errors');
const resultContainer = document.querySelector('.result-container');
const myRegion = document.querySelector('.my-region');
const carbonUsage = document.querySelector('.carbon-usage');
const fossilFuel = document.querySelector('.fossil-fuel');
const clearBtn = document.querySelector('.clear-btn');

//6
//call the API

//5
//set up user's api key and region

//4
// handle form submission
carbonForm.addEventListener('submit', (e) => handleSubmit(e));
clearBtn.addEventListener('click', (e) => handleReset(e));
init();

//3 initial checks
const init = () => {
    // check the localStorage for values
    const storedApiKey = localStorage.getItem('apiKey');
    const storedRegionName = localStorage.getItem('regionName');

    if (storedApiKey === null || storedRegionName === null) {
        // if there ain't keys/regions, show the form
        carbonForm.style.display = 'block';
        resultContainer.style.display = 'none';
        loading.style.display = 'none';
        clearBtn.style.display = 'none';
        errors.textContent = '';
    } else {
        // if there are keys/regions in localStorage, show results when they load
        displayCarbonUsage(storedApiKey, storedRegionName);
        resultContainer.style.display = 'none';
        carbonForm.style.display = 'none';
        clearBtn.style.display = 'block';
    }
}

const handleReset = (e) => {
    e.preventDefault();
    // clear the local storage for region name only
    localStorage.removeItem('regionName');
    init();
}

const handleSubmit = (e) => {
    e.preventDefault();
    setUpUser(apiKey.value, regionName.value);
}

const setUpUser = (k, r) => {
    localStorage.setItem('apiKey', k);
    localStorage.setItem('legionName', r);
    loading.style.display = 'block';
    errors.textContent = '';
    clearBtn.style.display = 'block';
    // make initial call
    displayCarbonUsage(k, r);
}
//2
// set listeners and start app
import axios from '../node_modules/axios';

async function displayCarbonUsage(apiKey, regionName) {
    const url = 'https://api.co2signal.com/v1/latest';
    const carbonIntensity = response.data.data.carbonIntensity;
    try {
        await axios
            .get(url, {
            params: {
                countryCode: regionName,
            },
            headers: {
                'auth-token': apiKey,
            }
        })
            .then(response => {
                //let CO2 = Math.floor(carbonIntensity);

                loading.style.display = 'none';
                carbonForm.style.display = 'none';
                myRegion.textContent = regionName;
                carbonUsage.textContent = `${Math.round(carbonIntensity)} grams (grams C02 emitted per kilowatt hour)`;
                fossilFuel.textContent = `${response.data.data.fossilFuelPercentage.toFixed(2)}% (percentage of fossil fuels used to generate electricity)`;
                resultContainer.style.display = 'block';
        })
    } catch (error) {
        console.log(error);  
        loading.style.display = 'none';
        resultContainer.style.display = 'none';
        errors.textContent = 'Sorry, we have no data for the region you have requested.';
    }
}
