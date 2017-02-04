const DashButton = require('dash-button');
//const DASH_BUTTON_MAC_ADDRESS = 'a4:d1:8c:e5:bb:16'; // 小文字で。
const DASH_BUTTON_MAC_ADDRESS = 'f0:27:2d:8d:ad:e1'; // 小文字で。
//const DASH_BUTTON_MAC_ADDRESS = '68:54:fd:6e:74:32'; // 小文字で。
 
let button = new DashButton(DASH_BUTTON_MAC_ADDRESS);

console.log('listen...');

let subscription = button.addListener( () => {
  console.log('Clicked..'+ new Date());
  getApi();
});

var request = require('request');
var options = {
  uri: "http://state-api.au-syd.mybluemix.net/state/clickableA",
  headers: {
    "Content-type": "application/json",
  },
};
console.log(options);

function getApi() {
  request.get(options, function(error, response, body){
  if (!error && response.statusCode == 200) {
      console.log(body);
    } else {
      console.log('error: '+ response.statusCode);
    }
});
}
