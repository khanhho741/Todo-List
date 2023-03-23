const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = ()=> {
    // lấy giá trị khi user nhập vào !
    let userEnteredValue=inputBox.value;

    // Nếu user nhập vào giá trị ( không phải khoảng trắng )
    if(userEnteredValue.trim() != 0) {
        // Nút add sẽ sáng lên - Trường hợp nhập khoảng trắng sẽ không sáng
        addBtn.classList.add("active");
    } else {
        // Ngược lại thì không sáng !
        addBtn.classList.remove("active");
    }
}

showTasks();
// Thao tác nút Add
addBtn.onclick = ()=> {
    // khi user nhấn vào nút Add
    // Lấy giá trị mà user đã nhập ở ô input
    let userEnteredValue = inputBox.value;
    
    // Lấy LocalStorage ( biến lưu trữ cục bộ )
    let getLocalStorageData = localStorage.getItem("New todo");
    
    if(getLocalStorageData == null) {
        // Nếu như Local = null, Tạo 1 mảng rỗng
        listArray = [];
    } else {
        // Ngược lại thì sẽ chuyển JSON từ String sang Object
        listArray = JSON.parse(getLocalStorageData);
    }
    // Đẩy giá trị mới vào mảng đã tạo !
    listArray.push(userEnteredValue);
    localStorage.setItem("New todo", JSON.stringify(listArray)); // Chuyển JSON từ object sang string

    showTasks();
    addBtn.classList.remove("active");
}

function showTasks() {
    let getLocalStorageData = localStorage.getItem("New todo");
    
    if(getLocalStorageData == null) {
        // Nếu như Local = null, Tạo 1 mảng rỗng
        listArray = [];
    } else {
        // Ngược lại thì sẽ chuyển JSON từ String sang Object
        listArray = JSON.parse(getLocalStorageData);
    }
    const pendingTasksNumb = document.querySelector(".pendingTask");
    pendingTasksNumb.textContent = listArray.length;
    if(listArray.length > 0) {
        deleteAllBtn.classList.add("active");
    } else {
        deleteAllBtn.classList.remove("active");
    }

    let newLiTag = "";
    listArray.forEach((element, index) => {
        newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag;
    inputBox.value = "";
}

function deleteTask(index){
    let getLocalStorageData = localStorage.getItem("New todo");
    listArray = JSON.parse(getLocalStorageData);
    listArray.splice(index, 1);
    localStorage.setItem("New todo", JSON.stringify(listArray));
    showTasks();
}

deleteAllBtn.onclick = ()=>{
    listArray = [];
    localStorage.setItem("New todo", JSON.stringify(listArray));
    showTasks();
}

// End.