import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';

Modal.setAppElement('#root');

const AuthorsPage = () => {
  const [authors, setAuthors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [currentAuthor, setCurrentAuthor] = useState(null);
  const [newAuthor, setNewAuthor] = useState({
    name: '',
    courseId: [],
    bio: '',
    image: '',
    authorReviews: [],
    degrees: [],
    experience: '',
    previousCompany: '',
  });

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get('https://ascend-skills-backend.onrender.com/api/authors');
      setAuthors(response.data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  const handleAddOrUpdateAuthor = async () => {
    console.log(newAuthor); // Log the data being sent
  
    // Validate required fields
    const isValidObjectId = (id) => /^[a-fA-F0-9]{24}$/.test(id);
    const formattedCourseIds = newAuthor.courseId.filter(id => isValidObjectId(id.trim()));
  
    if (!newAuthor.name || !formattedCourseIds.length || !newAuthor.bio || !newAuthor.image) {
      console.log('Validation Failed:', {
        name: newAuthor.name,
        courseId: formattedCourseIds,
        bio: newAuthor.bio,
        image: newAuthor.image
      });
      Swal.fire('Error', 'Please fill all required fields', 'error');
      return;
    }
  
    const url = modalType === 'add' ? 'https://ascend-skills-backend.onrender.com/api/authors' : `https://ascend-skills-backend.onrender.com/api/authors/${currentAuthor._id}`;
    const method = modalType === 'add' ? 'post' : 'put';
  
    try {
      const response = await axios({
        method,
        url,
        data: {
          ...newAuthor,
          courseId: formattedCourseIds // Use the correctly formatted courseId
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      Swal.fire('Success', `Author ${modalType === 'add' ? 'added' : 'updated'} successfully`, 'success');
      fetchAuthors();
      setShowModal(false);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      Swal.fire('Error', 'Something went wrong', 'error');
    }
  };
  
  


  const handleDeleteAuthor = async (id) => {
    try {
      await axios.delete(`https://ascend-skills-backend.onrender.com/api/authors/${id}`);
      Swal.fire('Deleted!', 'Author has been deleted.', 'success');
      fetchAuthors();
    } catch (error) {
      Swal.fire('Error', 'Something went wrong', 'error');
    }
  };

  const openModal = (type, author = null) => {
    setModalType(type);
    if (type === 'edit') {
      setCurrentAuthor(author);
      setNewAuthor({
        ...author,
        authorReviews: JSON.stringify(author.authorReviews),
        degrees: JSON.stringify(author.degrees),
      });
    } else {
      setNewAuthor({
        name: '',
        courseId: [],
        bio: '',
        image: '',
        authorReviews: [],
        degrees: [],
        experience: '',
        previousCompany: '',
      });
    }
    setShowModal(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Authors</h1>
        <button
          onClick={() => openModal('add')}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        >
          <FaPlus className="mr-2" />
          Add Author
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {authors.map(author => (
          <div key={author._id} className="bg-white p-4 rounded shadow-md">
            <img src={author.image} alt={author.name} className="w-full h-40 object-cover rounded" />
            <h2 className="text-xl font-semibold mt-2">{author.name}</h2>
            <p className="text-gray-700">{author.bio}</p>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => openModal('edit', author)}
                className="text-blue-500 flex items-center"
              >
                <FaEdit className="mr-1" />
                Edit
              </button>
              <button
                onClick={() => handleDeleteAuthor(author._id)}
                className="text-red-500 flex items-center"
              >
                <FaTrashAlt className="mr-1" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Author Modal"
        className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
        overlayClassName="fixed inset-0"
      >
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <h2 className="text-xl font-bold mb-4">{modalType === 'add' ? 'Add Author' : 'Edit Author'}</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddOrUpdateAuthor();
            }}
          >
            <label className="block mb-2">
              Name
              <input
                type="text"
                value={newAuthor.name}
                onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                required
              />
            </label>
            <label className="block mb-2">
              Course IDs (comma separated) (ex: id,id)
              <input
                type="text"
                // value={newAuthor.courseId.join(', ')}
                onChange={(e) => setNewAuthor({ ...newAuthor, courseId: e.target.value.split(',').map(id => id.trim()) })}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block mb-2">
              Bio
              <textarea
                value={newAuthor.bio}
                onChange={(e) => setNewAuthor({ ...newAuthor, bio: e.target.value })}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block mb-2">
              Image URL
              <input
                type="text"
                value={newAuthor.image}
                onChange={(e) => setNewAuthor({ ...newAuthor, image: e.target.value })}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block mb-2">
              Author Reviews (JSON format)
              <textarea
                value={newAuthor.authorReviews}
                onChange={(e) => setNewAuthor({ ...newAuthor, authorReviews: e.target.value })}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block mb-2">
              Degrees (JSON format)
              <textarea
                value={newAuthor.degrees}
                onChange={(e) => setNewAuthor({ ...newAuthor, degrees: e.target.value })}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block mb-2">
              Experience (years)
              <input
                type="number"
                value={newAuthor.experience}
                onChange={(e) => setNewAuthor({ ...newAuthor, experience: e.target.value })}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block mb-2">
              Previous Company
              <input
                type="text"
                value={newAuthor.previousCompany}
                onChange={(e) => setNewAuthor({ ...newAuthor, previousCompany: e.target.value })}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </label>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {modalType === 'add' ? 'Add Author' : 'Update Author'}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AuthorsPage;
