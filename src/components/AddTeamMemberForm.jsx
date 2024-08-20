import React, { useState } from 'react';
import axios from 'axios';

const AddTeamMemberForm = ({ onTeamMemberAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    experience: '',
    bio: '',
    degrees: [],
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDegreeChange = (index, e) => {
    const newDegrees = [...formData.degrees];
    newDegrees[index][e.target.name] = e.target.value;
    setFormData({
      ...formData,
      degrees: newDegrees,
    });
  };

  const handleAddDegree = () => {
    setFormData({
      ...formData,
      degrees: [...formData.degrees, { title: '', institution: '', year: '' }],
    });
  };

  const handleRemoveDegree = (index) => {
    const newDegrees = formData.degrees.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      degrees: newDegrees,
    });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('position', formData.position);
    formDataObj.append('experience', formData.experience);
    formDataObj.append('bio', formData.bio);
    formDataObj.append('image', image);
    formDataObj.append('degrees', JSON.stringify(formData.degrees));

    try {
      const response = await axios.post('http://localhost:5000/api/team', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onTeamMemberAdded(response.data);
    } catch (error) {
      console.error('Error adding team member:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="position"
        placeholder="Position"
        value={formData.position}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="number"
        name="experience"
        placeholder="Experience (years)"
        value={formData.experience}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <textarea
        name="bio"
        placeholder="Bio"
        value={formData.bio}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="file"
        name="image"
        onChange={handleFileChange}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      {formData.degrees.map((degree, index) => (
        <div key={index} className="space-y-2">
          <input
            type="text"
            name="title"
            placeholder="Degree Title"
            value={degree.title}
            onChange={(e) => handleDegreeChange(index, e)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="institution"
            placeholder="Institution"
            value={degree.institution}
            onChange={(e) => handleDegreeChange(index, e)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="year"
            placeholder="Year"
            value={degree.year}
            onChange={(e) => handleDegreeChange(index, e)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button type="button" onClick={() => handleRemoveDegree(index)} className="text-red-500">Remove</button>
        </div>
      ))}
      <button type="button" onClick={handleAddDegree} className="w-full p-2 bg-blue-500 text-white rounded">Add Degree</button>
      <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">Submit</button>
    </form>
  );
};

export default AddTeamMemberForm;
