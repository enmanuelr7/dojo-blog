import { useParams, useHistory } from 'react-router';
import useFetch from './useFetch';

const BlogDetails = () => {
  const { id } = useParams();
  const history = useHistory();

  const { data: blog, isLoading, error } = useFetch(
    `http://localhost:8000/blogs/${id}`
  );
  const handleClick = () => {
    fetch(`http://localhost:8000/blogs/${id}`, {
      method: 'DELETE',
    }).then(() => {
      history.push('/');
    });
  };
  return (
    blog && (
      <div className="blog-details">
        {isLoading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {blog && (
          <article>
            <h2>{blog.title}</h2>
            <p>written by {blog.author}</p>
            <div>{blog.body}</div>
            <button onClick={handleClick}>delete blog</button>
          </article>
        )}
      </div>
    )
  );
};

export default BlogDetails;
