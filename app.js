const express = require("express");
const bodyParser = require("body-parser");
// const request = require("requests");
const request = require("request");
const https = require("https");
const { rmSync } = require("fs");

// NEW INSTANCE OF EXPRESS
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const mail = req.body.email;
    // console.log(firstName, lastName, mail);

    var data = {
        members: [
            {
                email_address: mail,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);
    const url = "******your url******"
    const options = {
        method: "POST",
        auth: "ARYAMAN:******your apikey******"
    }
    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            // res.send("SUCCESS");
            res.sendFile(__dirname + "/success.html");
        } else {
            // res.send("!! TRY AGAIN");
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});

app.post("/failure", function (req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server started at port 3000.");
});

// link
// https://floating-caverns-33866.herokuapp.com/