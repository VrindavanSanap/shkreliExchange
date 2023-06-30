// Made by Vrindavan Sanap
// All rights reserved


// run code on page load
window.onload = () => {
    tickers.map(ticker => {
        var newdiv = document.createElement("div");
        newdiv.id = ticker;
        newdiv.innerText = ticker
        document.body.appendChild(newdiv);
    })
}

const BASE = "https://generic709.herokuapp.com/stockc/"
function get_ticker_url(ticker) {
    return BASE + ticker;
}

setInterval(grab, 500);
var dict = {};
var count = 0

function update_display(ticker, price) {
    if (dict[ticker] == price) {
        return
    }
    let color = "black"
    if (price > dict[ticker]) { color = "green" }
    if (price == dict[ticker]) { color = "black" }
    if (price < dict[ticker]) { color = "red" }
    dict[ticker] = price;
    document.getElementById(ticker).innerText = ticker + ": " + dict[ticker]
    document.getElementById(ticker).style.color = color
}

async function grab() {
    for (const singleticker of tickers) {
        const response = await fetch(get_ticker_url(singleticker));
        let quote
        try { quote = await response.json(); }
        catch (e) { console.log(e); return; }
        count++;
        update_display(singleticker, parseFloat(quote.price))
    }
}
