let data = null;

const dataPromise = fetch("./data.json").then((res) => {return res.json()}).then(function(data) {return data.record});
const dataPromise3 = dataPromise.then((value) => {
    data = value;
})
const dataLoaded = await dataPromise3;

const dailyButton = document.querySelector('#daily-button');
const weeklyButton = document.querySelector('#weekly-button');
const monthlyButton = document.querySelector('#monthly-button');
const buttons = [dailyButton, weeklyButton, monthlyButton];

let selectedTimeframe = 'Weekly'
let selectedButton = null;

buttons.forEach((x) => {
    if(x.id.split('-button')[0].toLowerCase() === selectedTimeframe.toLowerCase()) {
        x.style.color = '#fafafa';
        return true;
    }
});

function select() {
    selectedButton = this;
    selectedTimeframe = this.id.split('-button')[0];
    selectedTimeframe = selectedTimeframe[0].toUpperCase() + selectedTimeframe.slice(1);
    buttons.forEach(x => {x.style.removeProperty('color')});
    selectedButton.style.color = '#fafafa';
    getData();
}

buttons.forEach(element => {
    element.addEventListener('click', select);
})

const abbreviations = {
    'Daily': 'Yesterday',
    'Weekly': 'Last Week',
    'Monthly': 'Last Month',
}

function getData() {
    data.forEach(element => {
        const title = element.title.toLowerCase().replace(/\s+/g, '')+'-card';
        const cards = document.querySelectorAll('.card');
        const previousPrefix = abbreviations[selectedTimeframe];
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].id === title) {
                const card = cards[i];
                const timeframe = element.timeframes[selectedTimeframe.toLowerCase()];
                card.querySelector('.time-text').textContent = timeframe.current + 'hrs';
                card.querySelector('.last-timeframe-text').textContent = previousPrefix + ' - ' + timeframe.previous + 'hrs';
            }
        }
    });
}
getData();

