import { useRef } from 'react';

export default function AddTaskForm({ onAddTask }) {
  const input = useRef(null);

  function addTask() {
    const value = input.current.value.trim();
    input.current.value = '';
    onAddTask(value);
  }

  return (
    <form
      className="flex justify-center w-full"
      onSubmit={(event) => {
        event.preventDefault();
        addTask();
      }}
    >
      <textarea className="bg-white w-lg" ref={input}></textarea>
      <input type="submit" className="bg-red-100" value="+" />
    </form>
  );
}
