const User=require('../models/appointments');

exports.getUsers = async (req,res,next)=>{
    try{
        const users=await User.findAll();
        res.status(200).json({allUsers: users});
    }
    catch(err){
        console.log(err);
    }
    };

exports.addUser = async (req,res,next)=>{
    try{
        const name=req.body.name;
        const email=req.body.email;
        const date=req.body.date;
        
        const data=await User.create({
            name:name,
            email:email,
            date:date
        })
        //res.sendStatus(201);
        res.status(201).json({newUserDetail: data});
    }
    catch(err){
        console.log(err);
    }
};

exports.getUser = async (req,res,next)=>{
    try{
        const id=req.params.id;
        if(id=='undefined')
        {
            console.log('ID is missing');
        }
        const user=await User.findByPk(id);
        res.status(200).json({currentUser: user});
    }
    catch(err){
        console.log(err);
    }
};

exports.deleteUser = async (req,res,next)=>{
    try{
        if(req.params.id=='undefined')
        {
            console.log('ID is missing');
        }
    const Uid=req.params.id;
    await User.destroy({where: {id:Uid}});
    res.sendStatus(200);
    }
    catch(err){
        console.log(err);
    }
};