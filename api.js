const express  = require('express');
const app = express();
const port = process.env.PORT || 9900;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
//const mongourl = "mongodb://localhost:27017";
const mongourl = "mongodb+srv://admin:mongo@123@cluster0.f8vmc.mongodb.net/testdb?retryWrites=true&w=majority"

let db;
let col_name="users";

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//health Check
app.get('/',(req,res) => {
    res.status(200).send("Health OK")
});

//getUser
app.get('/users',(req,res) => {
    var authtoken = req.header('x-access-token')
    if(authtoken == 'iamvaliduser1'){
        var query ={}
        if(req.query.city){
            query ={city:req.query.city,isActive:true}
        }else if(req.query.id){
            query={_id:Number(req.query.id),isActive:true}
        }else{
            query = {isActive:true}
        }
        db.collection(col_name).find(query).toArray((err,result) => {
            if(err) throw err;
            res.status(200).send(result)
        })
    }else{
        res.status(200).send('Your are not allowed')
        
    }
});

//add users
app.post('/addUser',(req,res) => {
    db.collection(col_name).insert(req.body,(err,result) => {
        if(err) throw err
        res.send('Data Added')
    })
});

//updateUser
app.put('/updateUser',(req,res)=>{
    db.collection(col_name).update(
        {_id:req.body._id},
        {
            $set:{
                name:req.body.name,
                city:req.body.city,
                phone:req.body.phone,
                isActive:true
            }
        },(err,result) => {
            if(err){
                res.status(403).send('Error in response')
            }else{
                res.status(200).send('Data updated')
            }
        }
    )
})


//Delete User
app.delete('/deleteUser',(req,res) =>{
    db.collection(col_name).remove({_id:req.body._id},(err,result) => {
        if(err) throw err;
        res.send('Data Deleted')
    });
});


//connection with mongodb
MongoClient.connect(mongourl,(err,connection) => {
    if(err) console.log(err);
    db = connection.db('testdb');
    app.listen(port,(err) => {
        console.log(`Server is running on port ${port}`)
    })
})
