import { useState } from "react";

//import './App.css'
interface Todo {
  id: number;
  text: string;
}

function App() {
  const [input, setInput] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [done, setDone] = useState<Todo[]>([]);
  const [updateId, setUpdateId] = useState<number | null>(null);
  const [updatedata, setUpdatedata] = useState<string>("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setInput: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setInput(e.target.value);
  };

  const handleSubmit = (
    input: string,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    setInput: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (!input.trim()) return;
    const newTodo: Todo = { id: Date.now(), text: input };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  const handleDone = (
    id: number,
    todos: Todo[], 
    done: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>, 
    setDone: React.Dispatch<React.SetStateAction<Todo[]>>, 

  )=>{
    const doneTodo = todos.find(todo => todo.id === id);
    if(doneTodo){
      setTodos(todos.filter(todo => todo.id !== id));
      setDone([...done, doneTodo]);
    }

  }
  const handleDelete = (
    id: number, 
    todos: Todo[], 
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  ) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  const handleUpdate = (
    id: number, 
    setUpdateId: React.Dispatch<React.SetStateAction<number | null>>,
    updatedata: string, 
    todos: Todo[], 
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>, 
    setInput: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (!updatedata.trim()) return; 
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, text: updatedata } : todo
      )
    );
    setUpdateId(null); 
    setInput(''); 
  };
  return (
    <div className="bg-yellow-500  h-screen ">
      <div className=" items-center gap-y-5  flex flex-col">
        <h1 className=" text-7xl  font-extrabold text-blue-600  ">Todo App</h1>

        <div className="flex   gap-1.5 justify-center rounded-md items-centeri mb-4">
          <input
            onChange={(e) => handleInputChange(e, setInput)}
            value={input}
            type="text"
            className="border rounded-md  border-blue-600 border-3 px-8 p-2"
            placeholder="Add a todo..."
          />
          <button
            onClick={() => handleSubmit(input, todos, setTodos, setInput)}
            className="bg-blue-600 hover:bg-blue-900  rounded-md px-1.5 text-5xl text-white"
          >
            <h4 className="p-2">
              Add
            </h4>
            
          </button>
        </div>
      </div>

      <div className="flex px-24 py-7  flex-col">
        <h1 className="text-blue-600 font-bold text-4xl ">Todos</h1>
        <div className="bg-blue-600 text-white items-stretch  border-blue-800 rounded-md  gap-36 p-2">
          {todos.map((todo) => (
            <div key={todo.id} className="flex justify-between hover:font-bold hover:bg-blue-800 rounded-md px-1.5 py-2 items-center">
              <span className="">{todo.text}</span>
              <div className="flex gap-1.5">
                <button
                onClick={() => handleDone(todo.id, todos,done, setTodos,setDone)}  
                className="bg-green-500 text-white p-1.5 rounded-md">
                  Done
                </button>
                <button 
                onClick={() => handleDelete(todo.id, todos, setTodos)} 
                className="bg-red-500 text-white p-1.5 rounded-md">
                  Delete
                </button>
                <button
                  onClick={() => {
                    if (updateId === todo.id) {
                      handleUpdate(todo.id, setUpdateId, updatedata, todos, setTodos, setInput);
                    } else {
                      setUpdateId(todo.id);
                      setUpdatedata(todo.text);
                    }
                  }}
                  className="bg-blue-500 text-white p-1.5 rounded-md">
                  {updateId === todo.id ? "Save" : "Update"}
                  </button>
                  {updateId === todo.id && (
                <input
                  type="text"
                  value={updatedata}
                  onChange={(e) => setUpdatedata(e.target.value)} 
                  className="p-2 border border-gray-300 rounded-md w-full"
                  placeholder="Enter updated todo"
                />
              )}
              </div>
            </div>
          ))}
        </div>
        <h1 className="text-green-600 font-bold text-4xl">Done</h1>
        <div className="bg-green-600 text-white items-stretch  border-blue-800 gap-36 rounded-md p-2">
          
          {done.map((todo) => (
            <div key={todo.id} className="flex justify-between hover:font-bold hover:bg-green-800  rounded-md p-2 py-2 items-center">
              <span>{todo.text}</span>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
