import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteANote,
  getSingleNote,
  updateSingleNote,
} from "../../utilities/https";
import { MdModeEdit, MdDelete } from "react-icons/md";
import React, { Ref, useRef, useState } from "react";
import { queryClient } from "../../components/tools";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";

const SingleNoteDetails = () => {
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const params = useParams();
  const navigate = useNavigate();
  const { data: noteInfo, isPending } = useQuery<NoteType, Error>({
    queryKey: ["notes", { id: params.id }],
    queryFn: () => getSingleNote(params.id!),
    staleTime: 10 * 1000,
  });
  console.log("Mashudur Rahman Mahi", isPending);
  const { mutate } = useMutation({
    mutationFn: updateSingleNote,
    onMutate: async (data) => {
      const query = ["notes", { id: params.id }];
      // cancelling query to avoid old server data
      await queryClient.cancelQueries({
        queryKey: query,
      });
      // getting previous data (note)
      const previousData = queryClient.getQueriesData(query);
      // setting updated data
      queryClient.setQueryData(query, data);
      return { previousData };
    },
    onSuccess: () => {
      setIsUpdate(false);
      toast.success("Data Updated Successfully.");
    },
    onError: (_error, _data, context) => {
      // console.log(error, data);
      queryClient.setQueryData(
        ["notes", { id: params.id }],
        context?.previousData
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes", { id: params.id }],
      });
    },
  });
  const checkDisableOrNot = () => {
    if (
      title.current?.value === noteInfo?.title &&
      description.current?.value === noteInfo?.description
    )
      setIsDisable(true);
    else setIsDisable(false);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const title = formdata.get("title") as string,
      description = formdata.get("description") as string;
    const data = { title, description, _id: noteInfo._id };
    mutate(data);
  };
  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Are you sure to delete the note?");
    if (confirm) {
      const result = await deleteANote(id);
      if (result.deletedCount > 0) {
        queryClient.invalidateQueries({
          queryKey: [["notes"]],
        });
        queryClient.invalidateQueries({
          queryKey: [["notes", { id: params.id }]],
        });
        navigate("/");
      }
    }
  };

  if (isPending) return <Loader />;
  return (
    <div className="max-w-2xl mx-auto mt-10  px-5 md:px-0">
      {/* <div className="max-w-lg mx-auto mt-10 space-y-5"> */}
      <form className=" space-y-5" onSubmit={handleSubmit}>
        <div className="flex justify-between items-center space-x-5">
          {isUpdate ? (
            <input
              ref={title}
              onKeyUp={checkDisableOrNot}
              type="text"
              name="title"
              defaultValue={noteInfo?.title}
              className="input input-bordered min-w-80 focus:outline-none text-xl font-semibold pb-1"
            />
          ) : (
            <div>
              <h1 className="text-2xl font-semibold">{noteInfo?.title}</h1>
              <p className="text-sm tracking-wider">
                {noteInfo?.creation_time}
              </p>
            </div>
          )}
          <div className="flex">
            <div
              className="btn btn-ghost hover:bg-transparent btn-xs hover:text-blue-700 cursor-pointer duration-100"
              onClick={() => {
                setIsUpdate(!isUpdate);
                setIsDisable(true);
              }}
            >
              <MdModeEdit size={25} />
            </div>
            <div
              className="btn btn-ghost hover:bg-transparent btn-xs hover:text-red-600 cursor-pointer duration-100"
              onClick={() => handleDelete(noteInfo._id)}
            >
              <MdDelete size={25} />
            </div>
          </div>
        </div>
        <div>
          {isUpdate ? (
            <textarea
              ref={description}
              onKeyUp={checkDisableOrNot}
              placeholder="Details"
              name="description"
              defaultValue={noteInfo?.description}
              className="textarea textarea-bordered min-w-full h-32 focus:outline-none"
              required
            />
          ) : (
            <p>{noteInfo?.description}</p>
          )}
        </div>
        {isUpdate && (
          <button
            className="btn bg-[#ffc14f39] hover:bg-[#ffc14f] font-bold text-lg"
            disabled={isDisable}
          >
            Update Note
          </button>
        )}
      </form>
    </div>
  );
};

export default SingleNoteDetails;
