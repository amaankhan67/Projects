const express=require('express');
const sequelize=require('./util/database');
const bodyParser=require('body-parser');
const cors=require('cors');
const router=require('./routes/user');

const app=express();
app.use(cors());
app.use(bodyParser.json());

app.use('/user',router);

sequelize.sync().then(()=>{
    app.listen(3000);
}).catch(err=>{
    console.log(err);
})