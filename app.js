require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const twilio = require("twilio");
const mongoose = require("mongoose");

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/public'));



const contactList = [
  ["Poonam Sajwan", "+917347469070"],
  ["Kisan Network", "+919810153260"]
];
const messageList = [
  ["Poonam Sajwan", "+917347469070","2020-11-07T20:42:06.000Z", "Hey There"],
  ["Kisan Network", "+919810153260", "2020-11-07T20:42:06.000Z","Hi"]
];
app.get("/", function(req, res) {
  res.render("home", {
    contactList: contactList
  });
});

app.get("/messages", (req, res) => {
  res.render("messages", {
    messageList: messageList
  });
});

app.get("/contacts", (req, res) => {
  res.render("home", {
    contactSchema: contactSchema
  });
});

app.get("/contacts/:phone", (req, res) => {
  const required = req.params.phone;
  var i = 0,
    one = 1;
  for (i = 0; i < contactList.length; i++) {
    if (contactList[i][1] == required) {
      one = 2;
      res.render("singleContact", {
        name: contactList[i][0],
        number: contactList[i][1]
      });
      break;
    }
  }
  if (one == 1) {
    res.redirect('/');
  }
});

function generateOTP() {
  var digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

var message = "Hey there!"
var phone;
var otp;


app.post("/contacts/:phone", (req, res) => {

  otp = generateOTP();
  message = req.body.msg + " Your otp is" + otp;
  phone = req.params.phone;

  const accountSid = process.env.ACCOUNTID;
  const authToken = process.env.AUTHTOKEN;


  const client = require('twilio')(accountSid, authToken);

  client.messages
    .create({
      body: message,
      to: phone,
      from: "+12058329715",
    })
    .then((message) => {

      var j=0;var currentName="";
      for (i = 0; i < contactList.length; i++) {
        if (contactList[i][1] == phone) {
          currentName=contactList[i][0];
      }
    }

    var date=JSON.stringify(message.dateUpdated);
    var newDate = new String();

    newDate = date.toString().replace(/"/g, "");
      messageList.push([currentName,phone,newDate,otp]);
    });
  res.redirect("/contacts/:phone");
});

app.listen(process.env.PORT || 3001, function() {
  console.log("Server started on port 3000");
});
