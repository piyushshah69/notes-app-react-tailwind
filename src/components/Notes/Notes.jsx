import { useState } from "react"
import 'animate.css';
import Note from "../Note/Note"

const Notes = () => {

    const [notes, setNotes] = useState([]);

    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const [isNoteEmpty, setIsNoteEmpty] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (note == '') {
            setIsNoteEmpty(true)
        } else {
            notes.push({
                id: (notes.length),
                title: (title == '' ? 'Untitled' : title),
                note: note
            })
            setIsNoteEmpty(false)
        }

        setTitle('');
        setNote('');
    }

    const handleDelete = (noteIndex) => {
        const updatedNotes = [...notes];
        updatedNotes.splice(noteIndex, 1);
        setNotes(updatedNotes);
    }

    return (
        <div className="w-full py-4 flex flex-col items-center gap-8">
            <div className="w-full px-6 max-w-xl flex flex-col gap-1.5">
                <div className="mt-2">
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        type="text"
                        name="inputname"
                        placeholder="Title"
                        maxLength={60}
                        className="text-xl block w-full rounded-md p-2 ring-1 ring-inset ring-gray-500 focus:text-gray-800"
                    />
                </div>
                <div className="mt-2">
                    <textarea
                        value={note}
                        onChange={e => setNote(e.target.value)}
                        type="text"
                        rows={5}
                        name="inputname"
                        placeholder="Note"
                        className="text-xl block w-full rounded-md p-2 ring-1 ring-inset ring-gray-500 focus:text-gray-800"
                    />
                </div>
                {isNoteEmpty && <p className="text-red-700 animate__animated animate__shakeX">*Note cannot be empty*</p>}
                <form onSubmit={handleSubmit} className="w-full">
                    <button type="submit"
                        className="w-full px-4 py-2 mt-2 font-semibold text-lg tracking-tighter bg-green-600 text-white transition-all hover:scale-[1.01] rounded-lg"
                    >
                        Add
                    </button>
                </form>

            </div>

            <div className="w-full px-6 max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {notes.map((note, idx) => {
                    return <Note key={note.title} index={idx} note={note} onDelete={handleDelete} />
                })}
            </div>
        </div>
    )
}

export default Notes

