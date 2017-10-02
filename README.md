<h1>tarent's very own coffee machine token control</h1>

### What's it all about?

We want to make our coffee machine(s) controllable by access tokens!
It sucks big time to go to the coffee machine, press the button for your desired product only to find that someone fiddled with the configurations again and instead of getting a full mug of strong coffee, you're now getting half a mug of brown water.<br>
But fear not, help is on the way!<br>
In the form of a raspberry pi, our trusty access tokens and a lil bit of JS and python.

### The idea

First off, we need a way for everyone to save their preferred coffee configuration. We achieve this by building a lightweight webapp using ReactJS and NodeJS. We save the configuration and link each configuration to an LDAP account and a user access token. <br>
Then we start with the Raspi; we need to get our hands on a token reader and some jumper cables. With some python scripting we can call our NodeJS API, request the configuration for the user who just scanned his access token and then use the GPIO-pins of the Pi to controll the coffee machine and make a custom tailored coffee.<br>
We also want to keep track of who drinks how much coffee, to maybe display a ranking of caffeine addicts.

### The HAVEs

+ We already have a skeleton webapp with a working backend and a working form to submit coffee configurations, although it's still very generic.<br>
+ We can store user input from the webapp on the local file system<br>
+ There is also already a small python script to see if we can increment the coffee counter.<br>
+ A token reader and access to its data output<br>
+ The Frontend needs to reflect all possible choices we can make in configuring a coffee (milliliters, strength, amount of milk, etc)<br>

### The TODOs

- [x] send and receive trough rpi's serial interface
- [ ] Decide if we want to store the data on the file system or if we want to use a lightweight database<br>
- [ ] Unit tests! (help wanted and needed)<br>
- [ ] Secure the webbapp<br>
- [ ] Implement an LDAP authentication against our LDAP server (Passport Strategy)<br>
- [ ] Some nice looking CSS to implement tarent's CI on the webapp?<br>
- [ ] Python script to control the coffee machine through GPIO pins<br>
- [ ] Make the backend asynchronous. At the moment we use sync functions to get everything upand running asap, but async functions would be better<br>

### How to install

Simply cd into the frontend folder and run npm install, followed by npm run build. This browserifies the frontend parts.<br>
To start the server just cd into the backend folder and run node src/app.js

### Serial Interface

+ the right **port** to send/receive trough the serial interface is `/dev/ttyAMA0`
+ the right **baudrate** is `9600`

As a proof of concept you can first run in one terminal/tty

    python3 raspberry/serial_test_read.py

and afterwards in another

    python3 raspberry/serial_test_write.py

.