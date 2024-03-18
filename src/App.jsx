import { useEffect, useState } from 'react'
import './App.css'
import { NoteProvider } from './contexts'
import NoteForm from './components/NoteForm'
import NoteItem from './components/NoteItem'

function App() {
  const [notes, setNotes] = useState([])

  const addNote = (note) => {
    setNotes((prev) => [{id: Date.now(), ...note}, ...prev])
  }

  const updateNote = (id, note) => {
    setNotes((prev) => prev.map((prevNote) => (prevNote.id === id ? note : prevNote)))
  }

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id))
  }

  const toggleComplete = (id) => {
    setNotes((prev) => prev.map((prevNote) => prevNote.id === id ? {...prevNote, completed: !prevNote.completed} : prevNote))
  }

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem("notes"))

    if(notes && notes.length > 0) {
      setNotes(notes)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  return (
    <NoteProvider value={{notes, addNote, updateNote, deleteNote, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Notes</h1>
                    <div className="mb-4">
                        {/* Note form goes here */} 
                        <NoteForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add NoteItem here */}
                        {notes.map((note) => (
                          <div key={note.id}
                          className='w-full'
                          >
                            <NoteItem note={note}/>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </NoteProvider>
  )
}

export default App
