//TODO CRUD FUNCTIONS
let todoDB = getDB("todoDB");

//helper function if todoDB is set
function storageSet() {  
    return todoDB ?  true :  null;
}

//create
function createTodo(e) {
    e.preventDefault();
    const todoInput = document.querySelector("#todoInput");
    if(todoInput.value === '' || todoInput.value.length == 0){
        todoInput.placeholder = "Please enter valid todo"
        todoInput.classList.add("placeholder-red-500"); 
        return ;
    }else{
        todoInput.placeholder = "Add todo"
        todoInput.classList.remove("placeholder-red-500"); 
    }

    let dateObj = new Date();

    let todoDetails = {
        name: todoInput.value,
        date: dateObj.toLocaleDateString("en-US"),
        ID: Math.random(),
        completed: false,
        order:  dateObj.getMilliseconds(),
    }

    if(!storageSet()){
        todoDB = [];
    }else{
        todoDB = JSON.parse(localStorage.getItem("todoDB"));
    }

    todoDB.push(todoDetails);

    setDB('todoDB', todoDB)
    readTodo()
    todoInput.value = ""
}

//read

function readTodo(){
    const todoTable = document.querySelector("#todoTable");

    if(!storageSet()){
        todoTable.innerHTML = `<h1 class="text-center ">No todo found</h1>`
        
    }else{

    todoTable.innerHTML = ''; // Clear the previous content
    // check if todoDB is empty
    if(todoDB.length === 0){
        todoTable.innerHTML = `<h1 class="text-center ">No todo found</h1>`
    }

    todoDB.sort((a, b) => b.order - a.order);
    todoDB.map((todo)=>{
        // const listItem = document.createElement('li');
        // listItem.classList.add("flex", "justify-between", "p-2", "border-b-2", "border-gray-300");
        let listItem = `
        <li class="group flex justify-between p-2 border-b-2 border-gray-300">
            <div class="block group-hover:hidden" >${todo.name}</div>
            <div class="block group-hover:hidden" >${todo.date}</div>
            <button class="hidden text-dark group-hover:block" onclick="previewpage('${todo.ID}')"><i class="fa fa-arrow-right" aria-hidden="true"></i> Task</button>
            <form action="">
                <button type="button" class="delete-button bg-red-500 text-white p-2 rounded-lg" data-index="${todo.ID}"><i class="fa fa-trash" aria-hidden="true"></i></button>
                <button type="button" class="edit-button bg-yellow-500 text-white p-2 rounded-lg" data-index="${todo.ID}"><i class="fa fa-exclamation-circle" aria-hidden="true"></i></button>
            </form>
        </li>
        `;

        todoTable.innerHTML += listItem;
    })
    
    }   
}


//DElete
const todoTable = document.querySelector("#todoTable");
todoTable.addEventListener('click', (event) => {
        if(event.target.classList.contains('delete-button')){
            Swal.fire({
                title: 'Delete!',
                text: 'Do you want to Delete',
                icon: 'error',
                confirmButtonText: 'Yes',
                showConfirmButton: true,
                showCancelButton: true
              }).then((res) =>{
                if(res.isConfirmed){
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )

                    // Get the ID of the to-do item to be deleted
                const todoID = event.target.getAttribute('data-index');

                // Remove the to-do item from the array and update local storage
                todoDB = todoDB.filter((todo) => todo.ID !== parseFloat(todoID));
                setDB('todoDB', todoDB)

                readTodo();
                } else{
                    Swal.fire(
                        'Cancelled!',
                        'Your file is safe :)',
                        'error')
                    }
                }) 
            } else{
                return;
            }
        })




//update
todoTable.addEventListener('click', (event) => {
    if(event.target.classList.contains('edit-button')){
        console.log("edit button clicked")
    // Get the ID of the to-do item to be deleted
    const todoID = event.target.getAttribute('data-index');

    //pop up a modal and Update the to-do item from the array and update local storage 
    Swal.fire({
        title: 'Edit!',
        text: 'Do you want to Edit',
        icon: 'info',
        confirmButtonText: 'Yes',
        showConfirmButton: true,
        showCancelButton: true,
        input: 'text',
        inputPlaceholder: 'Enter your todo',
        inputAttributes: {
            autocapitalize: 'off'
          },
        inputValue: todoDB.find((todo) => todo.ID === parseFloat(todoID)).name,
        }).then((res) =>{
            if(res.isConfirmed){
                Swal.fire(
                    'Edited!',
                    'Your file has been Edited.',
                    'success'
                  )

                // Update the to-do item from the array and update local storage 
                todoDB.find((todo) => todo.ID === parseFloat(todoID)).name = res.value;
                setDB('todoDB', todoDB)
                readTodo();
            } else{
                Swal.fire(
                    'Cancelled!',
                    'Your file is safe :)',
                    'error')
                }
            })
        } else{
            return;
        }
    })


function previewpage(id){
    // let todo = todoDB.find((todo) => todo.ID === parseFloat(id));
    setDB('previewTodo', id)
    window.location.href = "./preview.html"
}

const modal = document.querySelector('.absolute');
const modal_page = document.querySelector('#modal_page');

modal_page.addEventListener('click', (event) => {
  if (!modal.contains(event.target)) {
    modal.style.transform = 'translateX(-2rem) translateY(2rem)';
    modal.style.opacity = '0';
  }
});