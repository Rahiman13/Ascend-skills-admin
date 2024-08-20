// src/components/CoursesPage.js
import React, { useState, useEffect } from 'react';
import CourseCard from './CourseCard';
import AddCourseModal from './AddCourseModal';
import EditCourseModal from './EditCourseModal';
import axios from 'axios';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('https://ascend-skills-backend.onrender.com/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await axios.delete(`https://ascend-skills-backend.onrender.com/api/courses/${id}`);
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setEditModalOpen(true);
  };

  const handleAddCourse = () => {
    setAddModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-6">Courses</h1>
        <button
          onClick={handleAddCourse}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mb-4"
        >
          Add Course
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {courses.map((course) => (
          <CourseCard
            key={course._id}
            course={course}
            onEdit={handleEditCourse}
            onDelete={handleDeleteCourse}
          />
        ))}
      </div>

      {isAddModalOpen && (
        <AddCourseModal
          onClose={() => setAddModalOpen(false)}
          onCourseAdded={fetchCourses}
        />
      )}
      {isEditModalOpen && (
        <EditCourseModal
          course={editingCourse}
          onClose={() => setEditModalOpen(false)}
          onCourseUpdated={fetchCourses}
        />
      )}
    </div>
  );
};

export default CoursesPage;
