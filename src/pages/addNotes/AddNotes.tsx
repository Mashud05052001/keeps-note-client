import { useMutation } from "@tanstack/react-query";
import { FormEvent } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { postData } from "../../utilities/https";
import { queryClient } from "../../components/tools";

const AddNotes = () => {
  let formData;
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: postData,
    onSuccess(data) {
      if (data.acknowledged) {
        queryClient.invalidateQueries({ queryKey: ["notes"] });
        toast.success("Notes Added Successfully.");
        navigate("/");
      }
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string,
      description = formData.get("details") as string,
      creation_time = moment().format("LLLL");
    const data = { title, description, creation_time };
    mutate(data);
  };
  return (
    <div className="absolute left-1/2 top-1/4 -translate-x-1/2 ">
      <form
        className="p-5 flex flex-col space-y-5 border-2 rounded-md border-gray-200 border-opacity-50 shadow-md"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Title"
          name="title"
          className="input input-bordered w-96 focus:outline-none"
          required
        />
        <textarea
          placeholder="Details"
          name="details"
          className="textarea textarea-bordered w-96 h-32 focus:outline-none"
          required
        />
        <button className="btn bg-[#ffc14f39] hover:bg-[#ffc14f] font-bold text-lg">
          Add Notes
        </button>
      </form>
    </div>
  );
};

export default AddNotes;
