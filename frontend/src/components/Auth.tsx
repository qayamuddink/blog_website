import { useState, type ChangeEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { BACKEND_URL } from "../config";
import type { SigninInput, SignupInput } from "../hooks";


export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [userInput, setUserInput] = useState<SigninInput | SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  const navigate =useNavigate()

  async function sendRequest () {

    try {
        
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup" ?"signup" : "signin"}` , userInput)
        const jwt = response.data;
        localStorage.setItem("token" ,jwt)
        navigate("/blogs")
    } catch (e) {
        //alert the user here that     
    }
}

return (
    <div className="h-screen flex justify-center items-center flex-col bg-gray-50">
      <div className="px-10 py-8 bg-white shadow-lg rounded-xl w-full max-w-md">
        <div className="text-3xl font-bold text-center">
          {type === "signup" ? "Create an account" : "Welcome back"}
        </div>

        <div className="text-gray-400 mt-1 text-center">
          {type === "signin" ? "Don't have an account?" : "Already have an account?"}
          <Link
            className="pl-2 hover:cursor-pointer hover:underline text-blue-500"
            to={type === "signin" ? "/signup" : "/signin"}
          >
            {type === "signin" ? "Sign up" : "Sign in"}
          </Link>
        </div>

        <div className="mt-6">
          {type === "signup" && (
            <LabelledInput
              label="Name"
              placeholder="Enter your name"
              onChange={(e) => {
                setUserInput((c: SignupInput) => ({
                  ...c,
                  name: e.target.value,
                }));
              }}
            />
          )}

          <LabelledInput
            label="Email"
            placeholder="Enter your email"
            onChange={(e) => {
              setUserInput((c) => ({
                ...c,
                email: e.target.value,
              }));
            }}
          />

          <LabelledInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => {
              setUserInput((c) => ({
                ...c,
                password: e.target.value,
              }));
            }}
          />
        </div>

        <button
          onClick={sendRequest}
          className="w-full bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg mt-6 transition-colors"
        >
          {type === "signup" ? "Sign Up" : "Sign In"}
        </button>
      </div>
    </div>
  );
};

interface LabelledInputTypes {
      label : string ;
      placeholder : string;
      onChange: (e : ChangeEvent<HTMLInputElement>) => void ;
      type?:string
  }

  function LabelledInput ( {label , placeholder , onChange , type} : LabelledInputTypes ){
      const id = label.toLowerCase().replace(/\s+/g, "-");
      return     <div className="mb-4">
        <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2" >
          {label}
        </label>
        <input onChange={onChange} type={type || "text"} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={id}  placeholder={placeholder} />
      </div>

  }