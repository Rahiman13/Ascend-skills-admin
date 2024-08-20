import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import AddPhdHolderForm from './AddPhdHolderForm';
import UpdatePhdHolderForm from './UpdatePhdHolderForm';

const PhdHolderList = () => {
  const [phdHolders, setPhdHolders] = useState([]);
  const [selectedPhdHolder, setSelectedPhdHolder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchPhdHolders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/phd-holders');
        setPhdHolders(response.data);
      } catch (error) {
        console.error('Error fetching PHD holders:', error);
      }
    };

    fetchPhdHolders();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/phd-holders/${id}`);
      setPhdHolders(phdHolders.filter(phdHolder => phdHolder._id !== id));
    } catch (error) {
      console.error('Error deleting PHD holder:', error);
    }
  };

  const handleUpdateClick = (phdHolder) => {
    setSelectedPhdHolder(phdHolder);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPhdHolder(null);
  };

  const handlePhdHolderUpdated = (updatedPhdHolder) => {
    setPhdHolders(phdHolders.map(phdHolder => phdHolder._id === updatedPhdHolder._id ? updatedPhdHolder : phdHolder));
    handleModalClose();
  };

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };

  const handlePhdHolderAdded = (newPhdHolder) => {
    setPhdHolders([...phdHolders, newPhdHolder]);
    handleAddModalClose();
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">PHD Holders</h1>
      <button onClick={handleAddClick} className="w-full px-3 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 mb-4">
        Add PHD Holder
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {phdHolders.map(phdHolder => (
          <div key={phdHolder._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-4">
              <img src={`http://localhost:5000/${phdHolder.image}`} alt={phdHolder.name} className="w-full h-48 object-cover mb-4" />
              <h2 className="text-2xl font-bold mb-2">{phdHolder.name}</h2>
              <p className="text-gray-700 mb-2">University: {phdHolder.university}</p>
              <p className="text-gray-700 mb-2">Field of Study: {phdHolder.fieldOfStudy}</p>
              <p className="text-gray-700 mb-2">Year of Completion: {phdHolder.yearOfCompletion}</p>
              <p className="text-gray-700 mb-2">Publications: {phdHolder.publications.join(', ')}</p>
              <button onClick={() => handleUpdateClick(phdHolder)} className="w-full px-3 py-2 bg-yellow-600 text-white font-semibold rounded-md hover:bg-yellow-700 mt-4">
                Update
              </button>
              <button onClick={() => handleDelete(phdHolder._id)} className="w-full px-3 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 mt-2">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <UpdatePhdHolderForm phdHolder={selectedPhdHolder} onPhdHolderUpdated={handlePhdHolderUpdated} />
      </Modal>

      <Modal isOpen={isAddModalOpen} onClose={handleAddModalClose}>
        <AddPhdHolderForm onPhdHolderAdded={handlePhdHolderAdded} />
      </Modal>
    </div>
  );
};

export default PhdHolderList;
