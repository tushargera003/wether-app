//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const https = require("https");
const path = require("path");
const app = express();
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static((__dirname, "node_modules/bootstrap/dist/")));

  app.get("/", function(req, res){
});

  app.post("/", async function(req,res){
    const query = req.body.cityName;
    const apiKey = "2caaacd760b94e5d06aad0e6a24602af";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" +apiKey + "&units=metric";
    //https://api.openweathermap.org/data/2.5/weather?q=faridabad&appid=2caaacd760b94e5d06aad0e6a24602af&units=metric
    https.get(url,function(response){
        console.log(response.statusCode);
        if(response.statusCode === 200){
          response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgid = weatherData.weather[0].id;
            const feelslike = weatherData.main.feels_like;  
            let imageURL ="http://openweathermap.org/img/wn/" + icon + "@2x.png";

            //clear
            if(imgid==800){imageURL="https://th.bing.com/th/id/OIP.3-w_X_hGQoFdb5yN2AnxiQHaHZ?pid=ImgDet&rs=1"};


            //snow
            if(imgid==600 || imgid== 601 || imgid==602 || imgid== 611 || imgid==612 || imgid== 613 || imgid==615 || imgid== 616 || imgid==620 || imgid== 621 || imgid==622){imageURL="https://th.bing.com/th/id/OIP.VfKHYUb1Y709P7oJ5HkKhQHaG-?pid=ImgDet&rs=1"};

            //rain
            if(imgid>=500 && imgid<600){imageURL="https://th.bing.com/th/id/OIP.exZSA3XS6JyGLDyeAkyV_AHaHa?w=186&h=186&c=7&r=0&o=5&dpr=1.3&pid=1.7"};

            //thunderstorm 
            if(imgid>=200 && imgid<300){imageURL="https://th.bing.com/th/id/OIP.j8qrMr_v3ThYxAVTs5ndZAHaG7?w=190&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"};

            // drizzle 
            if(imgid>=300 && imgid<400){imageURL="https://th.bing.com/th/id/OIP.2kEAKK_tWd6mlB7pitLVaQHaGW?pid=ImgDet&w=207&h=177&c=7&dpr=1.3"};

            //clouds
            if(imgid>=800 && imgid<900){imageURL="https://th.bing.com/th/id/OIP.Gy0397ukj1gFTGNnizEq7QHaHH?w=196&h=189&c=7&r=0&o=5&dpr=1.3&pid=1.7"};

            // atmosphere fog mist etc 
            if(imgid>=700 && imgid<800){imageURL="https://th.bing.com/th/id/OIP.I8_sMh70gqn1k75IGhRwrAHaHa?w=173&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"};


            res.write('<body style="background-color: rgb(162, 123, 72)">');
            res.write('<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />');
            res.write('<center><div class="card " style="width: 30rem; outline: thick solid #00ff00;  background-color: rgb(171, 237, 205); "><img src='+imageURL+' class="card-img-top" style="border: 5px solid green;border-radius:10px; " alt="..."><div class="card-body"> <h5 class="card-title" style="color:purple;font-weight: bold;   "> Weather Report</h5><p class="card-text" ><h4> The weather is currently '+weatherDescription +'</h4><h3 > The temperature in '+query + ' is '+ temp + '&deg;C and feels like '+feelslike+'</h3><a href="mailto:tushar.gera@acem.edu.in?subject=Refered from our weather our page showing '+query+' Data &body=Enter you detailed mail here and then send it to the owner of the website and dont do unncessary spams " class="btn btn-primary">Contact Owner</a></p></div> </div></center>');
            res.send();
        });
      }else{
            const code=response.statusCode;
            res.write('<p> </p>');
            res.write('<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />');
            res.write('<div style="background-color: darkseagreen;" class="jumbotron jumbotron-fluid "><div class="container"><h1 class="display-4">Uhoh!</h1><p class="lead">There was a problem trying to show up the weather. Please try again or contact the developer!</p><form><a href="/" class="btn  btn-lg btn-warning my-3 mx-3 ">try again !</a><a href="mailto:tushar.gera@acem.edu.in?subject=Refered from the error page    &body=Enter you detailed mail here and then send it to the owner of the website and dont do unncessary spams " class="btn  btn-lg btn-primary my-3 mx-3 ">Contact Owner</a></form></div></div>');
            res.send(); 
      }
        
    });
});

app.get("/weather",async function(req, res){
  res.render("weather",
  {
    visibility:"visibility1",
    clr:"clr1",
    opp:"opp2"
  });  
});

app.post("/weather",async function(req,res){
  const query = req.body.cityName;
  const apiKey = "2caaacd760b94e5d06aad0e6a24602af";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" +apiKey + "&units=metric";
  https.get(url,function(response){
    console.log(response.statusCode);
    if(response.statusCode === 200){
      response.on("data",function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imgid = weatherData.weather[0].id;
        const feelslike = weatherData.main.feels_like;  
        let imageURL ="http://openweathermap.org/img/wn/" + icon + "@2x.png";
        //clear
        if(imgid==800){imageURL="https://th.bing.com/th/id/OIP.3-w_X_hGQoFdb5yN2AnxiQHaHZ?pid=ImgDet&rs=1"};

        //snow
        if(imgid==600 || imgid== 601 || imgid==602 || imgid== 611 || imgid==612 || imgid== 613 || imgid==615 || imgid== 616 || imgid==620 || imgid== 621 || imgid==622){imageURL="https://th.bing.com/th/id/OIP.VfKHYUb1Y709P7oJ5HkKhQHaG-?pid=ImgDet&rs=1"};

        //rain
        if(imgid>=500 && imgid<600){imageURL="https://th.bing.com/th/id/OIP.exZSA3XS6JyGLDyeAkyV_AHaHa?w=186&h=186&c=7&r=0&o=5&dpr=1.3&pid=1.7"};

        //thunderstorm 
        if(imgid>=200 && imgid<300){imageURL="https://th.bing.com/th/id/OIP.j8qrMr_v3ThYxAVTs5ndZAHaG7?w=190&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"};

        // drizzle 
        if(imgid>=300 && imgid<400){imageURL="https://th.bing.com/th/id/OIP.2kEAKK_tWd6mlB7pitLVaQHaGW?pid=ImgDet&w=207&h=177&c=7&dpr=1.3"};

        //clouds
        if(imgid>=800 && imgid<900){imageURL="https://th.bing.com/th/id/OIP.Gy0397ukj1gFTGNnizEq7QHaHH?w=196&h=189&c=7&r=0&o=5&dpr=1.3&pid=1.7"};

        // atmosphere fog mist etc 
        if(imgid>=700 && imgid<800){imageURL="https://th.bing.com/th/id/OIP.I8_sMh70gqn1k75IGhRwrAHaHa?w=173&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"};

        res.render("weather",{
          visibility:"visibility2",
          clr:"clr2",
          opp:"opp1",
          weatherDescription:weatherDescription, 
          temp:temp,
          imageURL:imageURL,
          feelslike:feelslike,
          query:query
        });
      });
    }else{
          const code=response.statusCode;
          console.log(code);
          res.render("error");
    } 
  });
});

app.get("/weather/:customListName",async function(req, res){
  const customListName = _.capitalize(req.params.customListName);
  console.log(customListName);
  res.render("trial");
});

app.get("/notes",async function(req, res){
  res.render("notes",{
  });
});
app.post("/notes",async function(req,res){
    res.render("allnotes",{
    });
}); 
app.get("/bca",async function(req, res){
  const query = req.body.text
  res.render("bca",{
  });
});
app.post("/bca",async function(req, res){
  const query = req.body.text
  res.render("bca",{
  });
});
app.get("/bba",async function(req, res){
  const query = req.body.text
  res.render("bca",{
  });
});
app.post("/bba",async function(req, res){
  const query = req.body.text
  res.render("bba",{
  });
});


app.get("/qrcode",async function(req, res){
  res.render("qrcode",{
    visibility:"visibility1",
    clr:"clr1",opp:"opp2"
  });
});

app.post("/qrcode",async function(req,res){
  const query = req.body.text
    res.render("qrcode",{
      visibility:"visibility2",
      clr:"clr2",
      opp:"opp1",
      query:query
    });
}); 
           
app.get("/qrcode/:customListName",async function(req, res){
  const customListName = _.capitalize(req.params.customListName);
  console.log(customListName);
  res.render("trial");
});

app.get("/:customListName", async function(req, res){
  const customListName = _.capitalize(req.params.customListName);
  console.log(customListName);
  res.sendFile(__dirname+"/unknown.html"); 
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});