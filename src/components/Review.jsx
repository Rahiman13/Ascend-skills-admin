import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-8">User Testimonials</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map(review => (
            <div key={review._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-2">
                  {review.courseId ? review.courseId.title : 'Course Title Not Available'}
                </h2>
                <p className="text-gray-700 mb-2">
                  By: {review.userId ? review.userId.username : 'Anonymous'}
                </p>
                <div className="flex items-center mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.956a1 1 0 00.95.69h4.188c.969 0 1.371 1.24.588 1.81l-3.393 2.466a1 1 0 00-.364 1.118l1.287 3.956c.3.922-.755 1.688-1.54 1.118l-3.393-2.466a1 1 0 00-1.175 0l-3.393 2.466c-.784.57-1.838-.196-1.539-1.118l1.287-3.956a1 1 0 00-.364-1.118L2.626 8.384c-.784-.57-.38-1.81.588-1.81h4.188a1 1 0 00.95-.69l1.286-3.956z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-2">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
