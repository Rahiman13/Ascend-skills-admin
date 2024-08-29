import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewCard from './ReviewCard';
import Modal from './ReviewModal';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Base_Url from '../../../api';

const apiUrl =`${Base_Url}/reviews`

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      // const { data } = await axios.get('https://ascend-skills-backend.onrender.com/api/reviews');
      // const { data } = await axios.get('http://localhost:5000/api/reviews');
      const { data } = await axios.get(`${apiUrl}`);
      console.log(apiUrl)
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleAddClick = () => {
    setEditMode(false);
    setCurrentReview(null);
    setShowModal(true);
  };

  const handleEditClick = (review) => {
    setEditMode(true);
    setCurrentReview(review);
    setShowModal(true);
  };

  const handleDeleteClick = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://ascend-skills-backend.onrender.com/api/reviews/${id}`);
          Swal.fire('Deleted!', 'The review has been deleted.', 'success');
          fetchReviews();
        } catch (error) {
          Swal.fire('Error!', 'There was an issue deleting the review.', 'error');
        }
      }
    });
  };

  const handleModalClose = () => {
    setShowModal(false);
    fetchReviews();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between">

        <h1 className="text-3xl font-bold mb-6">Reviews</h1>
        <button
          onClick={handleAddClick}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Review
        </button>
          
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review) => (
          <ReviewCard
            key={review._id}
            review={review}
            onEdit={() => handleEditClick(review)}
            onDelete={() => handleDeleteClick(review._id)}
          />
        ))}
      </div>

      {
        showModal && (
          <Modal
            onClose={handleModalClose}
            editMode={editMode}
            review={currentReview}
          />
        )
      }
    </div >
  );
};

export default ReviewPage;
