// src/App.jsx
import { useState } from 'react';

function App() {
  // 1. タスク一覧の state
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Reactの基礎を復習する', done: false },
    { id: 2, text: '牛乳を買う', done: true },
  ]);

  // 2. 入力フォームの文字列 state
  const [inputText, setInputText] = useState('');

  // タスクの追加
  const addTask = (e) => {
    e.preventDefault();
    // 空文字（スペースのみも含む）は追加しない
    if (!inputText.trim()) return;

    const newTask = {
      id: Date.now(),
      text: inputText,
      done: false,
    };

    // push ではなくスプレッド構文で新しい配列を作成
    setTasks([...tasks, newTask]);
    setInputText('');
  };

  // 完了フラグの反転
  const toggleTask = (id) => {
    // map を使って対象タスクの done だけを反転させた新しい配列を作る
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  // タスクの削除
  const deleteTask = (id) => {
    // filter を使って対象ID以外のタスクで構成された新しい配列を作る
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          タスク管理アプリ
        </h1>

        {/* タスク入力フォーム */}
        <form onSubmit={addTask} className="flex gap-2 mb-6">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="新しいタスクを入力..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            追加
          </button>
        </form>

        {/* タスク一覧 */}
        <ul className="space-y-3">
          {tasks.length === 0 ? (
            <p className="text-gray-400 text-center py-4">タスクはありません</p>
          ) : (
            tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div
                  onClick={() => toggleTask(task.id)}
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => {}} // onClick で制御するため空
                    className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                  />
                  <span
                    className={`${
                      task.done
                        ? 'line-through text-gray-400'
                        : 'text-gray-700 font-medium'
                    }`}
                  >
                    {task.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700 text-sm px-2 py-1 transition"
                >
                  削除
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;