const express=require("express")
const blog = require("../model/schema")
const router=express.Router()
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get("/",(req,res)=>{
    blog.find().then((result)=>{
        // console.log(result,"d");
        
        res.render("blog/ejsindex",{title: "SAMPLE",blog:result})
    })
    .catch((err)=>{
        console.log("error from schema",err);
        
    })
}) 
router.get('/about', (req, res) => {
    res.render("blog/about", { title: "About" });
});
router.get("/create", (req, res) => {
    res.render("blog/create",{title: "SAMPLE"});  
});

router.post("/create", (req, res) => {
    let newBlog = new blog({
        title:req.body.title,
        snippet:req.body.snippet,
        body:req.body.body
    });         
    newBlog.save()
        .then(result => {
            console.log('Blog created:', result);
            res.redirect("/blogs");
        })
        .catch(err => {
            console.log("Error saving blog:", err);
            res.status(500).json({ message: "Error saving blog", error: err });
        });
});

router.get("/:id", (req, res) => {
    const id = req.params.id; 

    blog.find()
        .then(result =>blog.findById(id).then(result2 =>{
            res.render("blog/data" ,{title: "Create",blog2:result2,blog:result})

        }) ) // Respond with the blog data
     
});
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    blog.findByIdAndDelete(id)
        .then(() => res.json({ redirect: '/blogs' }))
        .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router; 