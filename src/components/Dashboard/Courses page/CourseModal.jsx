import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const CourseModal = ({ course, authors, onSave, onClose, mode = 'add' }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    authorId: '',
    price: '',
    image: null,
    category: '',
    curriculum: {},
    pricing: '',
    vedio: '',
    reviews: [],
    courseRating: '',
  });

  useEffect(() => {
    if (course && mode !== 'add') {
      setFormData({
        title: course.title || '',
        description: course.description || '',
        duration: course.duration || '',
        authorId: course.authorId || '',
        price: course.price || '',
        image: null,
        category: course.category || '',
        curriculum: course.curriculum || {},
        pricing: course.pricing || '',
        vedio: course.vedio || '',
        reviews: course.reviews || [],
        courseRating: course.courseRating || '',
      });
    }
  }, [course, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prevData => ({ ...prevData, image: e.target.files[0] }));
  };

  const handleCurriculumChange = (moduleKey, topicIndex, value) => {
    setFormData(prevData => {
      const updatedCurriculum = { ...prevData.curriculum };
      if (!updatedCurriculum[moduleKey]) {
        updatedCurriculum[moduleKey] = [];
      }
      updatedCurriculum[moduleKey][topicIndex] = value;
      return { ...prevData, curriculum: updatedCurriculum };
    });
  };

  const handleAddModule = () => {
    const newModuleKey = `module${Object.keys(formData.curriculum).length + 1}`;
    setFormData(prevData => ({
      ...prevData,
      curriculum: { ...prevData.curriculum, [newModuleKey]: [''] }
    }));
  };

  const handleAddTopic = (moduleKey) => {
    setFormData(prevData => {
      const updatedCurriculum = { ...prevData.curriculum };
      updatedCurriculum[moduleKey] = [...updatedCurriculum[moduleKey], ''];
      return { ...prevData, curriculum: updatedCurriculum };
    });
  };

  const handleSave = () => {
    const dataToSend = {
      ...formData,
      curriculum: JSON.stringify(formData.curriculum)
    };
    console.log('Data being sent:', dataToSend);  // Log the data
    onSave(dataToSend).catch(error => {
      console.error('Error saving course:', error); // Log the error
    });
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {mode === 'add' ? 'Add New Course' : mode === 'edit' ? 'Edit Course' : 'Course Details'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              disabled={mode === 'view'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              disabled={mode === 'view'}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Duration (hours)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              disabled={mode === 'view'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Author</label>
            <select
              name="authorId"
              value={formData.authorId}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              disabled={mode === 'view'}
            >
              <option value="">Select an author</option>
              {authors.map(author => (
                <option key={author._id} value={author._id}>{author.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              disabled={mode === 'view'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              disabled={mode === 'view'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Curriculum</label>
            {Object.entries(formData.curriculum).map(([moduleKey, topics]) => (
              <div key={moduleKey} className="mt-2 p-4 border rounded-md">
                <input
                  type="text"
                  value={moduleKey}
                  onChange={(e) => {
                    const newCurriculum = { ...formData.curriculum };
                    newCurriculum[e.target.value] = newCurriculum[moduleKey];
                    delete newCurriculum[moduleKey];
                    setFormData(prevData => ({ ...prevData, curriculum: newCurriculum }));
                  }}
                  className="mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Module Name"
                  disabled={mode === 'view'}
                />
                {topics.map((topic, index) => (
                  <input
                    key={index}
                    type="text"
                    value={topic}
                    onChange={(e) => handleCurriculumChange(moduleKey, index, e.target.value)}
                    className="mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder={`Topic ${index + 1}`}
                    disabled={mode === 'view'}
                  />
                ))}
                {mode !== 'view' && (
                  <button
                    type="button"
                    onClick={() => handleAddTopic(moduleKey)}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Add Topic
                  </button>
                )}
              </div>
            ))}
            {mode !== 'view' && (
              <button
                type="button"
                onClick={handleAddModule}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Add Module
              </button>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Pricing</label>
            <input
              type="text"
              name="pricing"
              value={formData.pricing}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              disabled={mode === 'view'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Video URL</label>
            <input
              type="text"
              name="vedio"
              value={formData.vedio}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              disabled={mode === 'view'}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Course Rating</label>
            <input
              type="text"
              name="courseRating"
              value={formData.courseRating}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              disabled={mode === 'view'}
            />
          </div>


          {mode !== 'view' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Course Image</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="mt-1 block w-full"
              />
            </div>
          )}

          {/* {mode === 'view' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Course Rating</label>
              <input
                type="text"
                value={formData.courseRating}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                disabled
              />
            </div>
          )} */}

          {mode !== 'view' && (
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseModal;