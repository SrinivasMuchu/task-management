import React from 'react';
import { useNavigate } from 'react-router-dom';

function TaskList() {
  const nav = useNavigate()
  // Example task data
  const tasks = [
    { id: 1, title: 'Complete React assignment', dueDate: '2024-10-01', status: 'Pending' },
    { id: 2, title: 'Review PRs', dueDate: '2024-09-30', status: 'In Progress' },
    { id: 3, title: 'Prepare presentation', dueDate: '2024-10-03', status: 'Completed' }
  ];

  return (
    <div style={{ marginTop: '100px',marginLeft:'200px' }}>
      <div>
        <span>My Tasks</span>
        <button onClick={()=>nav('/task-template')}>Create Template</button>
        <button onClick={()=>nav('/task-form')}>Create Task</button>
      </div>
      <div>
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Task Title</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.dueDate}</td>
                <td>{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskList;
