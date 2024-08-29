import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddCourseModal = ({ onClose, onCourseAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pricing, setPricing] = useState('');
  const [duration, setDuration] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState({ id: '', name: '', image: '' });
  const [courseRating, setCourseRating] = useState('');
  const [curriculum, setCurriculum] = useState([{ module: '', topics: '' }]);
  const [selectedReviews, setSelectedReviews] = useState([]);
  const [videoUrls, setVideoUrls] = useState(['']);
  const [authors, setAuthors] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/authors');
        setAuthors(response.data);
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchAuthors();
    fetchReviews();
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCurriculumChange = (index, field, value) => {
    const newCurriculum = [...curriculum];
    newCurriculum[index][field] = value;
    setCurriculum(newCurriculum);
  };

  const addCurriculumModule = () => {
    setCurriculum([...curriculum, { module: '', topics: '' }]);
  };

  const handleVideoUrlChange = (index, value) => {
    const newVideoUrls = [...videoUrls];
    newVideoUrls[index] = value;
    setVideoUrls(newVideoUrls);
  };

  const addVideoUrlField = () => {
    setVideoUrls([...videoUrls, '']);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Using id instead of _id
    const authorId = selectedAuthor ? selectedAuthor.id : null;
    const authorName = selectedAuthor ? selectedAuthor.name : '';

    if (!authorId) {
      alert('Please select an author.');
      return;
    }

    const courseData = {
      title,
      description,
      duration,
      author: authorName,
      authorId, // corrected
      pricing,
      category,
      curriculum,
      video: videoUrls,
      courseRating,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/courses/', courseData);
      console.log('Course added successfully:', response.data);
      alert('Course added successfully')
      onCourseAdded(response.data); // Call onCourseAdded if provided to update the UI
      onClose(); // Close the modal after submission
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };


  const handleAuthorChange = (e) => {
    const selected = authors.find(author => author._id === e.target.value);
    if (selected) {
      setSelectedAuthor({
        id: selected._id,
        name: selected.name,
        image: selected.image,
      });
    }
  };

  const handleReviewChange = (e) => {
    const selectedReviewIds = Array.from(e.target.selectedOptions, option => option.value);
    const selectedReviewObjects = selectedReviewIds.map(id => reviews.find(review => review._id === id));
    setSelectedReviews(selectedReviewObjects);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96 h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Add New Course</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <input
            type="text"
            placeholder="Pricing"
            value={pricing}
            onChange={(e) => setPricing(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <input
            type="text"
            placeholder="Duration (in hours)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <select
            value={selectedAuthor.id}
            onChange={handleAuthorChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          >
            <option value="">Select Author</option>
            {authors.map((author) => (
              <option key={author._id} value={author._id}>
                {author.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Course Rating (out of 5)"
            value={courseRating}
            onChange={(e) => setCourseRating(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          {curriculum.map((module, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                placeholder={`Module ${index + 1}`}
                value={module.module}
                onChange={(e) => handleCurriculumChange(index, 'module', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-2"
                required
              />
              <textarea
                placeholder="Topics (Comma-separated)"
                value={module.topics}
                onChange={(e) => handleCurriculumChange(index, 'topics', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addCurriculumModule}
            className="text-blue-500 mb-4"
          >
            Add Module
          </button>
          <select
            multiple
            onChange={handleReviewChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          >
            {reviews.map((review) => (
              <option key={review._id} value={review._id}>
                {review.title}
              </option>
            ))}
          </select>
          {videoUrls.map((url, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                placeholder={`Video URL ${index + 1}`}
                value={url}
                onChange={(e) => handleVideoUrlChange(index, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addVideoUrlField}
            className="text-blue-500 mb-4"
          >
            Add Video URL
          </button>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="text-red-500 mr-4">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Add Course</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseModal;
