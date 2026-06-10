import React, { useState, ChangeEvent } from 'react';
import './App.less'
// 定义 Todo 项的类型
interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  // 使用状态来追踪 Todo 列表和输入框的值
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  // 处理输入框值变化的函数
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  // 处理添加 Todo 的函数
  const handleAddTodo = (): void => {
    if (inputValue.trim() !== '') {
      setTodos((prevTodos: any) => [
        ...prevTodos,
        {
          id: Date.now(),
          text: inputValue.trim(),
          completed: false,
        },
      ]);
      setInputValue('');
    }
  };

  // 处理完成/未完成 Todo 的函数
  const handleToggleTodo = (id: number): void => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 处理删除 Todo 的函数
  const handleDeleteTodo = (id: number): void => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className='todo-contaier'>
      <div className='todo-contaier-warp'>
        <h1 className='todo-contaier-warp-header'>Todos</h1>
        <div className='todo-contaier-warp-input'>
          <input
            type="text"
            className='todo-contaier-warp-input-conent'
            placeholder="Add a new todo"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button onClick={handleAddTodo}>Add Todo</button>
        </div>
        <ul className='todo-contaier-warp-list'>
          {todos.map((todo) => (
            <li key={todo.id} className='todo-contaier-warp-list-item'>
              <span
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                }}
              >
                {todo.text}
              </span>
              <button onClick={() => handleToggleTodo(todo.id)}>
                {todo.completed ? 'Mark as Undone' : 'Mark as Done'}
              </button>
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
