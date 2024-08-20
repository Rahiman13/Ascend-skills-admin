import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import UpdateCourseForm from './updatecourse';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleEditClick = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  const handleDelete = async () => {
    if (!selectedCourse) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/courses/${selectedCourse._id}`);
      setCourses(courses.filter(course => course._id !== selectedCourse._id));
      handleModalClose();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-8">Course List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {courses.map(course => (
            <div key={course._id} className="bg-white shadow-lg rounded-lg  ">
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
                <p className="text-gray-700 mb-2">{course.description}</p>
                <p className="text-gray-700 mb-2">Author: {course.author}</p>
                <p className="text-gray-700 mb-2">Price: ${course.price}</p>
                <button
                  onClick={() => handleEditClick(course)}
                  className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
        <Modal isOpen={isModalOpen} onClose={handleModalClose} onDelete={handleDelete}>
          {selectedCourse && <UpdateCourseForm course={selectedCourse} onClose={handleModalClose} />}
        </Modal>
      </div>
    </div>
  );
};

export default CourseList;
