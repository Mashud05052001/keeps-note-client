import { useQuery } from "@tanstack/react-query";
import { getAllNotes } from "../../utilities/https";
import SingleNote from "./SingleNote";
import { FormEvent, useEffect, useRef, useState } from "react";

const AllNotes = () => {
  const [filterKey, setFilterKey] = useState<string>("");
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const {
    data: notes,
    isFetching,
    isLoading,
  } = useQuery<NoteType[], Error>({
    queryKey: ["notes", { mySearchTerm: filterKey }],
    queryFn: () => getAllNotes(filterKey),
  });
  const [firstTimeLoading, setFirstTimeLoading] = useState(isLoading);
  useEffect(() => {
    if (!isLoading) setFirstTimeLoading(false);
  }, [isLoading]);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    setFilterKey(form.filter.value);
  };
  let content;
  if ((isFetching && filterKey !== "") || firstTimeLoading) {
    content = (
      <div className="font-bold text-center mt-10 text-xl">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else if (notes?.length > 0) {
    content = (
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10 px-8 xl:px-0">
        {notes &&
          notes?.map((note) => <SingleNote key={note?._id} note={note} />)}
      </section>
    );
  } else {
    content = (
      <>
        <h1 className="text-red-600 font-bold text-center mt-10 text-xl">
          No notes available with this title `{filterKey}`
        </h1>
      </>
    );
  }
  return (
    <div>
      <div className="flex justify-center my-6 ">
        <form onSubmit={handleSubmit} className="space-x-3">
          <input
            onKeyUp={(e) => {
              const form = e.target as HTMLInputElement;
              if (form.value === "") setFilterKey("");
              setIsDisable(form.value === "");
            }}
            name="filter"
            type="text"
            placeholder="Provide Title For Searching"
            className="w-80 input input-bordered focus:outline-none text-lg"
          />
          <button
            type="submit"
            className="btn btn-ghost bg-[#ffc14f39] duration-100 hover:bg-[#ffc14f] px-8 text-lg"
            disabled={isDisable}
          >
            Search
          </button>
        </form>
      </div>
      {content}
    </div>
  );
};

export default AllNotes;
