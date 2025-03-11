import React, { useState, useRef  } from 'react';
import axios from 'axios';
import TopNavbar from '../../../components/TopNavbar/TopNavbar';

const AddBook = () => {
  // State variables for form inputs
  const [title, setTitle] = useState('');
  const [bookPhoto, setBookPhoto] = useState(null);
  const [isbn, setIsbn] = useState('');
  const [coverPage, setCoverPage] = useState('');
  const [revisionNumber, setRevisionNumber] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [publisher, setPublisher] = useState('');
  const [authors, setAuthors] = useState('');
  const [genre, setGenre] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('isbn', isbn);
    formData.append('coverPage', coverPage);
    formData.append('revisionNumber', Number(revisionNumber)); // Ensure it's an integer
    formData.append('publishedDate', publishedDate);
    formData.append('publisher', publisher);
    formData.append('authors', authors);
    formData.append('genre', genre);
  
    if (bookPhoto) {
      formData.append('bookPhoto', bookPhoto); // Append the file correctly
    }
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found, user is not authenticated.");
        return;
      }
      console.log("This is the token", token); 
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Set correct content type
        },
      };
  
      const response = await axios.post('http://localhost:5000/book/addBook', formData, config);
      setMessage(response.data.message);
      
      // Clear form fields on successful submission
      setTitle('');
      setBookPhoto(null);
      setIsbn('');
      setCoverPage('');
      setRevisionNumber('');
      setPublishedDate('');
      setPublisher('');
      setAuthors('');
      setGenre('');

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setBookPhoto(null);

    } catch (err) {
      setError('Failed to add book. Please try again.');
      console.error('AddBook Error:', err.response?.data || err.message);
    }
  };
  
  
  //Return JSX code
  return (
    <div className="pt-16">
      <TopNavbar />
      <div className="max-w-2xl mx-auto p-6 bg-gray-100 dark:bg-gray-900 mt-5">
      <h2 className="text-2xl font-bold font-sf-pro-rounded mb-4 text-center text-[orange] dark:text-gray-100">Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Book Photo</label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => setBookPhoto(e.target.files[0])}
              required
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">ISBN</label>
            <input
              type="text"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              required
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cover Page URL</label>
            <input
              type="text"
              value={coverPage}
              onChange={(e) => setCoverPage(e.target.value)}
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Revision Number</label>
            <input
              type="number"
              value={revisionNumber}
              onChange={(e) => setRevisionNumber(e.target.value)}
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Published Date</label>
            <input
              type="date"
              value={publishedDate}
              onChange={(e) => setPublishedDate(e.target.value)}
              required
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Publisher</label>
            <input
              type="text"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Authors</label>
            <input
              type="text"
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
              required
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Genre</label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[purple] dark:bg-gray-400 text-white px-4 py-2 rounded"
            >
              Add Book
            </button>
          </div>
          {message && <p className="text-green-500">{message}</p>}
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </form>
    </div>
    </div>
  );
};

export default AddBook;
