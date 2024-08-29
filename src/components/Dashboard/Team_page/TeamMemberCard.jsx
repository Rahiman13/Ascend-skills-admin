import React from 'react';

const TeamMemberCard = ({ member, onEdit, onDelete }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-lg">
            <img
                // src={`${apiUrl}${member.image}`}
                src={member.image}
                alt={member.name}
                className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{member.name}</h2>
            <p className="text-gray-600 mb-2">{member.position}</p>
            <p className="text-gray-600 mb-2">Experience: {member.experience} years</p>
            <p className="text-gray-600 mb-4">{member.bio}</p>

            <div className="flex justify-between">
                <button
                    onClick={onEdit}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                >
                    Edit
                </button>
                <button
                    onClick={onDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TeamMemberCard;
