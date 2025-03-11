import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OverDueBook = () => {
  //State variable
  const [overdueBooks, setOverdueBooks] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const API_BASE_URL = process.env.VITE_BACKEND_URL;

  //function for fetching overdue books
  const fetchOverdueBooks = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming token-based auth
      if (!token) {
        setError('No token found, please log in.');
        return;
      }
      const response = await axios.get(`${API_BASE_URL}/librarian/overdue`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOverdueBooks(response.data);
    } catch (err) {
      setError('Failed to fetch overdue books.');
      console.error('Fetch Overdue Books Error:', err.message);
    }
  };

  //Function for sending email notificaion to librarians
  const sendReminder = async (email) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found, please log in.');
        return;
      }
      await axios.post(`${API_BASE_URL}/librarian/notify-librarian`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Reminder sent successfully to all librarians.');
    } catch (err) {
      setError(`Failed to send reminder to ${email}.`);
      console.error('Send Reminder Error:', err.message);
    }
  };

  useEffect(() => {
    fetchOverdueBooks();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Overdue Books</h2>
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
      <table className="table-auto w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-100 text-[14px]">
            <th className="border border-gray-400 px-4 py-2">Checkout Date</th>
            <th className="border border-gray-400 px-4 py-2">Expected Check-in Date</th>
            <th className="border border-gray-400 px-4 py-2">Overdue Days</th>
            <th className="border border-gray-400 px-4 py-2">User Email</th>
            <th className="border border-gray-400 px-4 py-2">Book Title</th>
            <th className="border border-gray-400 px-4 py-2">ISBN</th>
            {/* <th className="border border-gray-400 px-4 py-2">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {overdueBooks.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center p-4">No overdue books found.</td>
            </tr>
          ) : (
            overdueBooks.map((book) => (
              <tr key={book.id} className='text-[12px]'>
                <td className="border border-gray-400 px-4 py-2">{new Date(book.checkoutDate).toLocaleDateString()}</td>
                <td className="border border-gray-400 px-4 py-2">{new Date(book.expectedCheckinDate).toLocaleDateString()}</td>
                <td className="border border-gray-400 px-4 py-2">{book.overdueDays}</td>
                <td className="border border-gray-400 px-4 py-2">{book.user.email}</td>
                <td className="border border-gray-400 px-4 py-2">{book.book.title}</td>
                <td className="border border-gray-400 px-4 py-2">{book.book.isbn}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className='flex justify-center'>
        <button
          onClick={() => sendReminder()}
          className="bg-blue-500 text-white px-3 py-1 rounded mt-5"
          >
            Send Reminder
        </button>
        </div>
    </div>
  );
};

export default OverDueBook;
