document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to save tasks to local storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(function(task, index) {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">${task.name}</span>
                <span class="delete-btn">Delete</span>
            `;
            li.querySelector('.delete-btn').addEventListener('click', function() {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });
            li.addEventListener('click', function() {
                task.completed = !task.completed;
                saveTasks();
                renderTasks();
            });
            taskList.appendChild(li);
        });
    }

    // Add new task
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const taskName = taskInput.value.trim();
        if (taskName !== '') {
            tasks.push({ name: taskName, completed: false });
            saveTasks();
            renderTasks();
            taskInput.value = '';
        }
    });

    // Initial rendering
    renderTasks();
});
