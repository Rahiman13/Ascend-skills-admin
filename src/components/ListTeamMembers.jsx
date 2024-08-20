import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTeamMemberForm from './AddTeamMemberForm';
import UpdateTeamMemberForm from './UpdateTeamMemberForm';
import Modal from './Modal';

const TeamMemberList = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/team');
        setTeamMembers(response.data);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };

    fetchTeamMembers();
  }, []);

  const handleDelete = async (teamMemberId) => {
    try {
      await axios.delete(`http://localhost:5000/api/team/${teamMemberId}`);
      setTeamMembers(teamMembers.filter((member) => member._id !== teamMemberId));
    } catch (error) {
      console.error('Error deleting team member:', error);
    }
  };

  const handleEdit = (teamMember) => {
    setSelectedTeamMember(teamMember);
    setIsModalOpen(true);
  };

  const handleTeamMemberAdded = (newTeamMember) => {
    setTeamMembers([...teamMembers, newTeamMember]);
  };

  const handleTeamMemberUpdated = (updatedTeamMember) => {
    setTeamMembers(
      teamMembers.map((member) => (member._id === updatedTeamMember._id ? updatedTeamMember : member))
    );
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Team Members</h1>
      <AddTeamMemberForm onTeamMemberAdded={handleTeamMemberAdded} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {teamMembers.map((member) => (
          <div key={member._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={`http://localhost:5000/uploads/${member.image}`} alt={member.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-2">{member.name}</h2>
              <p className="text-gray-700 mb-2">{member.position}</p>
              <p className="text-gray-700 mb-2">{member.experience} years of experience</p>
              <p className="text-gray-700 mb-2">{member.bio}</p>
              <div className="mb-2">
                {member.degrees.map((degree, index) => (
                  <div key={index} className="text-gray-700 mb-2">
                    <strong>{degree.title}</strong> from {degree.institution} ({degree.year})
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleEdit(member)}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(member._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <UpdateTeamMemberForm teamMember={selectedTeamMember} onTeamMemberUpdated={handleTeamMemberUpdated} />
      </Modal>
    </div>
  );
};

export default TeamMemberList;
