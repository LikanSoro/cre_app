export default function CommentsSection() {
  return (
    <div className="space-y-2">
      <textarea className="w-full border p-2 rounded" placeholder="Add a comment"></textarea>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Post Comment</button>
    </div>
  );
}