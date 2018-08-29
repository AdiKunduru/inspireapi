var express = require('express')
var app = express()

const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('express-flash')

var port = process.env.PORT || 8080; // used to create, sign, and verify tokens

var validator = require('express-validator')
var bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator/check')
const { matchedData } = require('express-validator/filter')

cookieParser()
session({
    secret: 'super-secret-key',
    key: 'super-secret-cookie',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
})
flash()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs')
var jwt  = require('./jwt');
var data = require('./data')




app.get('/contact', function(req, res) {
    res.render('contact' , {
    data: {},
    errors: {}
  })
});

app.post('/contact', [
  check('message')
    .isLength({ min: 1 })
    .trim()
], (req, res) => {
 
 const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('contact', {
      data: req.body,
      errors: errors.mapped()
    })
  }

  const data = matchedData(req)

   var secret = data.message

 	var request = new sql.Request();
           
        // query to the database and get the records
    request.query('select' + secret + ' from SECRETKEYTABLE', function (err, recordset) {
            
            

         if(recordset.length > 0)


           res.redirect('/authenticate?secret=' + secret)
            
        });

   
})


app.get('/authenticate' , function(req,res){
//??Payload and supersecret
	payload = 
	{
	  name:"xxxx",
	  password:"xxxx"
	}
	
	//supersecret = req.query.secret
	//Determine if supersecret key is a real key

	jwt.giveToken(res,payload) 
})


app.get('/login', function(req,res){
	
	//localhost:8080/login?token=example 

	 myToken = req.query.token

	 jwt.signing(res,myToken);

})



app.get('/student', function(req,res){

    //Send SQL callback that runs the command and sends it to res
	myToken = req.query.token
	student = req.query.student
//getStudent(res,student)
	if(jwt.signing(res,myToken,data.math())){
		
	}else{
		res.send("didn work")
	}

	
})

/*

app.get('/course', function(req,res){
	


	var request = new sql.Request();
           
        // query to the database and get the records
    request.query('select' + secret + ' from SECRETKEYTABLE', function (err, recordset) {
            
            

         if(recordset.length > 0)


           res.redirect('/authenticate?secret=' + secret)
            
        });
})
*/




app.listen(port);
console.log('running on ' + port);
