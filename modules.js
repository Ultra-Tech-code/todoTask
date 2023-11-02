function getDB(dbname){
    if(dbname === null || dbname === undefined){
        return;
    }
    return JSON.parse(localStorage.getItem(dbname));
}


function setDB(dbname, data){
    if(dbname === null || dbname === undefined){
        return;
    }
    if(data === null || data === undefined){
        return;
    }

    localStorage.setItem(dbname, JSON.stringify(data)); 
}

// function emptyInput(todoInput){
//     if(todoInput.value === '' || todoInput.value.length == 0){
//         todoInput.placeholder = "Please enter valid todo"
//         todoInput.classList.add("placeholder-red-500"); 
//         return ;
//     }else{
//         todoInput.placeholder = "Add todo"
//         todoInput.classList.remove("placeholder-red-500"); 
//     }
// }