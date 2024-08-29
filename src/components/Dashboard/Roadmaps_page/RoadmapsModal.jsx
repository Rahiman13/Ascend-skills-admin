import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Base_Url from '../../../api';

const apiUrl =`${Base_Url}/roadmaps`
const apiUrl_courses=`${Base_Url}/courses`

const RoadmapsModal = ({ roadmap, onClose }) => {
  const [title, setTitle] = useState('');
  const [courseId, setCourseId] = useState('');
  const [courses, setCourses] = useState([]);
  const [contents, setContents] = useState([{ title: '', contents: [''] }]);

  useEffect(() => {
    if (roadmap) {
      setTitle(roadmap.title);
      setCourseId(roadmap.courseId._id);
      setContents(roadmap.contents || [{ title: '', contents: [''] }]);
    }
    fetchCourses();
  }, [roadmap]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${apiUrl_courses}`);
      setCourses(response.data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (roadmap) {
        await axios.put(`${apiUrl}/${roadmap._id}`, {
          title,
          courseId,
          contents,
        });
      } else {
        await axios.post(`${apiUrl}`, {
          title,
          courseId,
          contents,
        });
      }
      onClose();
    } catch (error) {
      console.error('Failed to save roadmap:', error);
    }
  };

  const handleContentChange = (index, field, value) => {
    const updatedContents = [...contents];
    updatedContents[index][field] = value;
    setContents(updatedContents);
  };

  const handleContentItemChange = (contentIndex, itemIndex, value) => {
    const updatedContents = [...contents];
    updatedContents[contentIndex].contents[itemIndex] = value;
    setContents(updatedContents);
  };

  const addContentSection = () => {
    setContents([...contents, { title: '', contents: [''] }]);
  };

  const addContentItem = (contentIndex) => {
    const updatedContents = [...contents];
    updatedContents[contentIndex].contents.push('');
    setContents(updatedContents);
  };

  const removeContentSection = (index) => {
    const updatedContents = contents.filter((_, i) => i !== index);
    setContents(updatedContents);
  };

  const removeContentItem = (contentIndex, itemIndex) => {
    const updatedContents = [...contents];
    updatedContents[contentIndex].contents = updatedContents[contentIndex].contents.filter(
      (_, i) => i !== itemIndex
    );
    setContents(updatedContents);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">
          {roadmap ? 'Edit Roadmap' : 'Add Roadmap'}
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Course</label>
          <select
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded">
            <option value="" disabled>Select a course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        {/* Content Sections */}
        <div className="mb-4">
          <label className="block text-gray-700">Contents</label>
          {contents.map((content, contentIndex) => (
            <div key={contentIndex} className="mb-4 p-3 bg-gray-100 rounded-lg">
              <input
                type="text"
                placeholder="Section Title"
                value={content.title}
                onChange={(e) =>
                  handleContentChange(contentIndex, 'title', e.target.value)
                }
                className="w-full px-3 py-2 mb-2 border border-gray-300 rounded"
              />
              {content.contents.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center mb-2">
                  <input
                    type="text"
                    placeholder="Content Item"
                    value={item}
                    onChange={(e) =>
                      handleContentItemChange(contentIndex, itemIndex, e.target.value)
                    }
                    className="flex-grow px-3 py-2 border border-gray-300 rounded"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      removeContentItem(contentIndex, itemIndex)
                    }
                    className="ml-2 text-red-500 hover:text-red-700 transition">
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addContentItem(contentIndex)}
                className="text-blue-500 hover:text-blue-700 transition mt-2">
                Add Content Item
              </button>
              <button
                type="button"
                onClick={() => removeContentSection(contentIndex)}
                className="ml-4 text-red-500 hover:text-red-700 transition mt-2">
                Remove Section
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addContentSection}
            className="text-blue-500 hover:text-blue-700 transition">
            Add Section
          </button>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoadmapsModal;
