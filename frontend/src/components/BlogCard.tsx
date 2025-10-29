interface BlogCardTypes {
  authorName: string;
  title: string;
  content: string;
  publishDate: string;
  id?: string;
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishDate,
  id,
}: BlogCardTypes) => {
  return (
    <div className="border-b border-gray-200 py-8 px-4 hover:bg-gray-50 transition-colors cursor-pointer">
      <div className="max-w-3xl mx-auto">
        {/* Author and Meta Info */}
        <div className="flex items-center mb-4">
          <Avatar name={authorName} />
          <div className="flex items-center text-sm">
            <span className="font-medium text-gray-900">{authorName}</span>
            <Circle />
            <span className="text-gray-500">{publishDate}</span>
          </div>
        </div>

        {/* Title and Content */}
        <div className="mb-3">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-gray-700 transition-colors line-clamp-2">
            {title}
          </h2>
          <p className="text-gray-600 text-base line-clamp-3">
            {content.slice(0, 150)}...
          </p>
        </div>

        {/* Footer Meta */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="font-light">{`${Math.ceil(
            content.length / 100
          )} min read`}</span>
        </div>
      </div>
    </div>
  );
};

function Circle() {
  return <div className="h-1 w-1 rounded-full bg-gray-400 mx-2" />;
}

function Avatar({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mr-3">
      <span className="text-sm font-semibold text-white">
        {name[0].toUpperCase()}
      </span>
    </div>
  );
}
