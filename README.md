# mqtt-bridge
This app allows you to make MQTT publications using HTTP POST calls

It's currently very simple and only supports publications, but I'm planning to add subscriptions also.

To use it, you should make an HTTP POST call to http://localhost:1883/mqtt/pub and send the following information in the body:

* host [ws://test.mosquitto.org]
* port [1883]
* options: { user: [none], password: [none] } (not implemented yet)
* qos [0]
* topic
* message

The values between brackets [] are the defaults if none specified.
IMPORTANT: The HTTP POST call has to be "x-www-form-urlencoded"

This is a work in progress. Still much left to do.
