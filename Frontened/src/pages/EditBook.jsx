import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function EditBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    const getSingleBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/books/${id}`);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setTitle(response.data.title);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getSingleBook();
  }, []);
  const handleEditBook = async () => {
    setLoading(true);
    const data = {
      title,
      author,
      publishYear,
    };
    try {
      await axios.put(`http://localhost:5555/books/${id}`, data);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert("An Error happened, Please Check console");
    }
  };
  return (
    <div className="p-4">
      <BackButton />
      <div className="text-center mt-0">
  <h1 className="text-3xl my-4">Edit Book</h1>
</div>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
          {" "}
          Save
        </button>
      </div>
    </div>
  );
}

export default EditBook;
