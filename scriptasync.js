let crud_crud_url =
  "https://crudcrud.com/api/891400d396334aa7a1e0fff354ac7745/expenseData";

const uploadToCrudCrud = async (event) => {
  event.preventDefault();
  let userDetails = {
    My_Expense_Amount: document.getElementById("amount").value,
    Description: document.getElementById("description").value,
    category: document.getElementById("category").value,
  };

  try {
    let saveuser = await axios.post(crud_crud_url, userDetails);
    showNewUseronScreen(saveuser.data);
  } catch (err) {
    console.log(err);
  }
};

const DOMContentLoaded = async () => {
  try {
    let userDetails = await axios.get(crud_crud_url);
    for (let i = 0; i < userDetails.data.length; i++) {
      showNewUseronScreen(userDetails.data[i]);
    }
  } catch (err) {
    console.log(err);
  }
};

const UserOnScreen = window.addEventListener("DOMContentLoaded",()=>DOMContentLoaded()
);

const showNewUseronScreen = async (userDetails) => {
  document.getElementById("amount").value = "";
  document.getElementById("description").value = "";
  document.getElementById("category").value = "";
  try {
    const d = document.getElementById("details");

    const li = `<li id="${userDetails._id}"> ${userDetails.My_Expense_Amount}, ${userDetails.Description},  ${userDetails.category}
  <button onclick = "editUser('${userDetails.My_Expense_Amount}', '${userDetails.Description}','${userDetails.category}','${userDetails._id}')"> Edit </button>
  <button onclick = "deleteUser('${userDetails._id}')"> Delete </button> 
   </li>`;
    d.innerHTML = d.innerHTML + li;
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (userId) => {
  try {
    let del_user = await axios.delete(`${crud_crud_url}/${userId}`);
    removeUserfromScreen(userId);
    console.log(del_user)
  } catch (err) {
    console.log(err);
  }
};

const removeUserfromScreen = async (userId) => {
  try {
    let parent = document.getElementById("details");

    let child = document.getElementById(userId);
    if (child) {
      parent.removeChild(child);
    }
  } catch (err) {
    console.log(err);
  }
};

const editUser = async (money, des, cat, userId) => {
  try {
    document.getElementById("amount").value = money;
    document.getElementById("description").value = des;
    document.getElementById("category").value = cat;
    deleteUser(userId);
  } catch (err) {
    console.log(err);
  }
};