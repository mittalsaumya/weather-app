const express = require("express");
const { get } = require("http");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
app.use(express.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
  
});

app.post("/",function(req,res){
  var city=req.body.city_name;
  const url="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=7e79ad35793507dca32ae6c56d2abd7b"
  https.get(url,function(response){
		console.log(response.statusCode);
		response.on("data",function(data){
			const weatherData=JSON.parse(data);
			const temp=weatherData.main.temp-273;
			const weatherDes=weatherData.weather[0].description;
			const icon=weatherData.weather[0].icon;
			console.log(icon);
			const imgurl="https://openweathermap.org/img/wn/" + icon + "@2x.png";
			res.send("<h1>The temprature is " + temp + "  degree celcius</h1> <br> <h1>weather is " + weatherDes + " in " + city + " <img src=" + imgurl + "> </h1>");
		})

  });

  //res.send("city is " + city);
})

app.get("/about",function(req,res){
  res.send("saumya");
});

app.listen(process.env.PORT || 3000,function(){
  console.log("server");
})

//7e79ad35793507dca32ae6c56d2abd7b
//https://samples.openweathermap.org/data/2.5/weather?q=london&appid=7e79ad35793507dca32ae6c56d2abd7b