const express = require('express')
const hbs = require('hbs')
const fs =require ('fs')
const port = process.env.PORT|| 3000

//nodemon server.js -e js.hbs
var app = express()

// for handlebar partials
hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCurrentYear',()=>{
    return  new Date().getFullYear()
})

hbs.registerHelper('upperCase',(text)=>{
    return  text.toUpperCase() //convert to upper case
})

// use view engine
app.set('view engine','hbs')
//MIDDLEWARE
//
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log =`${now}:${req.method} ${req.url}`
    console.log(log)
    //save log as server.log
    fs.appendFile('server.log',log + '\n',(err)=>{
        if(err){
            console.log('Unable to append to server.log')
        }
    })
    next() 
    // next() tell express function is done and allow app continue to run
})

//app.use((req,res,next)=>{
//    res.render('maintenance.hbs')
//})
app.use(express.static(__dirname + '/public')) // must be after maintenance.hbs


app.get('/',(req,res)=>{
    
    res.render('home.hbs',{
        // dynamic data pass into home.hbs
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome To My Website',
    })
    
    //res.send('<h1>hello Express!</h1>') //display the string on web
   
/*    res.send({
     //display JSON object on web
        name:'ABC',
        like: [
            'WTF',
            'WTH'
        ]
    })
*/
})


app.get('/about',(req,res)=>{
    //res.send('About Page')
    res.render('about.hbs',{
        // dynamic data pass into home.hbs
        pageTitle: 'About Page',
    })
})
//send back jason with error message
app.get('/bad',(req,res)=>{
    res.send({
        ErrorMessage:'WAH PIANG AYE'
    })
})

app.get('/project',(req,res)=>{
    
    res.render('project.hbs',{
        pageTitle: 'Project Page',

        // dynamic data pass into project.hbs
    })
})



app.listen(port,()=>{

    console.log (`Server port ${port}`)
})