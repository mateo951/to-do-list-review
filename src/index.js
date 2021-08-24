/* eslint-disable */
import _, { intersection } from 'lodash'; /* eslint-enable */
import './style.css';
import Interactions from './modules/interactions.js';
import Tasks from './modules/tasks.js';

document.querySelector('#formTask').addEventListener('click', () => {
  Interactions.addTask();
  const input = document.querySelector("#formTask input[type='text']");
  input.value = '';
});

document.querySelector('#formTask').addEventListener('submit', () => {
  Interactions.addTask();
  const input = document.querySelector("#formTask input[type='text']");
  input.value = '';
});

const checkLocalInput = () => {
  const data = JSON.parse(localStorage.getItem('data'));
  if (data !== null) {
    Tasks.initializeTasks(data);
    data.forEach(element => {
      if (Interactions.hasValue(data[element])) {
        Interactions.updateDisplay(data[element]);
      }
    });
  }
};

const edit = function (taskH3) {
  const taskId = taskH3.id.substring(1);
  const editInput = document.getElementById(`e${taskId}`);
  const h3Text = document.getElementById(`d${taskId}`);
  const deleteIcon = document.getElementById(`i${taskId}`);
  const optionIcon = document.getElementById(`o${taskId}`);
  const editLi = document.getElementById(`l${taskId}`);

  if (taskH3 && editLi && editInput && h3Text && deleteIcon && optionIcon) {
    Interactions.editMode = !Interactions.editMode;
    if (editInput.value !== Tasks.tasksData[taskId].description) {
      if (!Interactions.editMode && editInput.value === '' && taskH3.tagName === 'INPUT') {
        Interactions.editMode = !Interactions.editMode; /* eslint-disable-next-line */
        removeTask(taskH3);
      } else if (Interactions.hasValue(editInput.value)) {
        Interactions.updateDesc(editInput.value, taskId, h3Text);
      }
    }

    h3Text.classList.toggle('edit');
    editLi.classList.toggle('editLi');
    optionIcon.classList.toggle('edit');
    editInput.classList.toggle('edit');
    deleteIcon.classList.toggle('edit');
    if (Interactions.editMode) {
      editInput.value = h3Text.innerText;
      editInput.focus();
    }
  }
};

window.toggleEdit = function (taskH3) {
  setTimeout(() => { edit(taskH3); }, 100);
};

window.removeTask = function (task) {
  Interactions.editMode = !Interactions.editMode;
  const taskSelected = document.getElementById(task.id);
  Interactions.removeTask(taskSelected.id.substring(1), false);
};

const clearCompleted = () => {
  const bttn = document.getElementById('clearCompleted');
  bttn.addEventListener('click', () => {
    const checkboxs = document.getElementsByClassName('checkbox');
    if (checkboxs) {
      Tasks.tasksData = Tasks.tasksData.filter((task) => !task.completed);
      const ul = document.getElementById('spawnTasks');
      ul.innerHTML = '';
      array.forEach(element => {
        Tasks.tasksData[element].index = i;
        Interactions.updateDisplay(Tasks.tasksData[element]);
      });
      Interactions.CheckInput();
    }
  });
};

clearCompleted();
checkLocalInput();