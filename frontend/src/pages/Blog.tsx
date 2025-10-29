import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { BlogSkeleton, FullBlog } from "../components/FullBlog";
import { Appbar } from "../components/Appbar";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });

  if (loading || !blog) {
    return <div> <BlogSkeleton /> </div>;
  }

  return (
    <div>
      <header className="border-b border-gray-200 sticky top-0 bg-white z-10">
        <Appbar />
      </header>
      <FullBlog blog={blog} />
    </div>
  );
};
