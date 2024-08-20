import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditCourseModal = ({ course, onClose, onCourseUpdated }) => {
  const [title, setTitle] = useState(course.title || '');
  const [description, setDescription] = useState(course.description || '');
  const [price, setPrice] = useState(course.price || '');
  const [duration, setDuration] = useState(course.duration || '');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState(course.category || '');
  const [authorId, setAuthorId] = useState(course.authorId || '');
  const [authorName, setAuthorName] = useState(course.authorName || '');
  const [authorImage, setAuthorImage] = useState(null);
  const [courseRating, setCourseRating] = useState(course.courseRating || '');
  const [curriculum, setCurriculum] = useState(course.curriculum || {});
  const [reviewIds, setReviewIds] = useState(course.reviews || []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAuthorImageChange = (e) => {
    setAuthorImage(e.target.files[0]);
  };

  const handleCurriculumChange = (module, topics) => {
    setCurriculum(prevCurriculum => ({
      ...prevCurriculum,
      [module]: topics.split(',').map(topic => topic.trim())
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('duration', duration);
    formData.append('category', category);
    if (image) formData.append('image', image); // Append image only if it's updated
    formData.append('authorId', authorId);
    formData.append('authorName', authorName);
    if (authorImage) formData.append('authorImage', authorImage); // Append author image only if it's updated
    formData.append('courseRating', courseRating);
    formData.append('curriculum', JSON.stringify(curriculum));
    formData.append('reviews', JSON.stringify(reviewIds));

    try {
      // Send PUT request to update the course
      const response = await axios.put(`https://ascend-skills-backend.onrender.com/api/courses/${course._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onCourseUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating course:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    if (course) {
      setTitle(course.title || '');
      setDescription(course.description || '');
      setPrice(course.price || '');
      setDuration(course.duration || '');
      setCategory(course.category || '');
      setAuthorId(course.authorId || '');
      setAuthorName(course.authorName || '');
      setCourseRating(course.courseRating || '');
      setCurriculum(course.curriculum || {});
      setReviewIds(course.reviews || []);
    }
  }, [course]);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md h-auto max-h-[80vh] overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Edit Course</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="text"
            placeholder="Duration (in hours)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="text"
            placeholder="Author ID"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="text"
            placeholder="Author Name"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleAuthorImageChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="number"
            placeholder="Course Rating (out of 5)"
            value={courseRating}
            onChange={(e) => setCourseRating(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <textarea
            placeholder="Curriculum (Enter module topics separated by commas)"
            onChange={(e) => handleCurriculumChange('Module1', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <textarea
            placeholder="Review IDs (Comma separated IDs)"
            value={reviewIds.join(',')}
            onChange={(e) => setReviewIds(e.target.value.split(',').map(id => id.trim()))}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="text-red-500 mr-4">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Update Course</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourseModal;
