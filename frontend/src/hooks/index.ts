
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface Blog {
  content: string;
  title: string;
  id: string;
  author: {
    name: string;
  };
}

// export const useBlog = ( { id } :{ id :string} ) => {

//        const [loading, setloading] = useState(true);
//        const [blog, setBlog] = useState<Blog>();

//        useEffect(() => {
//          axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
//              headers: {
//                Authorization: localStorage.getItem("token"),
//              },
//            })
//            .then((response) => {
//              setBlog(response.data.blog);
//              setloading(false);
//            });
//        }, []);

//        return {
//          loading,
//          blog,
//        };


// }



export interface SigninInput {
  email: string;
  password: string;
}

export interface SignupInput {
  email: string;
  password: string;
  name?: string; // optional — since backend Zod uses `z.optional(z.string())`
}


export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlog(response.data.blog); // ✅ matches your actual API shape
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching blog:", err);
        setLoading(false);
      });
  }, [id]);

  return { loading, blog };
};


export const useBlogs = () => {

    const [loading , setloading] = useState(true);
    const [blogs , setBlogs] = useState<Blog[]>([])

    useEffect(() => {

        axios.get(`${BACKEND_URL}/api/v1/blog/bulk` ,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        .then(response => {
            setBlogs(response.data.blogs)
            setloading(false)
        })

    } ,[])

    return {
        loading , blogs
    }

}



// // Define interfaces for the blog data structure
// interface Author {
//     name: string;
// }

// interface Blog {
//     id: string;
//     title: string;
//     content: string;
//     author: Author;
//     // Add other properties if they exist in your API response
// }

// // Update your useBlogs hook
// export const useBlogs = () => {
//     const [loading, setLoading] = useState(true);
//     const [blogs, setBlogs] = useState<Blog[]>([]); // ✅ Properly typed

//     useEffect(() => {
//         axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
//             headers: {
//                 Authorization: localStorage.getItem("token")
//             }
//         })
//         .then(response => {
//             setBlogs(response.data.blogs);
//             setLoading(false);
//         })
//         .catch(error => {
//             console.error("Error fetching blogs:", error);
//             setLoading(false);
//         });
//     }, []);

//     return {
//         loading, 
//         blogs
//     };
// };