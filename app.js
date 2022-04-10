const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(requ,resp){
const query=requ.body.cityName;
const keyid="1814d048e072b854e8dab80ab37fc6d7";
const type="metric";
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+keyid+"&units="+type+"";
https.get(url,function(response){
  response.on("data",function(data){
    const weatherData=JSON.parse(data);
    const temp=weatherData.main.temp;
    const weatherDescription=weatherData.weather[0].description;
    const icon=weatherData.weather[0].icon;
    const imgurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
    resp.write("<p>The Weather is currently:"+weatherDescription+"</p>");
    resp.write("<h1>The temperature of the city "+query+" is:"+temp+" degrees celsius.</h1>");
    resp.write("<img src="+imgurl+"></img>");
    resp.send();
  });
});
});
app.listen(3000,function(){
  console.log("now you are at port 3000.");
});
