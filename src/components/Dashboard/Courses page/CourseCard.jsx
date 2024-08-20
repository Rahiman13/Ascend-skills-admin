// // src/components/CourseCard.js
// import React from 'react';

// const CourseCard = ({ course, onEdit, onDelete }) => {
//   return (
//     <div className="bg-white shadow-md rounded-lg p-4 m-2">
//       <img src={course.image} alt={course.title} className="w-full h-40 object-cover rounded-md" />
//       <h2 className="text-xl font-semibold mt-2">{course.title}</h2>
//       <h2 className="text-xl font-semibold mt-2">Auhtor Name: {course.authorName}</h2>
//       <p className="text-gray-600"> Duration: {course.duration}</p>
//       <p className="text-gray-600">{course.description}</p>
//       <p className="text-gray-800 font-semibold">Price: ${course.price}</p>
//       <p className="text-gray-800 font-semibold">Rating: {course.courseRating}</p>
//       {/* <p className="text-gray-800 font-semibold">Curriculum: {course.curriculum}</p> */}
//       <div className="flex justify-between mt-4">
//         <button
//           onClick={() => onEdit(course)}
//           className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
//         >
//           Edit
//         </button>
//         <button
//           onClick={() => onDelete(course._id)}
//           className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CourseCard;

















import React, { useState } from 'react';

const CourseCard = ({ course, onEdit, onDelete }) => {
  const [showMore, setShowMore] = useState(false);

  const handleToggleMore = () => {
    setShowMore(prevState => !prevState);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-40 object-cover rounded-md"
      />
      <h2 className="text-xl font-semibold mt-2">{course.title}</h2>
      <h2 className="text-xl font-semibold mt-2">Author Name: {course.authorName}</h2>
      <p className="text-gray-600">Duration: {course.duration}</p>
      <p className="text-gray-800 font-semibold">Price: ${course.price}</p>
      <p className="text-gray-800 font-semibold">Rating: {course.courseRating}</p>
      
      {/* Show more toggle */}
      <button
        onClick={handleToggleMore}
        className="text-blue-500 mt-2 mb-4"
      >
        {showMore ? 'Show Less' : 'Show More'}
      </button>
      
      {/* Conditional rendering of description and curriculum */}
      {showMore && (
        <div>
          <p className="text-gray-600 mb-2">{course.description}</p>
          <div className="text-gray-800 mb-2">
            <strong>Curriculum:</strong>
            <ul>
              {Object.keys(course.curriculum || {}).map((module, index) => (
                <li key={index}>
                  <strong>{module}:</strong>
                  <ul>
                    {course.curriculum[module].map((topic, i) => (
                      <li key={i}>{topic}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-4">
        <button
          onClick={() => onEdit(course)}
          className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(course._id)}
          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CourseCard;

