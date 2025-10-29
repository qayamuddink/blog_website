import type { Blog } from "../hooks";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div className="grid grid-cols-12 px-10">
      <div className="col-span-8">
        <div className="text-3xl font-extrabold">{blog.title}</div>
        <div className="text-xl font-semibold">{blog.content}</div>
      </div>
      <div className="col-span-4"></div>
    </div>
  );
};



export const BlogSkeleton = () => {
  return (
    <div className="animate-pulse p-6 max-w-3xl mx-auto">
      <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        <div className="h-4 bg-gray-300 rounded w-4/5"></div>
      </div>
    </div>
  );
};