//astrongomy api working
//what3words api working
//google maps working
//styling...

let applicationSecret ={your api key}
let applicationId = "68b64577-8d12-4b2b-ac97-9edc74b43ef9";

let userData = {
  latitude: 0,
  longitude: 0,
  date: "2014-10-25",
};
function displayInput(event) {
  console.log(event);
}
const hash = btoa(`${applicationId}:${applicationSecret}`);
const astronomyApi = {
  baseURL: "https://api.astronomyapi.com/api/v2/studio/star-chart",
  headers: { Authorization: `Basic ${hash}` },
  body: {},
};
astronomyApi.body = {
  style: "navy",
  observer: {
    latitude: userData.latitude,
    longitude: userData.longitude,
    date: userData.date,
  },
  view: {
    type: "area",
    parameters: {
      position: {
        equatorial: {
          rightAscension: 14,
          declination: -45,
        },
      },
      zoom: 4,
    },
  },
};

async function getAstronomyData() {
  if (userData.latitude && userData.longitude != 0) {
    fetch(astronomyApi.baseURL, {
      method: "POST",
      headers: astronomyApi.headers,
      body: JSON.stringify(astronomyApi.body),
    })
      .then((response) => response.json())
      .then((data) => {
        let astroChart = data.data.imageUrl;
        document.getElementById("astro-chart").src = astroChart;
      });
    while (document.getElementById("astro-chart").src == "") {
      document.getElementById("astro-chart").src =
        "https://i.imgur.com/qkKy8.gif";
    }
  }
}

async function get3Words() {
  if (userData.latitude && userData.longitude != 0) {
    let baseURL = `https://api.what3words.com/v3/convert-to-3wa?coordinates=${userData.latitude}%2C${userData.longitude}&key=${APIKEY}`;
    fetch(baseURL)
      .then((response) => response.json())
      .then((data) => {
        let threeWords = data.words;
        console.log(threeWords);
        document.getElementById("3words").innerHTML = threeWords;
      });
  }
}

function getLocation() {
  userData.latitude = JSON.parse(document.getElementById("cityLat").value);
  userData.longitude = JSON.parse(document.getElementById("cityLng").value);
  updateDate();
  getAstronomyData();
  get3Words();
  prettifyPage();
  console.log(userData);
}

async function updateDate() {
  let date = document.getElementById("date-field").value;
  date = date.split("/");
  userData.date = `${date[0]}-${date[1]}-${date[2]}`;
}

function prettifyPage() {
  document.getElementById("search-box").style.display = "none";
}
