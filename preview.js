let todoDB = getDB("todoDB");
function renderPage() {
    let todoId = getDB("previewTodo");
    let previewDB = todoDB.find((todo) => todo.ID === parseFloat(todoId));
    let previewPage = document.getElementById("previewPage");
        previewPage.innerHTML = ''; // Clear the previous content
        // check if todoDB is empty
        if (previewDB.length === 0) {
            previewPage.innerHTML = `<h1 class="text-center ">No todo found</h1>`
        }
        let  completed

        if (previewDB.completed === false || previewDB.completed === undefined) {
          completed = `<button class="bg-gray-500 text-white px-4 py-2 rounded-lg" onclick="done(${previewDB.ID})"><i class="fa fa-times" aria-hidden="true"></i> Pending</button>`
        }else{
            completed = `<button class="bg-green-500 text-white px-4 py-2 rounded-lg" onclick="done(${previewDB.ID})"><i class="fa fa-check" aria-hidden="true"></i> Done</button>`
        }

        previewPage.innerHTML += `
                <div class="flex justify-around items-center content-center py-4">
                    <div>
                    <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded cursor-pointer" onclick="home()">
                    <i class="fa fa-arrow-left" aria-hidden="true"></i> all task
                    </button>
                       
                        <h1 class="text-2xl font-semibold">${previewDB.name}</h1>
                        <p class="text-gray-400 cursor-pointer py-3" onclick="addDescription('${previewDB.ID}')">${previewDB.Description || "Add Description"}</p>
                        <p class="text-gray-400">${previewDB.date}</p>
                    </div>
                    <div>
                         ${completed}
                        <button class="bg-red-500 text-white px-4 py-2 rounded-lg" onclick="deletePreview(${previewDB.ID})">Delete</button>
                    </div>
                </div>
            `
    }


function  addDescription(id) {
    Swal.fire({
        title: 'Add!',
        text: 'Add Description',
        icon: 'info',
        confirmButtonText: 'Yes',
        showConfirmButton: true,
        showCancelButton: true,
        input: 'text',
        inputPlaceholder: 'Enter Desctiption',
        inputAttributes: {
            autocapitalize: 'off'
          },
        inputValue: todoDB.find((todo) => todo.ID === parseFloat(id)).Description,
        }).then((res) =>{
            if(res.isConfirmed){
                Swal.fire(
                    'Added!',
                    'Description Added',
                    'success'
                  )

                // Update the to-do item from the array and update local storage 
                todoDB.find((todo) => todo.ID === parseFloat(id)).Description = res.value;
                setDB('todoDB', todoDB)
                renderPage()
            } else{
                Swal.fire(
                    'Cancelled!',
                    'Your file is safe :)',
                    'error')
                }
            })
        } 

function home(){
    window.location.href = "index.html";
}

function done(id){
    todoDB.find((todo) => todo.ID === parseFloat(id)).completed = !todoDB.find((todo) => todo.ID === parseFloat(id)).completed;
    setDB('todoDB', todoDB)
    renderPage()
}

function deletePreview(id){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `Yes, delete it!`
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            let newTodoDB = todoDB.filter((todo) => todo.ID !== parseFloat(id));
            setDB('todoDB', newTodoDB);
            renderPage()
            home()
        }else{
            Swal.fire(
                'Cancelled!',
                'Your file is safe :)',
                'error')
            }
      })
}

renderPage()