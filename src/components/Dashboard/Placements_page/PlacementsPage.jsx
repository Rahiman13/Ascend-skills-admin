import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlacementModal from './PlacementModal';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Base_Url from '../../../api';

const apiUrl =`${Base_Url}/placements`

const PlacementsPage = () => {
  const [placements, setPlacements] = useState([]);
  const [selectedPlacement, setSelectedPlacement] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchPlacements();
  }, []);

  const fetchPlacements = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}`);
      setPlacements(data);
    } catch (error) {
      console.error('Error fetching placements:', error);
      Swal.fire('Error', 'Failed to fetch placements.', 'error');
    }
  };

  const handleEdit = (placement) => {
    setSelectedPlacement(placement);
    setIsEdit(true);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${apiUrl}/${id}`);
          Swal.fire('Deleted!', 'The placement has been deleted.', 'success');
          fetchPlacements();
        } catch (error) {
          console.error('Error deleting placement:', error);
          Swal.fire('Error', 'Failed to delete the placement.', 'error');
        }
      }
    });
  };

  const handleAdd = () => {
    setSelectedPlacement(null);
    setIsEdit(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    fetchPlacements();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Placements</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
          onClick={handleAdd}
        >
          <FaPlus className="mr-2" />
          Add Placement
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {placements.map((placement) => (
          <div
            key={placement._id}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between"
          >
            <div className="flex items-center justify-center">
              <img
                src={placement.studentImage}
                alt={placement.studentName}
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
            </div>
            <h2 className="text-xl font-bold text-center">{placement.studentName}</h2>
            <p className="text-gray-600 text-center">{placement.position}</p>
            <p className="text-gray-600 text-center">{placement.companyName}</p>
            <p className="text-gray-600 text-center">{placement.studentCollege}</p>
            <p className="text-gray-600 text-center">{placement.placedYear}</p>
            <div className="flex justify-between mt-4">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => handleEdit(placement)}
              >
                <FaEdit />
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDelete(placement._id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <PlacementModal
          isOpen={modalOpen}
          onClose={closeModal}
          placement={selectedPlacement}
          isEdit={isEdit}
        />
      )}
    </div>
  );
};

export default PlacementsPage;
