import { Link } from "react-router-dom";
type PropsType = {
  note: NoteType;
};

const SingleNote = ({ note }: PropsType) => {
  return (
    <div className="border-2 border-gray-500 border-opacity-30 shadow-md rounded-md p-3 flex flex-col">
      <div className="flex-grow">
        <Link to={`/note/${note?._id}`}>
          <h1 className="text-xl font-semibold pb-3 link-hover cursor-pointer">
            {note.title}
          </h1>
        </Link>
        <p className="text-sm tracking-wider">{note.description}</p>
      </div>
    </div>
  );
};

export default SingleNote;
