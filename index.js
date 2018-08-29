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


app.get('/', function(req, res) {
    res.render('contact' , {
    data: {},
    errors: {}
  })
});

app.post('/', [
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

   const post = matchedData(req)
   var secret = post.message

   //check secret and redirect
    data.checkSecret(); 	
            
})


app.get('/authenticate' , function(req,res){
//??Payload and supersecret
	
	/*supersecret = req.query.secret
	if(supersecret == null){throw error}
    */
	jwt.giveToken(res) 
})



app.get('/student', function(req,res){

    //Send SQL callback that runs the command and sends it to res
	myToken = req.query.token
	student = req.query.student

	if(jwt.signing(res,myToken,data.getStudent(res,student))){
		
	}else{
		res.send("didn't work")
	}

	
})



app.listen(port);
console.log('running on ' + port);
