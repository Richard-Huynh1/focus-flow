import TaskItem from './TaskItem.jsx';

export default function TaskList({ tasks, onDelete }) {
  if (tasks.length === 0) {
    return <p className="text-center">There are no tasks to display.</p>;
  }

  return (
    <ul className="w-5/6">
      {tasks.map((task) => (
        <TaskItem key={task.id} id={task.id} onDelete={onDelete}>
          {task.text}
        </TaskItem>
      ))}
    </ul>
  );
}
