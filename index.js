const DashButton = require('dash-button');
const DASH_BUTTON_MAC_ADDRESS = 'xx:xx:xx:xx:xx:xx'; // 小文字で。
 
let button = new DashButton(DASH_BUTTON_MAC_ADDRESS);

console.log('listen...');

let subscription = button.addListener( () => {
  console.log('Clicked..'+ new Date());
});

