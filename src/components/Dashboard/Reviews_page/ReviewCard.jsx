import React from 'react';

const ReviewCard = ({ review, onEdit, onDelete }) => {
  return (
    <div className="border rounded shadow p-4 bg-white">
      {review.image && <img src={`https://ascend-skills-backend.onrender.com/uploads/${review.image}`} alt="Review" className="mt-4 max-w-full" />}
      <h2 className="text-xl font-bold">{review.courseId.title}</h2>
      <p className="text-sm text-gray-600">By {review.userId.username}</p>
      <p className="text-lg mt-2">Rating: {review.rating}</p>
      <p className="mt-2">{review.comment}</p>
      <div className="mt-4 flex space-x-2">
        <button onClick={onEdit} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Edit
        </button>
        <button onClick={onDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
