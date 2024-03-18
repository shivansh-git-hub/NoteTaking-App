import {createContext, useContext} from "react"

export const NoteContext = createContext({
    notes: [
        {
           id: 1,
           note: "Note msg",
           completed: false, 
        }
    ],
    addNote: (note) => {},
    updateNote: (id, note) => {},
    deleteNote: (id) => {},
    toggleComplete: (id) => {}
})

export const useNote = () => {
    return useContext(NoteContext)
}

export const NoteProvider = NoteContext.Provider