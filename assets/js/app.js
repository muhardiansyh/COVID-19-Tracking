const SEARCH_BAR = document.querySelector('.search_bar');
const SEARCH_BUTTON = document.querySelector('.search_btn');
const CARD_PARENT = document.querySelector('.card_body');
const LOADING = document.querySelector('.loading');

// Ketika Search di tekan Enter
SEARCH_BAR.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
        prosesData();
    }
})

// Ketika Search button di klik
SEARCH_BUTTON.addEventListener('click', () => {
    prosesData();
})

// Proses mengambil dan konfigurasi data dari API
async function prosesData(){
    const negara = SEARCH_BAR.value;
    const data = await ambilData(negara);
    hideLoading();
    if(data === undefined){
        alert('Data tidak di temukan')
    }
    if(data.cases.new === null){
        data.cases.new = 0;
    }
    console.log(data);
    CARD_PARENT.innerHTML = tampilData(data);
}

// Konfigurasi menampilkan animasi Loading
function showLoading(){
    LOADING.classList.add('show-loading');
}

function hideLoading(){
    LOADING.classList.remove('show-loading');
}

// Memanggil API dengan fetch
function ambilData(negara){
    showLoading();
    return fetch('https://covid-193.p.rapidapi.com/statistics?country=' + negara, {
        'method': 'GET',
        'headers': {
            'X-RapidAPI-Key': '0bc826d0bemsh43eda3086c8f3d2p17ec9ejsnefce6166cd91',
            'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
        }
    })
    .then(response => response.json())
        .then(response => response.response[0])
        .catch(err => console.log(err))
}

// Menampilkan data API ke HTML
function tampilData(data){
    return`
        <div class="content card_active_cases">
            <div class="body">
                <div class="content_header">
                    <h5>Active Cases</h5>
                </div>
                <div class="content_body">
                    <p>${data.cases.active}</p>
                </div>
            </div>
        </div>
        <div class="content card_new_cases">
            <div class="body">
                <div class="content_header">
                    <h5>New Cases</h5>
                </div>
                <div class="content_body">
                    <p>${data.cases.new}</p>
                </div>
            </div>
        </div>
        <div class="content card_recovered_cases">
            <div class="body">
                <div class="content_header">
                    <h5>Recovered Cases</h5>
                </div>
                <div class="content_body">
                    <p>${data.cases.recovered}</p>
                </div>
            </div>
        </div>
        <div class="content card_total_cases">
            <div class="body">
                <div class="content_header">
                    <h5>Total Cases</h5>
                </div>
                <div class="content_body">
                    <p>${data.cases.total}</p>
                </div>
            </div>
        </div>
        <div class="content card_total_deaths">
            <div class="body">
                <div class="content_header">
                    <h5>Total Deaths</h5>
                </div>
                <div class="content_body">
                    <p>${data.deaths.total}</p>
                </div>
            </div>
        </div>
        <div class="content card_total_test">
            <div class="body">
                <div class="content_header">
                    <h5>Total Test</h5>
                </div>
                <div class="content_body">
                    <p>${data.tests.total}</p>
                </div>
            </div>
        </div>`
}


