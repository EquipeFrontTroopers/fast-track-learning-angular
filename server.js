var express = require('express');
var app = express();
var admin = require('firebase-admin');

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fast-939d3.firebaseio.com"
});


app.use(express.static("App"));
app.get('/', function (req, res,next) {

const email = req.query.email;
  admin
    .auth()
    .getUserByEmail(email)
    .then(function(data) {
      const response = JSON.stringify(data);
      const dataUser = JSON.parse(response);
      const uid = dataUser.uid
      admin.auth().deleteUser(uid)
        .then(function( response ) {
          console.log(response)
        })
    })

});
app.listen(8090, 'localhost');
console.log("Fast Track está em execução!");
