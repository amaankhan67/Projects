const express=require('express');

const userController=require('../controllers/user');

const router=express.Router();

router.get('/get-users', userController.getUsers);

router.post('/add-user',userController.addUser);

router.get('/get-user/:id',userController.getUser);

router.delete('/delete-user/:id',userController.deleteUser);

module.exports=router;