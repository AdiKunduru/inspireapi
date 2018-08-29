

var jwt = require('jsonwebtoken')


module.exports = {

signing : function(res,myToken,callback) {
jwt.verify(myToken, 'supersecret', function(err, decoded) {      
      if (err) {
      	console.log(err)
        return res.json({ success: false, message: 'Failed to authenticate token.' });  
         
  }
  else{
  	res.send(callback)
  } 

 });

},

giveToken : function(res) {

payload =  {} 
  
	var token = jwt.sign(payload, "supersecret", {
          expiresIn: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
}


}