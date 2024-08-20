import React, { useState } from 'react';
import axios from 'axios';

const AddAuthorForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    courseId: '',
    bio: '',
    experience: '',
    previousCompany: '',
  });
  const [image, setImage] = useState(null);
  const [authorReviews, setAuthorReviews] = useState([{ userId: '', rating: '', comment: '' }]);
  const [degrees, setDegrees] = useState([{ title: '', institution: '', year: '' }]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleReviewChange = (index, e) => {
    const { name, value } = e.target;
    const updatedReviews = [...authorReviews];
    updatedReviews[index][name] = value;
    setAuthorReviews(updatedReviews);
  };

  const handleDegreeChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDegrees = [...degrees];
    updatedDegrees[index][name] = value;
    setDegrees(updatedDegrees);
  };

  const handleAddReview = () => {
    setAuthorReviews([...authorReviews, { userId: '', rating: '', comment: '' }]);
  };

  const handleAddDegree = () => {
    setDegrees([...degrees, { title: '', institution: '', year: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    data.append('image', image);
    data.append('authorReviews', JSON.stringify(authorReviews));
    data.append('degrees', JSON.stringify(degrees));

    try {
      const response = await axios.post('http://localhost:5000/api/authors', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      // Handle success (e.g., display a success message, reset form, etc.)
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
        alert(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        console.error('Error request:', error.request);
        alert('No response received from server.');
      } else {
        console.error('Error message:', error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-h-[600px] overflow-y-scroll">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="courseId">
          Course ID
        </label>
        <input
          type="text"
          name="courseId"
          id="courseId"
          value={formData.courseId}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
          Bio
        </label>
        <textarea
          name="bio"
          id="bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experience">
          Experience
        </label>
        <input
          type="text"
          name="experience"
          id="experience"
          value={formData.experience}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="previousCompany">
          Previous Company
        </label>
        <input
          type="text"
          name="previousCompany"
          id="previousCompany"
          value={formData.previousCompany}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Author Reviews
        </label>
        {authorReviews.map((review, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              name="userId"
              placeholder="User ID"
              value={review.userId}
              onChange={(e) => handleReviewChange(index, e)}
              className="w-full px-3 py-2 border rounded mb-2"
              required
            />
            <input
              type="number"
              name="rating"
              placeholder="Rating"
              value={review.rating}
              onChange={(e) => handleReviewChange(index, e)}
              className="w-full px-3 py-2 border rounded mb-2"
              required
            />
            <input
              type="text"
              name="comment"
              placeholder="Comment"
              value={review.comment}
              onChange={(e) => handleReviewChange(index, e)}
              className="w-full px-3 py-2 border rounded mb-2"
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddReview} className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700">
          Add Review
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Degrees
        </label>
        {degrees.map((degree, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={degree.title}
              onChange={(e) => handleDegreeChange(index, e)}
              className="w-full px-3 py-2 border rounded mb-2"
              required
            />
            <input
              type="text"
              name="institution"
              placeholder="Institution"
              value={degree.institution}
              onChange={(e) => handleDegreeChange(index, e)}
              className="w-full px-3 py-2 border rounded mb-2"
              required
            />
            <input
              type="number"
              name="year"
              placeholder="Year"
              value={degree.year}
              onChange={(e) => handleDegreeChange(index, e)}
              className="w-full px-3 py-2 border rounded mb-2"
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddDegree} className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700">
          Add Degree
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
          Image
        </label>
        <input
          type="file"
          name="image"
          id="image"
          onChange={handleFileChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700"
      >
        Add Author
      </button>
    </form>
  );
};

export default AddAuthorForm;
