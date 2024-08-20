import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateAuthorForm from './UpdateAuthorForm';

const ListAuthors = () => {
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/authors');
        setAuthors(response.data);
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };

    fetchAuthors();
  }, []);

  const handleUpdate = (author) => {
    setSelectedAuthor(author);
    setIsUpdateModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/authors/${id}`);
      setAuthors(authors.filter(author => author._id !== id));
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  };

  const handleUpdateClose = () => {
    setIsUpdateModalOpen(false);
    setSelectedAuthor(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-8">Authors List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {authors.map(author => (
            <div key={author._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-2">{author.name}</h2>
                <p className="text-gray-700 mb-2">Course: {author.courseId.title}</p>
                <p className="text-gray-700 mb-2">Bio: {author.bio}</p>
                <p className="text-gray-700 mb-2">Experience: {author.experience} years</p>
                <p className="text-gray-700 mb-2">Previous Company: {author.previousCompany}</p>
                <button
                  className="bg-blue-500 text-white px-3 py-2 rounded mt-2"
                  onClick={() => handleUpdate(author)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-2 rounded mt-2 ml-2"
                  onClick={() => handleDelete(author._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        {isUpdateModalOpen && (
          <UpdateAuthorForm author={selectedAuthor} onClose={handleUpdateClose} />
        )}
      </div>
    </div>
  );
};

export default ListAuthors;
