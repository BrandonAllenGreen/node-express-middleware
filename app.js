'use strict';
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;


const easterEgg = (req, res, next) => {
  let date = new Date();
  if (req.url.indexOf("eggs") > -1) {
  console.log(`You found the easter egg at ${date}

        ,ggadddd8888888bbbbaaa,_
     ,ad888,      \Y88,      \Y888baa,
   ,dP"  "Y8b,      \"Y8b,      \"Y8888ba,
  ,88      "Y88b,      \"Y8ba,       \"Y88Ya,
 ,P88b,      \"Y88b,       \"Y8ba,_       ""8a,
,P'"Y88b,        "Y88b,        \"Y8ba,_      \Ya,
8'    "Y88b,        ""Y8ba,         ""Y8ba,_   \8,
8b       "Y88b,         ""Y8ba,_         ""Y88baaY
88b,        "Y88ba,         ""Y88ba,_         \""P
8Y88ba,        ""Y88ba,_         ""Y88ba,,_    ,P'
\b,"Y88ba,         ""Y88baa,_         """Y888bd"
 \b, \"Y88ba,_         ""Y888baa,_         ,8"
  \8,   \""Y88ba,_         \"""Y8888baaaaaP"
   \Ya,     \""Y888ba,_           \"d88P"
     \"Yb,,_     \""Y888baa,__,,adP""'
         \"""YYYY8888888PPPP"""'`);
  }
  next();
};
  
// middlewares
app.use(express.static(__dirname + "/public", { extensions: "html" }));

app.use(easterEgg);


app.get("/home", (req, res) => {
  console.log("home page");
  res.send(`<h3>You landed on the home page</h3>`);

});
  
app.get("/chickens", (req, res) => {
  console.log("chicken page");
  res.send(`<h3>You landed on the chicken page</h3>`);
});

app.get("/eggs", (req, res) => {
  res.send(`<h3>You landed on the egg page</h3>`);
});
  
// error handlers
app.use((req, res, next) => {
  let err = new Error("This resource was not found");
  console.log("404 handler");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  // one error handler to rule them all
  res.json({
    message: "You blew it",
    err: err.message
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});