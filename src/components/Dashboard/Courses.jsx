// import React, { useState, useEffect } from 'react';
// import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
// import axios from 'axios';
// import AddCourseModal from './AddCourseModal';

// const CoursePage = () => {
//   const [courses, setCourses] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const fetchCourses = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/courses');
//       setCourses(response.data);
//     } catch (error) {
//       console.error('Error fetching courses:', error);
//     }
//   };

//   const handleDelete = async (courseId) => {
//     try {
//       await axios.delete(`/api/courses/${courseId}`);
//       fetchCourses();
//     } catch (error) {
//       console.error('Error deleting course:', error);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Courses</h1>
//         <button
//           onClick={() => setShowModal(true)}
//           className="bg-blue-600 text-white py-2 px-4 rounded flex items-center"
//         >
//           <FaPlus className="mr-2" /> Add Course
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {courses.map((course) => (
//           <div key={course._id} className="bg-white p-4 rounded shadow">
//             <img src={course.image} alt={course.title} className="w-full h-40 object-cover rounded mb-4" />
//             <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
//             <p className="text-gray-700 mb-4">{course.description}</p>
//             <div className="flex justify-between items-center">
//               <button className="text-blue-500">
//                 <FaEdit />
//               </button>
//               <button onClick={() => handleDelete(course._id)} className="text-red-500">
//                 <FaTrash />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {showModal && <AddCourseModal onClose={() => setShowModal(false)} onAddCourse={fetchCourses} />}
//     </div>
//   );
// };

// export default CoursePage;













import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseModal from './CourseModal'; // Assuming the CourseModal is in the same folder

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentCourse, setCurrentCourse] = useState(null);

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

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                await axios.delete(`http://localhost:5000/api/courses/${id}`);
                setCourses(courses.filter(course => course._id !== id));
            } catch (error) {
                console.error('Error deleting course:', error);
            }
        }
    };

    const handleEdit = (course) => {
        setCurrentCourse(course);
        setShowModal(true);
    };

    const handleAddCourse = () => {
        setCurrentCourse(null);
        setShowModal(true);
    };

    const handleSaveCourse = async (courseData) => {
        const formData = new FormData();
        formData.append('title', courseData.title);
        formData.append('description', courseData.description);
        formData.append('duration', courseData.duration);
        formData.append('authorId', courseData.authorId);
        formData.append('authorName', courseData.authorName);
        formData.append('price', courseData.price);
        formData.append('category', courseData.category);
        formData.append('curriculum', JSON.stringify(courseData.curriculum)); // Ensure curriculum is a valid JSON string
        formData.append('courseRating', courseData.courseRating);

        if (courseData.authorImage) {
            formData.append('authorImage', courseData.authorImage);
        }
        if (courseData.image) {
            formData.append('image', courseData.image);
        }

        try {
            if (currentCourse) {
                // Editing an existing course
                const response = await axios.put(`http://localhost:5000/api/courses/${currentCourse._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setCourses(courses.map(course => course._id === currentCourse._id ? response.data : course));
            } else {
                // Adding a new course
                const response = await axios.post('http://localhost:5000/api/courses', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setCourses([...courses, response.data]);
            }
            setShowModal(false);
        } catch (error) {
            console.error('Error saving course:', error);
        }
    };


    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">Courses</h1>
                <button
                    onClick={handleAddCourse}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add Course
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {courses.map(course => (
                    <div key={course._id} className="bg-white shadow-md p-4 rounded">
                        <img
                            src={course.authorImage || 'default-image.png'}
                            alt={course.title}
                            className="w-full h-32 object-cover rounded mb-2"
                        />
                        <h2 className="text-lg font-bold mb-2">{course.title}</h2>
                        <p className="text-gray-600 mb-4">{course.description}</p>
                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => handleEdit(course)}
                                className="text-yellow-500 hover:text-yellow-700"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(course._id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <CourseModal
                    onClose={() => setShowModal(false)}
                    onSave={handleSaveCourse}
                    course={currentCourse}
                />
            )}
        </div>
    );
};

export default CoursesPage;
