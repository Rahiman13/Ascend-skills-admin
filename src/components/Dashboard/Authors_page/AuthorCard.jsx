import React from 'react';

const AuthorCard = ({ author, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2">
      <img src={author.image} alt={author.name} className="w-full h-40 object-cover rounded-md" />
      <h2 className="text-xl font-semibold mt-2">{author.name}</h2>
      <p className="text-gray-600">Bio: {author.bio}</p>
      <p className="text-gray-600">Experience: {author.experience}</p>
      <p className="text-gray-600">Previous Company: {author.previousCompany}</p>
      <div className="flex justify-between mt-4">
        <button
          onClick={onEdit}
          className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AuthorCard;
