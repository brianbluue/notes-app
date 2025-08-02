import { useState, useEffect } from 'react';
import axios from 'axios';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';



const api = 'http://localhost:3001/notes';

function App() {
  const [count, setCount] = useState(0);
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    axios.get(api).then(res => setNotes(res.data));

  }, []);

  const addNote = async () => {
    const res = await axios.post(api, {text});
    setNotes([...notes, res.data]); 
    setText(''); 


    const deleteNote = async (id) => {
      await axios.delete(`${api}/${id}`);
    };



  return (
    <>
      <div>


           //Notes Appp
        <h1>My Notes</h1>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={addNote}>Add</button>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            {note.text} <button onClick={() => deleteNote(note.id)}>❌</button>
          </li>
        ))}


        //Vite 
      </ul>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
