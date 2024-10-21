const fetchQuotesButton = document.getElementById('fetchQuotes');
const clearQuotesButton = document.getElementById('clearQuotes');
const searchInput = document.getElementById('searchInput');
const quoteContainer = document.getElementById('quoteContainer');

let quotes = [];

const characterImages = {
    "Walter White": "https://www.mundodeportivo.com/alfabeta/hero/2023/06/walter-white-breaking-bad.jpg?width=768&aspect_ratio=16:9&format=nowebp",
    "Jesse Pinkman": "https://imgs.search.brave.com/nyL6QWl3WNa5-iCRwjNi6VUsfFlM89Oh3gPeoHasdkM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMud2lraWEubm9j/b29raWUubmV0L2Zp/Y2Npb24tc2luLWxp/bWl0ZXMvaW1hZ2Vz/LzcvNzgvSmVzc2Vf/UGlua21hbl8xLmpw/Zy9yZXZpc2lvbi9s/YXRlc3Qvc2NhbGUt/dG8td2lkdGgtZG93/bi83MDA_Y2I9MjAy/MTA4MTIyMTUzMzMm/cGF0aC1wcmVmaXg9/ZXM",
    "Skyler White": "https://imgs.search.brave.com/Y7bKctuMB_3__wybPVAmzXi_PnN5L6yF-UqsJffPY-w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/bW9zLmNtcy5mdXR1/cmVjZG4ubmV0L3BU/aWtSUFRXR1ZaNHJX/dnFGdVNTZWktMzIw/LTgwLmpwZw",
    "Hank Schrader": "https://imgs.search.brave.com/ViwKcLE9JhpRkZC_R3KswDsKiJOyYOwYwrPgJdWWXuY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1QlpEVmhNRGxp/TkdNdE1tVmlNaTAw/TURNd0xUazVZemN0/TkRnMU5HRXhOV0ky/WkRRMVhrRXlYa0Zx/Y0djQC5qcGc",
    "Saul Goodman": "https://imgs.search.brave.com/yZykuucXbVjl0_0wL89Br4O2DCrk2oCoKdfMk1MBkOY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbmRp/ZWhveS5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjQvMTAv/RGlzZW5vLXNpbi10/aXR1bG8tMjAyNC0x/MC0xOFQxMzA3NTcu/NDIxLnBuZw",
    "Gustavo Fring": "https://imgs.search.brave.com/Du1VgKnVwA3RkkoSuLwLF5Vq-vCvU1x2W_TwKI-vh7k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/YWxmYWJldGFqdWVn/YS5jb20vYWxmYWJl/dGFqdWVnYS8yMDI0/LzAzL2d1cy1mcmlu/Zy0yLndlYnA",
    "Mike Ehrmantraut": "https://imgs.search.brave.com/wTUNz_O3vDZbm0LYj5fD0RwII5RuM8UsJ_gR1eMrr2E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZXNp/emVyLmdsYW5hY2lv/bi5jb20vcmVzaXpl/ci92Mi9taWtlLXNl/LXZvbHZpby11bi1n/cmFuLWFwb3lvLWVu/LWxhLXNlcmllLWNh/cHR1cmEtM05SSVFL/QkJENUNSVEFNV0ZB/T0kzSFEyTTQuanBn/P2F1dGg9YTc5ZDhk/ODJmZmRhZDU3ZDU2/MzdhYTViZTI3YmJl/MjhmNTJkMTBmZTk5/NTVmN2IzZjMyNTlm/YmJjOTA5YjU5YiZ3/aWR0aD00MjAmaGVp/Z2h0PTI2NCZxdWFs/aXR5PTcwJnNtYXJ0/PXRydWU",
    "Tio Salamanca": "https://imgs.search.brave.com/DMfyo3MVR1snSTUmBcBPhVFxz6ub2aWh0m47IZkp-6c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLnNyY2RuLmNv/bS93b3JkcHJlc3Mv/d3AtY29udGVudC91/cGxvYWRzLzIwMTkv/MDcvQnJlYWtpbmct/QmFkLUhlY3Rvci1T/YWxhbWFuY2EtLmpw/Zw",
    "The fly": "https://imgs.search.brave.com/g8IlA9ECN6frlKuU8-jBG1tEtHP0oJ19SsFXReQoy6Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zZXJp/ZW1hbmlhYy5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMTQv/MDEvbGEtbW9zY2Et/ZGUtYnJlYWtpbmct/YmFkLTEwMjR4NTc2/LmpwZw",
    "Marie Schrader": "https://imgs.search.brave.com/4BgOjKi3qrUDBBbIre7FbYqr0qYZuWo2svKBKxwqm6Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLnNyY2RuLmNv/bS93b3JkcHJlc3Mv/d3AtY29udGVudC91/cGxvYWRzLzIwMjEv/MDEvYnJlYWtpbmct/YmFkLW1hcmllLXNj/aHJhZGVyLUNyb3Bw/ZWQuanBn",
    "Walter White Jr.": "https://imgs.search.brave.com/qH4an_ERBBRwTHixjsWrrItLlYv027Lgvl-6cKFXDbs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9lbGNv/bWVyY2lvLnBlL3Jl/c2l6ZXIvTi1OQmdJ/WFR5czdaU0M4ZUh2/X0h0c1Y5c2pvPS82/NDB4MC9zbWFydC9m/aWx0ZXJzOmZvcm1h/dChqcGVnKTpxdWFs/aXR5KDc1KS9hcmMt/YW5nbGVyZmlzaC1h/cmMyLXByb2QtZWxj/b21lcmNpby5zMy5h/bWF6b25hd3MuY29t/L3B1YmxpYy9CTkxQ/QjVSNkVaRkxSTVVQ/SVZESDdGWEtBSS5q/cGc"
};

fetchQuotesButton.addEventListener('click', fetchQuotes);
clearQuotesButton.addEventListener('click', clearQuotes);
searchInput.addEventListener('input', filterQuotes);

async function fetchQuotes() {
    quoteContainer.innerHTML = '<p>Cargando, perra!</p>';

    try {
        const response = await fetch('https://api.breakingbadquotes.xyz/v1/quotes/15');
        quotes = await response.json();
        displayQuotes(quotes);
    } catch (error) {
        console.error('Error al obtener las citas:', error);
        quoteContainer.innerHTML = '<p class="error">Error al obtener las citas. Por favor, intenta de nuevo.</p>';
    }
}

function displayQuotes(quotesToDisplay) {
    quoteContainer.innerHTML = '';
    quotesToDisplay.forEach(quote => {
        const card = document.createElement('div');
        card.className = 'quote-card';
        const imageUrl = characterImages[quote.author] || '/api/placeholder/150/150';
        card.innerHTML = `
            <img src="${imageUrl}" alt="${quote.author}" class="character-image">
            <div class="quote-content">
                <p class="quote-text">"${quote.quote}"</p>
                <p class="quote-author">- ${quote.author}</p>
            </div>
        `;
        quoteContainer.appendChild(card);
    });
}

function clearQuotes() {
    quoteContainer.innerHTML = '';
    quotes = [];
    searchInput.value = '';
}

function filterQuotes() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredQuotes = quotes.filter(quote => 
        quote.quote.toLowerCase().includes(searchTerm) ||
        quote.author.toLowerCase().includes(searchTerm)
    );
    displayQuotes(filteredQuotes);
}