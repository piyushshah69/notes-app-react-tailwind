import { useState } from "react"
import 'animate.css';

const Note = ({ note, onDelete, index }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(note.title);
    const [updatedNote, setUpdatedNote] = useState(note.note);
    const [isNoteEmpty, setIsNoteEmpty] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const handleDeleteClick = () => {
        onDelete(index)
    }

    const handleSaveClick = () => {
        if (updatedTitle == '') {
            setUpdatedTitle('Untitled');
        }
        if (updatedNote == '') {
            setIsNoteEmpty(true);
        } else {
            setIsEditing(false);
            setIsNoteEmpty(false);
        }
    }

    const handleEditClick = () => {
        setIsEditing(true);
    }

    return (
        <>
            <div className="w-full border border-slate-300 flex flex-col justify-start p-4 gap-2.5 rounded-lg shadow-md cursor-pointer transition-all hover:shadow-xl">
                {isEditing ? (
                    <>
                        <input maxLength={60} className="text-lg font-bold capitalize focus:outline-none text-blue-700" value={updatedTitle} onChange={e => setUpdatedTitle(e.target.value)} />

                        <textarea rows={6} className="resize-none rounded-md border border-slate-300 p-1 focus:outline-none" value={updatedNote} onChange={e => setUpdatedNote(e.target.value)} />
                    </>
                ) : (
                    <>
                        <h2 className="text-lg font-bold capitalize rounded-md whitespace-pre-wrap focus:outline-none">{updatedTitle}</h2>

                        <p className="rounded-md whitespace-pre-wrap focus:outline-none">{updatedNote.length > 200
                            ?
                            (updatedNote.slice(0, 200) + '...')
                            : updatedNote}
                        </p>
                    </>
                )}

                {isNoteEmpty && <p className="text-red-700 animate__animated animate__shakeX">*Note cannot be empty*</p>}

                <div className="w-full flex gap-2">
                    {isEditing ? (
                        <button onClick={handleSaveClick}
                            className="px-4 py-1 mt-2 font-semibold text-lg tracking-tighter bg-green-600 text-white transition-all hover:scale-[1.01] rounded-lg"
                        >
                            Save
                        </button>
                    )
                     : (
                        <button onClick={handleEditClick}
                            className="px-4 py-1 mt-2 font-semibold text-lg tracking-tighter bg-blue-600 text-white transition-all hover:scale-[1.01] rounded-lg"
                        >
                            Edit
                        </button>
                    )}
                    <button onClick={handleDeleteClick}
                        className="px-4 py-1 mt-2 font-semibold text-lg tracking-tighter bg-red-600 text-white transition-all hover:scale-[1.01] rounded-lg"
                    >
                        Delete
                    </button>
                    {updatedNote.length > 200 && (
                        <button onClick={() => setIsPreviewOpen(true)}
                            className="px-4 py-1 mt-2 font-medium text-lg tracking-tighter bg-red-600 text-white transition-all hover:scale-[1.01] rounded-lg"
                        >
                            Read more
                        </button>
                    )}
                </div>
            </div>

            {isPreviewOpen && (
                <div className="fixed flex justify-center items-center w-full h-screen px-6 top-0 left-0  bg-transperent">
                    <div className="bg-slate-700 max-h-[90vh] w-full p-8 md:p-12 max-w-2xl rounded-xl flex flex-col gap-4">
                        <h2 className="text-white font-medium text-2xl h-2/6 whitespace-pre-wrap">{updatedTitle}</h2>
                        <p className="text-white h-4/6 overflow-y-auto whitespace-pre-wrap">{updatedNote}</p>
                        <button onClick={() => setIsPreviewOpen(false)}
                            className="px-4 py-2 mt-2 font-semibold text-lg tracking-tighter bg-red-600 text-white transition-all hover:scale-[1.01] rounded-lg"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Note


