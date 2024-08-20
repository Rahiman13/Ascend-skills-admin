import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdAdd } from 'react-icons/md';
import Modal from './RoadmapsModal';

const RoadmapsPage = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const fetchRoadmaps = async () => {
    try {
      const response = await axios.get('https://ascend-skills-backend.onrender.com/api/roadmaps');
      setRoadmaps(response.data);
    } catch (error) {
      console.error('Failed to fetch roadmaps:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this roadmap?')) {
      try {
        await axios.delete(`https://ascend-skills-backend.onrender.com/api/roadmaps/${id}`);
        fetchRoadmaps();
      } catch (error) {
        console.error('Failed to delete roadmap:', error);
      }
    }
  };

  const handleEdit = (roadmap) => {
    setSelectedRoadmap(roadmap);
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedRoadmap(null);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    fetchRoadmaps();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Roadmaps</h1>
        <button
          onClick={handleAdd}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          <MdAdd className="mr-2" size={24} />
          Add Roadmap
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roadmaps.map((roadmap) => (
          <div key={roadmap._id} className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">{roadmap.title}</h2>
            <p className="mb-2 text-gray-700">Course: {roadmap.courseId?.title}</p>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Contents:</h3>
              {roadmap.contents.map((content, index) => (
                <div key={index} className="ml-4 mb-2">
                  <h4 className="font-medium">{content.title}</h4>
                  <ul className="list-disc ml-6">
                    {content.contents.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={() => handleEdit(roadmap)}
                className="text-yellow-500 hover:text-yellow-600 transition">
                <AiFillEdit size={24} />
              </button>
              <button
                onClick={() => handleDelete(roadmap._id)}
                className="text-red-500 hover:text-red-600 transition">
                <AiFillDelete size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <Modal
          roadmap={selectedRoadmap}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default RoadmapsPage;
