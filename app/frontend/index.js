const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname)));
app.use("/controller", express.static(__dirname + '/controller'));
app.use("/css", express.static(__dirname + "/css"));
app.use("/img", express.static(__dirname + '/img'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/scss", express.static(__dirname + '/scss'));
app.use("/vendor", express.static(__dirname + '/vendor'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/login.html'));
});

app.listen(process.env.PORT || 8080);