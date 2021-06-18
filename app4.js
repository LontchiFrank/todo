
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const taskInput = document.querySelector('#task');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

    loadEventListeners();

    function loadEventListeners() {
        //DOM load event
        document.addEventListener('DOMContentLoaded', getTask)
        form.addEventListener('submit', addTask);
        taskList.addEventListener('click', removeTask);
        clearBtn.addEventListener('click', clearTasks);
        filter.addEventListener('keyup', filterTasks);
    }
    //Get Tasks from LS
    function getTask() {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        }else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.forEach(function(task){
             //create element li
       const li = document.createElement('li');
       li.className = 'collection-item';
       //appened text node
       li.appendChild(document.createTextNode(task));
       //create link
       const link = document.createElement('a');
       //add classname
       link.className = 'delete-item secondary-content';
       //add innerhtml
       link.innerHTML = '<i class="fa fa-remove" ></i>'
       //append link to li
       li.appendChild(link);
       //append li to ul
       taskList.appendChild(li);
        })
    }
    //Add Task
    function addTask(e) {
        if (taskInput.value === '' ) {
            alert('Add a task');
        }
       //create element li
       const li = document.createElement('li');
       li.className = 'collection-item';
       //appened text node
       li.appendChild(document.createTextNode(taskInput.value));
       //create link
       const link = document.createElement('a');
       //add classname
       link.className = 'delete-item secondary-content';
       //add innerhtml
       link.innerHTML = '<i class="fa fa-remove" ></i>'
       //append link to li
       li.appendChild(link);
       //append li to ul
       taskList.appendChild(li);
        //store in Local storage
        storeTaskInLocalStorage(taskInput.value);
       //clear Input 
       taskInput.value = '';


        e.preventDefault();
    }

    //store LS
    function storeTaskInLocalStorage(task){
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        }else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks))


    }

    //Remove task
    function removeTask(e) {
        if (e.target.parentElement.classList.contains('delete-item')) {
            if (confirm('Are you sure')) {
                e.target.parentElement.parentElement.remove();
            
                //Remove from LS
                removeTaskfromLocalStorage( e.target.parentElement.parentElement);
            }
        }
    }
    //removeTaskfromLocalStorage
    function removeTaskfromLocalStorage(taskItem) {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        }else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
       tasks.forEach(function(task,index) {
        if (taskItem.textContent === task ) {
            tasks.splice(index , 1);
        }
       });
       localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    //Clear All Task
function clearTasks(e){
    taskList.innerHTML = '';
    // while(taskList.firstChild){
    //     taskList.removeChild(taskList.firstChild);
    // }

    //clear all tasks from LS
    clearTasksfromLocalStorage();
}
//clear all task from LS
function clearTasksfromLocalStorage() {
    localStorage.clear();
}
//filter Task
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        function(task) {
            const item = task.firstChild.textContent;

            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            }else{
                task.style.display = 'none';
            }
        }
    )
}