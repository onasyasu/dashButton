version
```
pi@raspberrypi:~ $ npm -v
2.14.7
pi@raspberrypi:~ $ node -v
v4.2.1
```

```
sudo apt-get install libpcap-dev
sudo apt-get install npm
sudo apt-get -y install git
git clone https://github.com/maddox/dasher.git
cd dasher
npm install
 ./script/find_button
```

config.json
 ```
 {"buttons":[
  {
    "name": "get dash button",
    "address": "a6:d1:8c:5e:ad:64",
    "debug": false,
    "url": "http://state-api.au-syd.mybluemix.net/state/clickableA",
    "method": "GET"
  }
]}
```

sudo npm start

lib/dasher.js
```
var url = require('url')
var dashButton = require('node-dash-button');
var request = require('request')
var execSync = require('child_process').execSync;

function doLog(message) {
  console.log('[' + (new Date().toISOString()) + '] ' + message);
}

function DasherButton(button) {
  var options = {headers: button.headers, body: button.body, json: button.json, formData: button.formData}
  var debug = button.debug || false;
  this.dashButton = dashButton(button.address, button.interface, button.timeout, button.protocol)
  var buttonList = {};

  this.dashButton.on("detected", function() {

    if(!buttonList.hasOwnProperty(button.address)){
        buttonList[button.address] = 1;
    } else {
        buttonList[button.address]++;
    }
    doLog(button.name + " pressed. Count: " +  buttonList[button.address]);
    if (debug){
      doLog("Debug mode, skipping request.");
      console.log(button);
    } else {
      doRequest(button.url, button.method, options)
    }
  })

  doLog(button.name + " added.")
}

function doRequest(requestUrl, method, options, callback) {
  options = options || {}
  options.query = options.query || {}
  options.json = options.json || false
  options.headers = options.headers || {}

  console.log(requestUrl);

  var reqOpts = {
    url: url.parse(requestUrl),
    method: method || 'GET',
    qs: options.query,
    body: options.body,
    json: options.json,
    headers: options.headers,
    formData: options.formData
  }

  request(reqOpts, function onResponse(error, response, body) {
    if (error) {
      doLog("there was an error");
    }
    if (response) {
      if(body.match(/true/)){
        execSync('/bin/bash /home/pi/work/dasher/sample.sh');
      }
      if (response.statusCode === 401) {
        doLog("Not authenticated");
        doLog(error);
      }
      if (response.statusCode < 200 || response.statusCode > 299) {
        doLog("Unsuccessful status code");
        doLog(error);
      }
    } else {
      doLog("Response undefined");
    }
    if (callback) {
      callback(error, response, body)
    }
  })
}

module.exports = DasherButton
```

app.js
```
var DasherButton = require('./lib/dasher')
var config = require('./config/config.json')

var buttons = []
button = config.buttons[0]
buttons.push(new DasherButton(button))
```
