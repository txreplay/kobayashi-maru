const baseURL = 'https://newsapi.org/v2';
const apiKey = 'apiKey=16372acce6164cdeb03182ef1912b87c';
const $newsSelector = <HTMLInputElement>document.getElementById('news-selector');
const $main = <HTMLInputElement>document.querySelector('main');
const defaultSource = 'liberation';

function getAPI(endpoint, params='') {
    let res = undefined;
    let fullURL = `${baseURL}/${endpoint}?${apiKey}&${params}`;


    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange  = function() {
        if (this.readyState == 4 && this.status == 200) {
            res = JSON.parse(this.responseText);
        }
    };
    xmlhttp.open("GET", fullURL, false);
    xmlhttp.send();
    return res;
}

async function getAllSources() {
    const res = await fetch(`${baseURL}/sources?${apiKey}&country=fr`);
    return await res.json();

    // return getAPI('sources', 'country=fr');
}

async function getNewsFromSource(source) {
    const res = await fetch(`${baseURL}/everything?${apiKey}&sources=${source}`);
    return await res.json();

    // return getAPI('everything', `sources=${source}`);
}

async function putSourcesInSelect(sources) {
    for (let i = 0; i < await sources.sources.length; i++) {
        let source = await sources.sources[i];
        if (source) {
            $newsSelector.innerHTML += '<option value="' + source['id'] + '">' + source['name'] + '</option>';
        }
     }
}

async function changeSource() {
    $main.innerHTML = '';
    const articles = await getNewsFromSource($newsSelector.value);
    await displayArticles(await articles);
}

async function displayArticles(articles) {
    for (let i = 0; i < await articles.articles.length - 1; i++) {
        const article = await articles.articles[i];

        $main.innerHTML += `
        <article>
            <figure>
                <figcaption><h2>${article.title}</h2></figcaption>
                <img src="${article.urlToImage}" alt="Image de l'article de : ${article.source.name}">
            </figure>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank" class="cta" rel="noreferrer">Lire la suite</a>
        </article>
    `;
    }
}

window.addEventListener('load', async () => {
    console.log('Load ok');
    $newsSelector.onchange = async function() { await changeSource() };

    const sources = await getAllSources();
    await putSourcesInSelect(await sources);
    $newsSelector.value = defaultSource;

    const defaultArticles = await getNewsFromSource(defaultSource);
    await displayArticles(await defaultArticles);

    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('./service-worker.js');
            console.log('Service Registered');
        } catch (error) {
            console.log('Service Registration failed...');
        }
    }
});