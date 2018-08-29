
 //var sql = require("mssql");

    // config for your database
    var config = {
        user: 'sa',
        password: 'mypassword',
        server: 'localhost', 
        database: 'SchoolDB' 
    };

module.exports = {

math : function(){

	//SQL Commands here
	return "this is my code";

},


getStudent : function(student){

	sql.connect(config, function (err) {

		var request = new sql.Request();
		 request.query('select' + student + ' from STUDENTTABLE', function (err, recordset) {
         
         //If there is a student in the Table
         if(recordset.length > 0){
         	return recordset
         }
         else{
         	//Insert Appropriate error message here
         	return ("error message")
         }
        });
	})
},





}
