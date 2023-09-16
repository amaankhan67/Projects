var submitBtn=document.getElementById("button");
var form=document.getElementById("form");

form.addEventListener('submit',(e)=>{
    e.preventDefault();
});

function showUsersonScreen(Obj)
{
    //NEW LIST
    var newList=document.createElement('li');
    newList.setAttribute('class','list-group-item');
    newList.setAttribute("id",Obj.id);
    var newText=document.createTextNode(Obj.name+" "+Obj.email+" "+Obj.date);
    newList.appendChild(newText);

    //NEW DELETE BUTTON
    var newButton=document.createElement('button');
    newButton.setAttribute("class","btn btn-danger btn-sm float-right delete");
    var newTextButton=document.createTextNode('Delete');
    newButton.appendChild(newTextButton);

    //NEW EDIT BUTTON
    var editButton=document.createElement('button');
    editButton.setAttribute("class","btn btn-danger btn-sm float-right edit");
    editButton.appendChild(document.createTextNode('Edit'));


    var parent=document.getElementById("items");
    newList.appendChild(newButton);
    newList.appendChild(editButton);
    parent.appendChild(newList);
}

submitBtn.addEventListener('click',(e)=>{
    var name=document.getElementById("name").value;
    var email=document.getElementById("email").value;
    var date=document.getElementById("date").value;
    var Obj={
        name: name,
        email: email,
        date: date
    };
    axios.post("http://localhost:3000/user/add-user",Obj)
        .then((response) =>{
            alert('Data Saved Successfully!');
            showUsersonScreen(response.data.newUserDetail);
        })
        .catch((err) => alert("Error Found : "+err));
    
});

//DOM CONTENT LOADER
window.addEventListener("DOMContentLoaded", ()=> {
    axios.get("http://localhost:3000/user/get-users")
        .then((response)=>{
            for(var i=0;i<response.data.allUsers.length;i++)
            {
                console.log(response.data.allUsers[i]);
                showUsersonScreen(response.data.allUsers[i]);
            }
        })
        .catch((error) => {
            console.log(error);
        })
})

//Delete Button
var itemList=document.getElementById("items");
itemList.addEventListener('click',(e)=>{
    if(e.target.classList.contains('delete')){
        if(confirm('Are You Sure?')){
          var li = e.target.parentElement;
          console.log(li.id);
          axios.delete(`http://localhost:3000/user/delete-user/${li.id}`)
            .then((response) =>{
            alert('Data Deleted Successfully!');
            })
            .catch((err) => alert("Error Found : "+err));
        itemList.removeChild(li);
        }
    }
});

//Edit Button
itemList.addEventListener('click',(e)=>{
    if(e.target.classList.contains('edit'))
    {
        var li = e.target.parentElement;
        axios.get(`http://localhost:3000/user/get-user/${li.id}`)
        .then((response)=>{
            document.getElementById("name").value=response.data.currentUser.name;
            document.getElementById("email").value=response.data.currentUser.email;
            document.getElementById("date").value=response.data.currentUser.date;
            axios.delete(`http://localhost:3000/user/delete-user/${li.id}`)
            .then((response) =>{
                itemList.removeChild(li);
                console.log(response);
            })
            .catch((err) => alert("Error Found : "+err));
        })
        .catch((error) => {
            console.log(error);
        })
    }
});
