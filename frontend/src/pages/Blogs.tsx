import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/FullBlog";
import { useBlogs } from "../hooks";


export const Blogs = () => {

const {loading , blogs} = useBlogs();

if(loading) {
    return <div>
        <BlogSkeleton />
    </div>
}

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 sticky top-0 bg-white z-10">
        <Appbar />
      </header>
      <main className="max-w-7xl mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 py-8">
          {/* Blog Cards */}
          <div className="lg:col-span-2  shadow-lg rounded-lg ">
            {blogs.map((blog ,idx) => (
              <div className=" gap-4 ">
                <BlogCard key={idx}
                  authorName={blog.author.name || "anonymous"}
                  title={blog.title}
                  content={blog.content}
                  publishDate="Jan 28, 2025"
                />
              </div>
            ))}
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-20">
              <h3 className="font-semibold text-sm mb-4 text-gray-900">
                Recommended topics
              </h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  "Programming",
                  "Technology",
                  "Design",
                  "React",
                  "TypeScript",
                  "Web Dev",
                ].map((topic) => (
                  <span
                    key={topic}
                    className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-sm cursor-pointer transition-colors"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-sm mb-4 text-gray-900">
                  Reading list
                </h3>
                <p className="text-gray-600 text-sm">
                  Click the bookmark icon on any story to add it to your reading
                  list.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};