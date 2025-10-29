import axios from "axios";
import { Appbar } from "../components/Appbar";
import { BACKEND_URL } from "../config";
import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";


export const Publish = () => {

  const [title , setTitle] = useState("");

  const [description , setDescription] = useState("")

  const navigate  = useNavigate()


  return (
    <div className="h-screen w-full bg-gray-100">
      <header className="border-b border-gray-200 sticky top-0 bg-white z-10">
        <Appbar />
      </header>

      <div className="max-w-5xl mx-auto p-10">
        <div className="w-full mb-6">
          <input onChange={ (e) => {
            setTitle(e.target.value)
          }}
            type="text"
            id="success"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3.5"
            placeholder="Enter your title..."
          />
        </div>


        <TextEditor onChange={ (e) => setDescription(e.target.value)
         } />

        <div className="flex justify-end">
          <button
            onClick={ async () => {
              const response =  await axios.post(`${BACKEND_URL}/api/v1/blog` , {
                title,
                content:description
              } ,{
                headers:{
                  Authorization:localStorage.getItem("token")
                }
              });
              navigate(`/blog/${response.data.id}`)
            }}
            type="submit"
            className="inline-flex items-center px-6 py-3 text-sm font-medium text-center text-white bg-green-600 rounded-lg focus:ring-4 focus:ring-green-300 hover:bg-green-700 transition-colors duration-200"
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
};

const TextEditor = ( {onChange} : { onChange : (e :ChangeEvent<HTMLTextAreaElement>) => void } ) => {
  return (
    <form>
      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 ">
        <div className="px-4 py-2 bg-white rounded-lg">
          <label htmlFor="editor" className="sr-only">
            Publish post
          </label>
          <textarea onChange={onChange}
            id="editor"
            rows={20}
            className="block w-full px-0 text-sm text-gray-800 bg-white   focus:ring-0 focus:outline-none  dark:placeholder-gray-400 resize-none"
            placeholder="Write your article content here..."
            required
          ></textarea>
        </div>
      </div>

    </form>
  );
};


