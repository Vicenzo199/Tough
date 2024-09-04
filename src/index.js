const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require('./config');


const app = express();

app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));

// convert data into json
app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.use(express.static(__dirname + '/views'));
// app.use(bodyParser.urlencoded({
//    extended: false
// }));

app.set('view engine', 'ejs');

app.get('/signup', (req, res)=>{
    res.render('signup');
});

app.get('/', (req, res)=>{
    res.render('login');
});



// register user(sign up)

app.post('/signup',async(req,res)=>{
    const data ={
        name: req.body.username,
        password: req.body.password,
    }
    // check if user already exist in database
    const existingUser = await collection.findOne({name:data.name});
    
    if(existingUser){
        res.send("User already exists. Please try again.");
    }
    else{

        // // hash password

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password,saltRounds);

        data.password = hashedPassword; //replace hash password with original password

        // // send data in database

    const userData = await collection.insertMany(data);
    console.log(userData);
    }

    
});

// login user

app.post('/login', async (req,res)=>{
    try {
        const check = await collection.findOne({name:req.body.username});

        // if (check) {
        //     res.send('Username not found');
        // }

        // compare hsh password from database with plain text

        const IsPasswordMarch = await bcrypt.compare(req.body.password, check.password);
        
        if (IsPasswordMarch) {
            res.render('home');
        } else {
            req.send('Wrong password');
        }


    } catch (error) {
        res.send('Wrong details!');
    }

});

const port = 5000;
app.listen(port, ()=>{
    console.log('port connected successfully!!')
});