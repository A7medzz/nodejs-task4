// before running do (npm install node-dht-sensor) to read data from the dht sensor
const dht = require('node-dht-sensor');
const dht11 = dht.sensors.DHT11;
dht11.initialize(4); //this makes 4 GPIO pin nu.

// Create an interface for reading input from the command line
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function readsensordata(){
    const read = dht11.read();
    // if an error faced reading the data or invaled data
    if(!read.temperature || !read.humidity){
        console.log("Error reading sensor data");
        return null;
    }

    // task 3 (filters out sensor readings below a certain threshold)
    let tempthreshold = 10;
    if(read.temperature < tempthreshold){
        console.log("temperature is below threshold");
        return null;
    }

    // task 5 (combine sensor data into a massge object)
    let msg={
        payload: {
            temperature: read.temperature.toFixed(2),
            humidity: read.humidity.toFixed(2)
        }
    };

    // task 1 (add status based on the temp)
    if (msg.payload.temperature > 30){
        msg.payload.status = "High";
    }
    else {
        msg.payload.status = "Normal";
    }

    // task 6 (add timestamp to the massage)
    let now = new Date();
    msg.timestamp = now.toISOString().replace('T',' ').split('.')[0];

    return msg;
}

// Task 2 (String manipulation)
function manipulateString(inputStr) {
    let upperStr = inputStr.toUpperCase();
    if (inputStr.length > 10) {
        return upperStr + " (truncated)";
    }
    return upperStr;
}

// (Task 4) Time-based greeting
function timeBasedGreeting() {
    let hours = new Date().getHours();
    if (hours < 12) {
        return "Good morning";
    } else if (hours < 18) {
        return "Good afternoon";
    } else {
        return "Good evening";
    }
}

// Task 7 (Dynamic property access)
function dynamicPropertyAccess(msg, propertyName) {
    return msg.payload[propertyName];
}

console.log(timeBasedGreeting());

// get input string
rl.question('Please enter a string: ', function(userInput) {
    console.log(manipulateString(userInput));
    rl.close();
});

// Read sensor data and output results
let sensorData = readsensordata();
if (sensorData) {
    console.log("Sensor Data: ", sensorData);
    console.log("temperature from sensor: " + dynamicPropertyAccess(sensorData, 'temperature'));
    console.log("Humidity from sensor: " + dynamicPropertyAccess(sensorData, 'humidity'));
    console.log("Status from sensor: " + dynamicPropertyAccess(sensorData, 'status'));
}