
const express=require('express');
const app=express()
const mongodb=require('mongodb')
const mongoose=require('mongoose');
const blgRouter = require('./routes/blogroutes');

mongoose.connect(dbURI)
.then((result)=>{
    console.log("Connected to db");
    console.log("listen at 2000");
    app.listen(2000)
    
})
.catch((err)=>{
    console.log("error connect db",err);
    
})

app.use(express.json());

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs');
app.use("/blogs",blgRouter)

app.get("/", (req, res) => {
    res.redirect("/blogs"); 
});



 