const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");

const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT || 3000,function(){
  console.log("server is running on port 3000");
});

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});


app.post("/",function(req,res){
  var firstname=req.body.fname;
  var lastname=req.body.lname;
  var email=req.body.email;

  
  var data={
    members: [
     { email_address: email,
      status:"subscribed",
      merge_fields:{
        FNAME : firstname,
        LNAME: lastname
      }
    
    }
    ]
  };
  var jsonData= JSON.stringify(data);
  var option={
    uri:"https://us6.api.mailchimp.com/3.0/lists/3e8cd08070",
    method:"POST",
    headers:{
      "Authorization":"advait 87ed5a4c63728878f173ca6ed26d5f8f-us6"
    },
    body: jsonData
  }
  request(option,function(error,response,body){
    if(error)
    {
      res.sendFile(__dirname+"/failure.html");
    }
    else
    {
      if(response.statusCode===200)
      {
        res.sendFile(__dirname+"/success.html");
      }else{
        res.sendFile(__dirname+"/failure.html");
      }
    }
  });
});

