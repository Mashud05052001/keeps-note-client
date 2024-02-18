import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import AllNotes from "../pages/notes/AllNotes";
import AddNotes from "../pages/addNotes/AddNotes";
import Layout from "../layout/Layout";
import SingleNoteDetails from "../pages/notes/SingleNoteDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <AllNotes />,
      },
      {
        path: "/note/:id",
        element: <SingleNoteDetails />,
      },
      {
        path: "/addNote",
        element: <AddNotes />,
      },
    ],
  },
]);
