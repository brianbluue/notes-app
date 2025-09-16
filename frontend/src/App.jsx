import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const api = 'http://localhost:3001/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState('');

  // fetch notes when component mounts
  useEffect(() => {
    axios.get(api).then(res => setNotes(res.data));
  }, []);

  // add note
  const addNote = async () => {
    const res = await axios.post(api, { text });
    setNotes([...notes, res.data]);
    setText('');
  };

  // delete note
  const deleteNote = async (id) => {
    await axios.delete(`${api}/${id}`);
    setNotes(notes.filter(note => note.id !== id)); // update state
  };

  // render
  return (
    <>
      <h1>My Notes</h1>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={addNote}>Add</button>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            {note.text}{' '}
            <button onClick={() => deleteNote(note.id)}>❌</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
