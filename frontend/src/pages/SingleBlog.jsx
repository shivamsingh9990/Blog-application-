import { useParams } from "react-router";
const SingleBlog = function () {
  const { id } = useParams();
  return (
    <main>
      <h1 className="text-5xl text-gray-700 font-bold">
        Single Blog with id {id}
      </h1>
    </main>
  );
};
export default SingleBlog