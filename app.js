const allPlayers = () => {
    document.getElementById('player-container').innerHTML = ''
    document.getElementById('spinner').style.display = "block"
    const searchValue = document.getElementById('search-box').value;
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=Danny%20Welbeckhttps://www.thesportsdb.com/api/v1/json/{APIKEY}/searchplayers.php?t={TeamName}&p=${searchValue}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.player == null) {
                document.getElementById('spinner').style.display = "block"
            }
            else {
                showPlayerDetails(data.player)
                document.getElementById('spinner').style.display = 'none'
            }
        })




}

const showPlayerDetails = (players) => {
    // if (players) {
    //     document.getElementById('spinner').style.display = "none"
    // }

    const parent = document.getElementById("player-container");
    for (const player of players) {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card border p-5 w-100">
            <div class="pro-pic w-50">
                <img class="w-50" src="${player.strThumb}" alt="">
            </div>
            <h2>Name:${player.strPlayer}</h2>
            <h4>Country:${player.strNationality}</h4>
            <p>Description:</p>
            <div class="allButton">
                <button class="btn btn-danger">Delete</button>
                <button onclick="details('${player.idPlayer}')" class="btn btn-success">Details</button>
            </div>
        </div>
        `
        parent.appendChild(div)
        // console.log(player)
    }
    // document.getElementById('spinner').style.display = 'block'


};
const details = (info) => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${info}`;
    fetch(url)
        .then(res => res.json())
        .then(data => setDetaills(data.players[0]))
}

const setDetaills = (info) => {
    if (info.strGender == 'Male') {
        document.getElementById('male').style.display = 'block'
        document.getElementById('female').style.display = 'none'
    }
    else {
        document.getElementById('male').style.display = 'none'
        document.getElementById('female').style.display = 'block'
    }
    document.getElementById('details-container').innerHTML = `<div>
   <img class="w-50" src="" alt="">
   <h2>Name:${info.strPlayer}</h2>
   </div>`
}
