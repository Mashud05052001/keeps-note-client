import { axiosInstance } from "../components/tools";

type PostData = {
  title?: string;
  description?: string;
  creation_time?: string;
};
const handleResponse = (response: { ok: boolean; result: unknown }) => {
  if (!response.ok) {
    throw new Error("Founds Error During Data Upload");
  } else {
    return response.result;
  }
};

export const postData = async (data: PostData) => {
  const response = await axiosInstance.post("/addANote", data);
  return handleResponse(response.data);
};

export const getAllNotes = async (filterKey: string = "") => {
  let url = "/notes";
  if (filterKey !== "") url = `/notes/?filter=${filterKey}`;
  const response = await axiosInstance.get(url);
  return handleResponse(response.data);
};

export const getSingleNote = async (id: string) => {
  const response = await axiosInstance.get(`/note/${id}`);
  return handleResponse(response.data);
};

export const updateSingleNote = async (data: PostData) => {
  const response = await axiosInstance.patch("/updateNote", data);
  return handleResponse(response.data);
};

export const deleteANote = async (id: string) => {
  const response = await axiosInstance.delete(`/deleteANote/${id}`);
  return handleResponse(response.data);
};
