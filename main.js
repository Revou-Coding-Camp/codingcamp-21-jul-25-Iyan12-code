let tasks = [];
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  const filterBtn = document.getElementById('filter');
  const dropdownMenu = document.getElementById('dropdown-menu');

  // Isi dropdown dengan innerHTML
  dropdownMenu.innerHTML = `
    <div onclick="applyFilter('all')" class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Semua</div>
    <div onclick="applyFilter('done')" class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Selesai</div>
    <div onclick="applyFilter('pending')" class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Belum Selesai</div>
  `;

  // Tampilkan/sembunyikan dropdown saat tombol diklik
  filterBtn.addEventListener('click', () => {
    dropdownMenu.classList.toggle('hidden');
  });
});

function addTask() {
  const taskInput = document.getElementById('task-input');
  const dateInput = document.getElementById('date-input');

  if (taskInput.value === "" || dateInput.value === "") {
    alert("Tolong masukkan datanya");
    return;
  }

  tasks.push({
    title: taskInput.value,
    date: dateInput.value,
    done: false
  });

  taskInput.value = "";
  dateInput.value = "";
  renderTask();
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  renderTask();
}

function removeTask(index) {
    tasks.splice(index, 1);
    renderTask();
}

function removeAllTask() {
    if (tasks.length === 0) {
        alert("Tidak ada task untuk dihapus.");
        return;
    }
    if (confirm("Yakin ingin menghapus semua task?")) {
        tasks = [];
        renderTask();
    }
}

function applyFilter(filter) {
  currentFilter = filter;
  renderTask();

  const dropdownMenu = document.getElementById('dropdown-menu');
  dropdownMenu.classList.add('hidden');
}

function renderTask() {
  const list = document.getElementById('todo-list');
  list.innerHTML = '';

  let filteredTasks = tasks;
  if (currentFilter === 'done') {
    filteredTasks = tasks.filter(task => task.done);
  } else if (currentFilter === 'pending') {
    filteredTasks = tasks.filter(task => !task.done);
  }else if(currentFilter === 'all') {
    filteredTasks = tasks.filter(task => task.title)
  }

  if (filteredTasks.length === 0) {
    list.innerHTML = `
      <tr>
        <td colspan="4" class="text-gray-600 text-center py-4">Task Not Found</td>
      </tr>
    `;
    return;
  }

  filteredTasks.forEach((task, index) => {
    const row = `
      <tr>
        <td class="border-b p-2">${task.title}</td>
        <td class="border-b p-2">${task.date}</td>
        <td class="border-b p-2">${task.done ? 'Selesai' : 'Belum selesai'}</td>
        <td class="border-b ">
          <button onclick="toggleDone(${index})" class="text-blue-600 mr-4">${task.done ? 'Undo' : 'Selesai'}</button>
          <button onclick="removeTask(${index})" class="text-red-600">Hapus</button>
        </td>
      </tr>
    `;
    list.innerHTML += row;
  });
}
