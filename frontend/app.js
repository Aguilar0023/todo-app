const API = 'http://localhost:3000/tasks';

async function loadTasks() {
  const res = await fetch(API);
  const data = await res.json();
  const list = document.getElementById('tasks');
  list.innerHTML = '';
  data.forEach(t => {
    const li = document.createElement('li');
    li.textContent = t.title;
    li.className = t.completed ? 'done' : '';
    li.onclick = () => toggleTask(t.id, !t.completed);

    const del = document.createElement('button');
    del.textContent = '🗑️';
    del.onclick = (e) => { e.stopPropagation(); deleteTask(t.id); };

    li.appendChild(del);
    list.appendChild(li);
  });
}

async function addTask(title) {
  await fetch(API, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ title }) });
  await loadTasks();
}

async function toggleTask(id, completed) {
  await fetch(`${API}/${id}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ completed }) });
  await loadTasks();
}

async function deleteTask(id) {
  await fetch(`${API}/${id}`, { method:'DELETE' });
  await loadTasks();
}

document.getElementById('add').onclick = () => {
  const input = document.getElementById('title');
  if (input.value.trim()) addTask(input.value.trim());
  input.value = '';
};

window.onload = loadTasks;
