import { useState, useRef, useLayoutEffect } from 'react';

export default function TaskItem({ children, id, onDelete }) {
  const [taskState, setTaskState] = useState({
    isChecked: false,
    isEditing: false,
    text: children || '',
  });
  const [value, setValue] = useState(children || '');
  const textareaRef = useRef(null);

  useLayoutEffect(() => {
    const element = textareaRef.current;
    if (!element) return;

    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  }, [value, taskState.isEditing]);

  let cssClasses = 'w-lg inline-block wrap-break-word';
  if (taskState.isChecked && !taskState.isEditing) {
    cssClasses += ' line-through';
  }

  let textElement = !taskState.isEditing ? (
    <span className={cssClasses}>{taskState.text}</span>
  ) : (
    <textarea
      ref={textareaRef}
      className={cssClasses + ' resize-none'}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      rows="1"
    />
  );

  function handleEdit() {
    if (taskState.isEditing && taskState.text.trim() !== '') {
      setTaskState((prevTaskState) => ({
        ...prevTaskState,
        isEditing: false,
        text: value.trim(),
      }));
      setValue((prevValue) => prevValue.trim());
    } else {
      setTaskState((prevTaskState) => ({
        ...prevTaskState,
        isEditing: !prevTaskState.isEditing,
      }));
    }
  }

  return (
    <li className="flex gap-2">
      <input
        type="checkbox"
        checked={taskState.isChecked}
        onChange={() =>
          setTaskState((prevTaskState) => ({
            ...prevTaskState,
            isChecked: !prevTaskState.isChecked,
          }))
        }
      />
      {textElement}
      <button onClick={handleEdit} className="bg-white">
        {taskState.isEditing ? 'Stop editing' : 'Edit'}
      </button>
      <button className="bg-red-400" onClick={() => onDelete(id)}>Delete task</button>
      <button className="bg-green-400">Focus task</button>
    </li>
  );
}
