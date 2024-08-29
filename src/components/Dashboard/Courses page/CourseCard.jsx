import React from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';

const CourseCard = ({ course, onEdit, onDelete, onView }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        src={course.image || '/placeholder.svg?height=200&width=400'}
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
        {/* <p className="text-gray-600 mb-2">{course.description}</p> */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-500">Duration: {course.duration} hours</span>
          <span className="text-blue-500 font-semibold">${course.price}</span>
        </div>
        <p className="text-gray-500 mb-2">Category: {course.category}</p>
        {/* <img src={course.authorImage} alt={course.title} className='rounded-full w-1/6 h-1/4' /> */}


        <a href={course.vedio} className="text-blue-500 mb-2" target='_blank'>Video: {course.vedio}</a>
        <br />
        <a href={course.pricing} className="text-blue-500 mb-2" target='_blank'>Pricing: {course.pricing}</a>
        {course.courseRating && (
          <p className="text-yellow-500 mb-2">Rating: {course.courseRating}</p>
        )}
        <div className="flex items-centers">
          <img
            src={course.authorImage}
            alt={course.title}
            className="rounded-full w-8 h-8 object-cover mr-2"
          />
          <p className="text-gray-700 font-bold text-xl mb-2"> {course.author}</p>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onView}
            className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200"
          >
            <Eye size={20} />
          </button>
          <button
            onClick={onEdit}
            className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
          >
            <Edit size={20} />
          </button>
          <button
            onClick={onDelete}
            className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;