import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [courses, setCourses] = useState([]);

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

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-8">Our Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map(course => (
            <div key={course._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="bg-cover bg-center h-56 p-4" style={{ backgroundImage: `url(${course.image})` }}>
                <div className="flex justify-end">
                  <svg className="h-6 w-6 text-white fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
                <p className="text-gray-700 mb-2">{course.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-bold">${course.price}</span>
                  <a href="#" className="text-blue-500 hover:text-blue-700">Learn More</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
