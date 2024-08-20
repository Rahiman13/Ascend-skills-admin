import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateAuthorForm = ({ author, onAuthorUpdated }) => {
  const [formData, setFormData] = useState({
    name: '',
    courseId: '',
    bio: '',
    degrees: [{ title: '', institution: '', year: '' }],
    experience: '',
    previousCompany: '',
    image: null,
  });

  useEffect(() => {
    setFormData({
      name: author.name,
      courseId: author.courseId,
      bio: author.bio,
      degrees: author.degrees,
      experience: author.experience,
      previousCompany: author.previousCompany,
      image: null,
    });
  }, [author]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDegreeChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDegrees = formData.degrees.map((degree, i) => 
      i === index ? { ...degree, [name]: value } : degree
    );
    setFormData({ ...formData, degrees: updatedDegrees });
  };

  const addDegreeField = () => {
    setFormData({
      ...formData,
      degrees: [...formData.degrees, { title: '', institution: '', year: '' }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('courseId', formData.courseId);
    data.append('bio', formData.bio);
    data.append('degrees', JSON.stringify(formData.degrees));
    data.append('experience', formData.experience);
    data.append('previousCompany', formData.previousCompany);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/authors/${author._id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onAuthorUpdated(response.data);
    } catch (error) {
      console.error('Error updating author:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[400px] overflow-y-scroll">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded"
      />
      <input
        type="text"
        name="courseId"
        placeholder="Course ID"
        value={formData.courseId}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded"
      />
      <textarea
        name="bio"
        placeholder="Bio"
        value={formData.bio}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded"
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
            className="w-full p-3 border rounded"
          />
          <input
            type="text"
            name="institution"
            placeholder="Institution"
            value={degree.institution}
            onChange={(e) => handleDegreeChange(index, e)}
            required
            className="w-full p-3 border rounded"
          />
          <input
            type="number"
            name="year"
            placeholder="Year"
            value={degree.year}
            onChange={(e) => handleDegreeChange(index, e)}
            required
            className="w-full p-3 border rounded"
          />
        </div>
      ))}
      <button type="button" onClick={addDegreeField} className="w-full p-3 bg-blue-500 text-white rounded">
        Add Another Degree
      </button>
      <input
        type="number"
        name="experience"
        placeholder="Experience (years)"
        value={formData.experience}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded"
      />
      <input
        type="text"
        name="previousCompany"
        placeholder="Previous Company"
        value={formData.previousCompany}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded"
      />
      <input
        type="file"
        name="image"
        onChange={handleChange}
        className="w-full p-3 border rounded"
      />
      <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded">
        Update Author
      </button>
    </form>
  );
};

export default UpdateAuthorForm;
