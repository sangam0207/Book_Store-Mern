import  { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
function DeleteBook() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleDeleteBook = async () => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5555/books/${id}`);
      setLoading(false);
      navigate('/')
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("Something went wrong Please Check in console");
    }
  };
  return (
    <div className="p-4">
      <BackButton />
      <div className="text-center mt-0">
  <h1 className="text-3xl my-4">Delete Book</h1>
</div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
          <h3 className="text-2xl">
            Are You Sure You want to delete this book ?
          </h3>
          <button
            className="p-4 bg-red-600 text-white m-8 w-full"
            onClick={handleDeleteBook}
          >
            {" "}
            Yes,Delete it
          </button>
        </div>
      )}
    </div>
  );
}

export default DeleteBook;
