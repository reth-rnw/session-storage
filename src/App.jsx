import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

const App = () => {
  const [formData, setFormData] = useState({});
  const [submittedData, setSubmittedData] = useState([]);

  useEffect(() => {
    const data = sessionStorage.getItem('feedbackData');
    if (data) {
      setSubmittedData(JSON.parse(data));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRating = (ratingValue) => {
    setFormData({ ...formData, rating: ratingValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFeedback = [...submittedData, formData];
    setSubmittedData(newFeedback);
    sessionStorage.setItem('feedbackData', JSON.stringify(newFeedback));
    setFormData({});
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Feedback Form</h2>
      <form onSubmit={handleSubmit} className="bg-gray-700 p-4 w-1/4 mx-auto rounded-md shadow-md">
        <div className="mb-4">
          <label className="block text-white">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleInputChange}
            className="mt-2 p-2 w-full rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleInputChange}
            className="mt-2 p-2 w-full rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white">Rating</label>
          <div className="flex space-x-2 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={30}
                color={star <= formData.rating ? 'yellow' : 'black'}
                className="cursor-pointer"
                onMouseEnter={() => handleRating(star)}
                onClick={() => handleRating(star)}
              />
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-white">Feedback</label>
          <textarea
            name="feedback"
            value={formData.feedback || ''}
            onChange={handleInputChange}
            className="mt-2 p-2 w-full rounded-md"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Submit</button>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4 text-center">Submitted Feedback</h3>
        <div className="grid grid-cols-3 gap-5">
          {submittedData.map((item, index) => (
            <div key={index} className="text-white bg-gray-700 p-4 mb-4 text-lg rounded-md shadow-md">
              <p><span className='font-bold'>Name:</span> {item.name}</p>
              <p><span className='font-bold'>Email:</span> {item.email}</p>
              <p className="flex items-center"><span className='font-bold'>Rating:</span>
                {Array(5).fill(0).map((_, i) => (
                  <FaStar
                    key={i}
                    size={20}
                    color={i < item.rating ? 'yellow' : 'black'}
                  />
                ))}
              </p>
              <p><span className='font-bold'>Feedback:</span> {item.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
