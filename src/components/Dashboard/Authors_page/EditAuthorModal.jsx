import React, { useState } from 'react';
import axios from 'axios';

const EditAuthorModal = ({ author, onClose, onAuthorUpdated }) => {
  const [name, setName] = useState(author.name);
  const [bio, setBio] = useState(author.bio);
  const [experience, setExperience] = useState(author.experience);
  const [previousCompany, setPreviousCompany] = useState(author.previousCompany);
  const [image, setImage] = useState(null);
  const [courseId, setCourseId] = useState(author.courseId.join(', '));
  const [authorReviews, setAuthorReviews] = useState(JSON.stringify(author.authorReviews));
  const [degrees, setDegrees] = useState(JSON.stringify(author.degrees));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('bio', bio);
    formData.append('experience', experience);
    formData.append('previousCompany', previousCompany);
    if (image) formData.append('image', image);
    formData.append('courseId', courseId);
    formData.append('authorReviews', authorReviews);
    formData.append('degrees', degrees);

    try {
      const response = await axios.put(`https://ascend-skills-backend.onrender.com/api/authors/${author._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onAuthorUpdated(response.data);
      onClose();
    } catch (error) {
      console.error('Error updating author:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Author</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <input
            type="text"
            placeholder="Experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <input
            type="text"
            placeholder="Previous Company"
            value={previousCompany}
            onChange={(e) => setPreviousCompany(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="text"
            placeholder="Course ID (comma separated)"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <textarea
            placeholder="Author Reviews (JSON)"
            value={authorReviews}
            onChange={(e) => setAuthorReviews(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <textarea
            placeholder="Degrees (JSON)"
            value={degrees}
            onChange={(e) => setDegrees(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="text-red-500 mr-4">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Update Author</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAuthorModal;
