import React, { useState } from 'react'
import { useNote } from '../contexts';

function NoteItem({ note }) {

    const [isNoteEditable, setIsNoteEditable] = useState(false)
    const [noteMsg, setNoteMsg] = useState(note.note)

    const {updateNote, deleteNote, toggleComplete} = useNote()

    const editNote = () => {
        updateNote(note.id, {...note, note: noteMsg})
        setIsNoteEditable(false)
    }

    const toggleCompleted = () => {
        toggleComplete(note.id)
    }

    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
                note.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={note.completed}
                onChange={toggleCompleted}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isNoteEditable ? "border-black/10 px-2" : "border-transparent"
                } ${note.completed ? "line-through" : ""}`}
                value={noteMsg}
                onChange={(e) => setNoteMsg(e.target.value)}
                readOnly={!isNoteEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (note.completed) return;

                    if (isNoteEditable) {
                        editNote();
                    } else setIsNoteEditable((prev) => !prev);
                }}
                disabled={note.completed}
            >
                {isNoteEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Note Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteNote(note.id)}
            >
                ❌
            </button>
        </div>
    );
}

export default NoteItem;

