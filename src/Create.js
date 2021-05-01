import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Create = () => {
  const authors = ['mario', 'yoshi'];
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState(authors[0]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const blog = { title: title, body, author };
    fetch('http://localhost:8000/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog),
    }).then(() => {
      setIsLoading(false);
      history.push('/');
    });
  };

  return (
    <div className="create">
      <h2>Add A New Blog</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="title">Blog title:</label>
        <input
          type="text"
          id="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="body">Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label htmlFor="author">Blog body:</label>
        <select
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>
        <button disabled={isLoading}>
          {isLoading && 'Adding Blog...'}
          {!isLoading && 'Add Blog'}
        </button>
      </form>
    </div>
  );
};

export default Create;
