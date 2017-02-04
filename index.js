const DashButton = require('dash-button');
const request = require('request');

const FINISH_DASH_MAC_ADDRESS = 'f0:27:2d:8d:ad:e1';
const RENOA_DASH_MAC_ADDRESS = '88:71:e5:d9:8b:9a';
const FABREEZ_DASH_MAC_ADDRESS = '34:d2:70:d6:f5:d6';
const WILKIN_DASH_MAC_ADDRESS = '68:54:fd:3b:d5:09';

let buttonA1 = new DashButton(FINISH_DASH_MAC_ADDRESS);
let buttonA2 = new DashButton(RENOA_DASH_MAC_ADDRESS);
let buttonB1 = new DashButton(FABREEZ_DASH_MAC_ADDRESS);
let buttonB2 = new DashButton(WILKIN_DASH_MAC_ADDRESS);

console.log('listen...');

buttonA1.addListener( () => {
  console.log('Clicked..A1'+ new Date());
  getApiA();
});

buttonA2.addListener( () => {
    console.log('Clicked..A2'+ new Date());
    getApiA();
});

buttonB1.addListener( () => {
    console.log('Clicked..B1'+ new Date());
    getApiB();
});

buttonB2.addListener( () => {
      console.log('Clicked..B2'+ new Date());
      getApiB();
});

var optionsA = {
  uri: "http://state-api.au-syd.mybluemix.net/state/clickableA",
  headers: {
    "Content-type": "application/json",
  },
};

var optionsB = {
    uri: "http://state-api.au-syd.mybluemix.net/state/clickableB",
    headers: {
          "Content-type": "application/json",
        },
};

function getApiA() {
  request.get(options, function(error, response, body){
    if (body.match(/true/)) {
      console.log(body);
    } else {
      console.log('error: '+ response.statusCode);
    }
});

function getApiB() {
  request.get(options, function(error, response, body){
    if (body.match(/true/)) {
          console.log(body);
        } else {
          console.log('error: '+ response.statusCode);
        }
  });
}}
