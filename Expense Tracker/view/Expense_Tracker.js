
var button=document.getElementById("button");
var form=document.getElementById("expenseForm");

form.addEventListener('submit',(e)=>{
    e.preventDefault();
})


function showExpenseOnScreen(Obj)
{
    //NEW LIST
    var li=document.createElement("li");
    li.setAttribute("id",Obj.id);
    var TextNode=document.createTextNode("Rs."+Obj.amount+" spent on "+Obj.category+"("+Obj.details+")");
    li.appendChild(TextNode);

    //NEW DELETE BUTTON
    var newButton=document.createElement('button');
    newButton.setAttribute("class","btn btn-danger btn-sm float-right delete");
    newButton.appendChild(document.createTextNode('Delete'));

    //NEW EDIT BUTTON
    var editButton=document.createElement('button');
    editButton.setAttribute("class","btn btn-danger btn-sm float-right edit");
    editButton.appendChild(document.createTextNode('Edit'));

    var parentList=document.getElementById("items");
    li.appendChild(newButton);
    li.appendChild(editButton);
    parentList.appendChild(li);
}

button.addEventListener('click',(e)=>{
    var amount=document.getElementById("amount").value;
    var category=document.getElementById("category").value;
    var details=document.getElementById("details").value;

    var Obj = {
        amount: amount,
        category: category,
        details: details
    };

    axios.post("http://localhost:3000/user/add-expense",Obj)
    .then((response)=>{
        alert('Expense Added Successfully!');
        showExpenseOnScreen(response.data.newExpense);
    })
    .catch(err => {
        alert("Expense could not be Added. Reason:" + err);
    })
})

//DOM CONTENT LOADER
window.addEventListener("DOMContentLoaded", ()=>{
    axios.get("http://localhost:3000/user/get-expenses")
    .then(response =>{
        for(var i=0;i<response.data.allExpenses.length;i++)
        {
            showExpenseOnScreen(response.data.allExpenses[i]);
        }
    })
    .catch(err => {
        alert("Expense could not be Loaded. Reason:" + err);
    })
})

//DELETE BUTTON
var itemList=document.getElementById("items");
itemList.addEventListener('click',(e)=>{
    if(e.target.classList.contains('delete')){
        if(confirm('Are You Sure?')){
            var li = e.target.parentElement;
            axios.delete(`http://localhost:3000/user/delete-expense/${li.id}`)
            .then(response=>{
            alert('Expense Deleted Successfully!');
            itemList.removeChild(li);
            })
            .catch(err => {
            alert("Expense could not be Deleted. Reason:" + err);
            })
        }
    }
});

//EDIT BUTTON
itemList.addEventListener('click',(e)=>{
    if(e.target.classList.contains('edit'))
    {
        var li = e.target.parentElement;
        axios.get(`http://localhost:3000/user/get-expense/${li.id}`)
        .then(response =>{
            var Obj=response.data.currentExpense;
            document.getElementById("amount").value=Obj.amount;
            document.getElementById("category").value=Obj.category;
            document.getElementById("details").value=Obj.details;

            axios.delete(`http://localhost:3000/user/delete-expense/${li.id}`)
            .then(response =>{
                itemList.removeChild(li);
            })
        })
        .catch(err =>{
            alert('Expense could not be Edited, Reason:' + err);
        })       
    }
});