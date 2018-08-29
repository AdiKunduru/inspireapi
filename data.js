
var mssql = require("mssql"); 
  var dbconfig = {
        user: 'inspirelcms_demo',
        password: 'Fyx22x!1',
        server: 'jothan-dell2\\sqlexpress',
        database: 'inspirelcms_demo'
    };

    
var connection = mssql.connect(dbConfig, function (err) {
    if (err)
        console.log(err); 
});

module.exports = {


checkSecret : function(res,secret){

    var request = new mssql.Request();

    request.query('select ' + secret 'from SECRETKEYS??', function (err, recordset) {

        if (err) console.log(err)
            if(recordset.length == 0 ?? recordset != null)

            else{
                res.redirect('/authenticate?secret=' + secret)
            }
          
                sql.close();
        });
},


getStudent : function(res,student){

        var request = new mssql.Request();

        request.query('select * from Students', function (err, recordset) {

            if (err) console.log(err)

          res.send(recordset);

                sql.close();
        });
}





}
