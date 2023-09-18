const Expense=require('../models/expense');

exports.getExpenses = async (req,res)=>{
    try{
        const expenses=await Expense.findAll();
        res.status(200).json({allExpenses: expenses});
    }
    catch(err){
        console.log(err);
        res.json({"Some Error has occured" : err});
    }
    };

exports.addExpense = async (req,res)=>{
    try{
        const amount=req.body.amount;
        const category=req.body.category;
        const details=req.body.details;
        
        const data=await Expense.create({
            amount : amount,
            category : category,
            details : details
        })
        res.status(201).json({newExpense: data});
    }
    catch(err){
        console.log(err);
    }
};

exports.getExpense = async (req,res)=>{
    try{
        const id=req.params.id;
        if(id=='undefined')
        {
            console.log('ID is missing');
        }
        const expense=await Expense.findByPk(id);
        res.status(200).json({currentExpense: expense});
    }
    catch(err){
        console.log(err);
    }
};

exports.deleteExpense = async (req,res)=>{
    try{
        if(req.params.id=='undefined')
        {
            console.log('ID is missing');
        }
    const Uid=req.params.id;
    await Expense.destroy({where: {id:Uid}});
    res.sendStatus(200);
    }
    catch(err){
        console.log(err);
    }
};