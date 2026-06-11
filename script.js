//VARIABLES
const savedTasks = localStorage.getItem("tasks");
const addBtn = document.querySelector('.add_btn');
const taskList = document.querySelector('.list_of_tasks');
const taskInput = document.querySelector('.task_title');
let tasks = [];
//VARIABLES

//FUNCTIONS
function saveTasks(){
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTaskElement(task){
	const li = document.createElement('li');
	const p = document.createElement('p');
	const doneBtn = document.createElement('input');
	doneBtn.type = 'checkbox';
	doneBtn.classList.add('checkbox');
	const deleteBtn = document.createElement('button');

	li.classList.add('task_element')
	p.textContent = task.title;

	if(task.done === true){
		li.classList.add('done');
		doneBtn.checked = true;
	}
	doneBtn.addEventListener('click', () => {
		const index = tasks.findIndex(item => item.id === task.id);
		li.classList.toggle('done');
		tasks[index].done = !tasks[index].done;
		saveTasks();
	});
	li.appendChild(doneBtn);

	deleteBtn.textContent = 'DELETE';
	deleteBtn.addEventListener('click', (e) => {
		const parent = e.target.parentElement;

		const del = tasks.findIndex(item => item.id === task.id);
		if (del !== -1) {
 			tasks.splice(del, 1);
		}
		parent.remove();
		saveTasks();
	});
	deleteBtn.classList.add("delete_btn")
	li.appendChild(p);
	li.appendChild(deleteBtn);

	taskList.appendChild(li);
}
function addTask(){
	const taskTitle = taskInput.value;
	if(taskTitle.trim() !== ''){
		const newTask = {
			id: Date.now(),
			title: taskTitle,
			done: false
		}
		tasks.push(newTask)
		createTaskElement(newTask);
		saveTasks()

	}
	taskInput.value = '';
}
//FUNCTIONS

if(savedTasks !== null){
	tasks = JSON.parse(savedTasks);
	
	tasks.forEach((task)=>{
		createTaskElement(task)
	});
}



addBtn.addEventListener('click', () => {
	addTask()
});

taskInput.addEventListener('keydown', (e) => {
	if(e.code === "Enter"){
		addTask()
	}
})