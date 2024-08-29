import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeamMemberCard from './TeamMemberCard';
import EditTeamMemberModal from './EditTeamMemberModal';
import Base_Url from '../../../api';

const apiUrl =`${Base_Url}/team`

const TeamManagement = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);

    useEffect(() => {
        fetchTeamMembers();
    }, []);

    const fetchTeamMembers = async () => {
        try {
            const response = await axios.get(`${apiUrl}`);
            setTeamMembers(response.data);
        } catch (error) {
            console.error('Error fetching team members:', error);
        }
    };

    const handleEdit = (member) => {
        setSelectedMember(member);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this team member?')) {
            try {
                await axios.delete(`${apiUrl}/${id}`);
                fetchTeamMembers();
            } catch (error) {
                console.error('Error deleting team member:', error);
            }
        }
    };

    const handleAdd = () => {
        setSelectedMember(null);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        fetchTeamMembers();
    };

    return (
        <div className="p-6">
            <div className="flex justify-between">

                <h1 className="text-3xl font-bold mb-6">Team Members</h1>
                <button
                    onClick={handleAdd}
                    className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                >
                    Add Team Member
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member) => (
                    <TeamMemberCard
                        key={member._id}
                        member={member}
                        onEdit={() => handleEdit(member)}
                        onDelete={() => handleDelete(member._id)}
                    />
                ))}
            </div>

            {showModal && (
                <EditTeamMemberModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    teamMember={selectedMember}
                />
            )}
        </div>
    );
};

export default TeamManagement;
