import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // For notifications

const VideoReviewsPage = () => {
  const [videoReviews, setVideoReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [newReview, setNewReview] = useState({
    title: '',
    videoUrl: '',
    userId: '',
    courseId: '',
    rating: 1,
    comment: '',
  });
  const [userNames, setUserNames] = useState({});
  const [courseTitles, setCourseTitles] = useState({});

  useEffect(() => {
    fetchVideoReviews();
    fetchUsersAndCourses(); // Fetch user names and course titles when component mounts
  }, []);

  // Fetch all video reviews
  const fetchVideoReviews = async () => {
    try {
      const response = await axios.get('https://ascend-skills-backend.onrender.com/api/video-reviews');
      setVideoReviews(response.data);
    } catch (error) {
      console.error('Error fetching video reviews:', error);
    }
  };

  // Fetch user names and course titles
  const fetchUsersAndCourses = async () => {
    try {
      const [usersResponse, coursesResponse] = await Promise.all([
        axios.get('https://ascend-skills-backend.onrender.com/api/users'),
        axios.get('https://ascend-skills-backend.onrender.com/api/courses'),
      ]);

      // Map users and courses to their IDs
      const userMap = {};
      usersResponse.data.forEach(user => {
        userMap[user._id] = user.username;
      });

      const courseMap = {};
      coursesResponse.data.forEach(course => {
        courseMap[course._id] = course.title;
      });

      setUserNames(userMap);
      setCourseTitles(courseMap);
    } catch (error) {
      console.error('Error fetching users or courses:', error);
    }
  };

  // Fetch a single video review by ID
  const fetchReviewById = async (id) => {
    try {
      const response = await axios.get(`https://ascend-skills-backend.onrender.com/api/video-reviews/${id}`);
      setNewReview(response.data);
    } catch (error) {
      console.error('Error fetching video review:', error);
    }
  };

  // Open modal for adding a new review
  const handleAddReview = () => {
    setNewReview({
      title: '',
      videoUrl: '',
      userId: '',
      courseId: '',
      rating: 1,
      comment: '',
    });
    setSelectedReview(null);
    setIsModalOpen(true);
  };

  // Open modal for editing an existing review
  const handleEditReview = async (review) => {
    setSelectedReview(review._id);
    await fetchReviewById(review._id);
    setIsModalOpen(true);
  };

  // Delete a review
  const handleDeleteReview = async (id) => {
    try {
      await axios.delete(`https://ascend-skills-backend.onrender.com/api/video-reviews/${id}`);
      toast.success('Video review deleted');
      fetchVideoReviews();
    } catch (error) {
      console.error('Error deleting video review:', error);
    }
  };

  // Save a new or updated review
  const handleSaveReview = async () => {
    try {
      if (selectedReview) {
        await axios.put(`https://ascend-skills-backend.onrender.com/api/video-reviews/${selectedReview}`, newReview);
        toast.success('Video review updated');
      } else {
        await axios.post('https://ascend-skills-backend.onrender.com/api/video-reviews', newReview);
        toast.success('Video review added');
      }
      fetchVideoReviews();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving video review:', error);
      toast.error('Error saving video review');
    }
  };

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({ ...prevReview, [name]: value }));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-6">Video Reviews</h1>
        <button
          onClick={handleAddReview}
          className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Add Video Review
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videoReviews.map((review) => (
          <div key={review._id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{review.title}</h3>
            <p className="text-gray-700 mb-2">{review.comment}</p>
            <p className="text-gray-500 mb-2">Rating: {review.rating}</p>
            <a
              href={review.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline mb-2 block"
            >
              Watch Video
            </a>
            <p className="text-gray-500 mb-2">User: {userNames[review.userId] || 'Unknown'}</p>
            <p className="text-gray-500 mb-2">Course: {courseTitles[review.courseId] || 'Unknown'}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleEditReview(review)}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteReview(review._id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">
              {selectedReview ? 'Edit Video Review' : 'Add Video Review'}
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={newReview.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Video URL</label>
              <input
                type="text"
                name="videoUrl"
                value={newReview.videoUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">User ID</label>
              <input
                type="text"
                name="userId"
                value={newReview.userId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Course ID</label>
              <input
                type="text"
                name="courseId"
                value={newReview.courseId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Rating</label>
              <input
                type="number"
                name="rating"
                value={newReview.rating}
                onChange={handleChange}
                min="1"
                max="5"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Comment</label>
              <textarea
                name="comment"
                value={newReview.comment}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="mr-2 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveReview}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoReviewsPage;
