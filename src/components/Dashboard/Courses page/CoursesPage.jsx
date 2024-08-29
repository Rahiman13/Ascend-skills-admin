import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCard from './CourseCard';
import CourseModal from './CourseModal';
import { Plus } from 'lucide-react';
import Base_Url from '../../../api';

const apiUrl = `${Base_Url}`;

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalMode, setModalMode] = useState('add');
  const [showModal, setShowModal] = useState(false);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetchCourses();
    fetchAuthors();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/courses`);
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/authors`);
      setAuthors(data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  const handleAddCourse = () => {
    setSelectedCourse(null);
    setModalMode('add');
    setShowModal(true);
  };

  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleViewCourse = (course) => {
    setSelectedCourse(course);
    setModalMode('view');
    setShowModal(true);
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`${apiUrl}/courses/${id}`);
        fetchCourses();
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  const handleSaveCourse = async (courseData) => {
    try {
      const formData = new FormData();
      for (const key in courseData) {
        if (key === 'image' && courseData[key]) {
          formData.append(key, courseData[key]);
        } else {
          formData.append(key, courseData[key]);
        }
      }

      if (modalMode === 'edit') {
        await axios.put(`${apiUrl}/courses/${selectedCourse._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axios.post(`${apiUrl}/courses`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      fetchCourses();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving course:', error.response ? error.response.data : error.message); // Improved error logging
    }
  };


  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Courses</h1>
        <button
          onClick={handleAddCourse}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <Plus size={20} className="mr-2" />
          Add Course
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course._id}
            course={course}
            onEdit={() => handleEditCourse(course)}
            onDelete={() => handleDeleteCourse(course._id)}
            onView={() => handleViewCourse(course)}
          />
        ))}
      </div>
      {showModal && (
        <CourseModal
          course={selectedCourse}
          authors={authors}
          onSave={handleSaveCourse}
          onClose={() => setShowModal(false)}
          mode={modalMode}
        />
      )}
    </div>
  );
};

export default CoursesPage;