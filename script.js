function uploadToCrudCrud(event){
    event.preventDefault();
    const amount=event.target.amount.value;
    const description=event.target.description.value;
    const category=event.target.category.value;

    const obj={
        amount,
        description,
        category
    }
    console.log(obj)
    axios.post("http://localhost:3000/expense/add-expense",obj)
        .then((response) => {
            showUserOnScreen(obj)
            console.log(response)
        }).catch((err) => {
            console.log(err)
        });
    
}


window.addEventListener("DOMContentLoaded",()=>{
    axios.get("http://localhost:3000/expense/get-expense")
        .then((response)=>{
            console.log(response)
            for(var i=0;i<response.data.allExpense.length;i++){
                showUserOnScreen(response.data.allExpense[i])
            }
        }).catch((err)=>{
            console.log(err)
        })
})

function showUserOnScreen(user){
    document.getElementById('amount').value="";
    document.getElementById('description').value="";
    document.getElementById('category').value="";
    const parentNode=document.getElementById('details');
    const childHTML=`<li id=${user.id}> ${user.amount}- ${user.description}- ${user.category}
                        <button onClick=deleteUser('${user.id}')>Delete User</button> 
                        <button onClick="editUser('${user.amount}','${user.description}','${user.category}','${user.id}')">Edit User</button>
                    </li>`
    parentNode.innerHTML=parentNode.innerHTML + childHTML;
    
}

//delete user
function deleteUser(userId){
    axios.delete(`http://localhost:3000/expense/delete-expense/${userId}`)
        .then((response)=>{
            removeUserFromScreen(userId)
        }).catch((err)=>{
            console.log('this',err)
        })
    removeUserFromScreen(userId)
    }



// // remove user

function removeUserFromScreen(userId){
    const parentNode=document.getElementById('details')
    const childNodeToBeDeleted=document.getElementById(userId);
    console.log(userId)
    if(childNodeToBeDeleted){
        parentNode.removeChild(childNodeToBeDeleted);
    }
    console.log(childNodeToBeDeleted)
}



// //edit user

function editUser(amt,des,cat,userId){
    document.getElementById('amount').value=amt;
    document.getElementById('description').value=des;
    document.getElementById('category').value=cat;
    console.log(userId)
    axios.get(`http://localhost:3000/expense/edit-expense/${userId}`);
}



