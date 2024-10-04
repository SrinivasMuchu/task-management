import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa'; // Import the edit icon from react-icons
import './DetailsPage.css';
import DateContainer from './DateContainer';

function DetailsPageView() {
  // State to track edit mode for each field
  const [isEditing, setIsEditing] = useState({
    title: false,
    priority: false,
    description: false,
  });
  
  // State to hold the field values and backup values for cancel
  const [fields, setFields] = useState({
    title: 'Default Title',
    priority: 'High',
    description: 'This is a default description paragraph.',
  });
  const [backupFields, setBackupFields] = useState(fields); // Initialize backup fields

  const [tasks, setTasks] = useState([]); // State for tasks (with due dates)
  const [comments, setComments] = useState([]); // State to store the list of comments
  const [newComment, setNewComment] = useState(''); // State for the new comment text
  const [isAddingComment, setIsAddingComment] = useState(false); // State to control visibility of the new comment input

  // Simulated fetching tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      // Simulate an API call with dummy data
      const fetchedTasks = [
        { id: 1, name: 'Task 1', dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000) }, // Default tomorrow
         // Day after tomorrow
      ];
      setTasks(fetchedTasks);
    };

    fetchTasks();
  }, []);

  // Handle updating the due date
  const handleUpdateDueDate = (taskId, newDueDate) => {
    // Update the task state with the new due date
    setTasks(tasks.map(task => (task.id === taskId ? { ...task, dueDate: newDueDate } : task)));
  };

  // Handle adding a new comment
  const handleAddCommentClick = () => {
    setIsAddingComment(true);
  };

  // Handle saving the new comment
  const handleSaveComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]); // Add the new comment to the list
      setNewComment(''); // Clear the input field
      setIsAddingComment(false); // Hide the input area
    }
  };

  // Handle canceling the new comment input
  const handleCancelComment = () => {
    setNewComment(''); // Clear the new comment input
    setIsAddingComment(false); // Hide the input area
  };

  // Handle deleting a comment
  const handleDeleteComment = (index) => {
    setComments(comments.filter((_, i) => i !== index)); // Remove the comment at the specified index
  };

  // Toggle edit mode for a specific field
  const handleEditClick = (field) => {
    setBackupFields(fields); // Save current values to backup
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Cancel editing and revert to backup values
  const handleCancel = (field) => {
    setFields(backupFields); // Revert to the backup values
    setIsEditing((prev) => ({ ...prev, [field]: false }));
  };

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className='details-page' style={{ marginTop: '100px',marginLeft:'200px' }}>
      <div className='details-left'>
        {/* Title Field */}
        <div className='details-field-title'>
          {isEditing.title ? (
            <div>
              <textarea
                type='text'
                name='title'
                value={fields.title}
                onChange={handleChange}
              />
              <button onClick={() => { setFields(fields); setIsEditing((prev) => ({ ...prev, title: false })); }}>Save</button>
              <button onClick={() => handleCancel('title')}>Cancel</button>
            </div>
          ) : (
            <div className='details-value-title'>
              {fields.title}
              <FaEdit className='edit-icon' onClick={() => handleEditClick('title')} />
            </div>
          )}
        </div>

        {/* Priority Field */}
        <div className='details-field'>
          <div className='details-label'>Priority</div>
          {isEditing.priority ? (
            <div>
              <input
                type='text'
                name='priority'
                value={fields.priority}
                onChange={handleChange}
              />
              <button onClick={() => { setFields(fields); setIsEditing((prev) => ({ ...prev, priority: false })); }}>Save</button>
              <button onClick={() => handleCancel('priority')}>Cancel</button>
            </div>
          ) : (
            <div className='details-value'>
              {fields.priority}
              <FaEdit className='edit-icon' onClick={() => handleEditClick('priority')} />
            </div>
          )}
        </div>

        {/* Description Field */}
        <div className='details-field'>
          {isEditing.description ? (
            <div>
              <textarea
                name='description'
                value={fields.description}
                onChange={handleChange}
              />
              <button onClick={() => { setFields(fields); setIsEditing((prev) => ({ ...prev, description: false })); }}>Save</button>
              <button onClick={() => handleCancel('description')}>Cancel</button>
            </div>
          ) : (
            <div className='details-value'>
              {fields.description}
              <FaEdit className='edit-icon' onClick={() => handleEditClick('description')} />
            </div>
          )}
        </div>

        {/* Comments Section */}
        <div className='details-field'>
          <div className='details-label'>Comments</div>

          {/* Display existing comments */}
          {comments.map((comment, index) => (
            <div key={index} className='comment-container'>
              <div className='comment-text'>{comment}</div>
              <button className='comment-button' onClick={() => handleDeleteComment(index)}>Delete</button>
            </div>
          ))}

          {/* New comment input area */}
          {isAddingComment ? (
            <div className='comment-input'>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder='Write your comment here...'
              />
              <div className='comment-buttons'>
                <button className='comment-button' onClick={handleSaveComment}>Save</button>
                <button className='comment-button' onClick={handleCancelComment}>Cancel</button>
              </div>
            </div>
          ) : (
            <button className='comment-button' onClick={handleAddCommentClick}>Add a Comment</button>
          )}
        </div>
      </div>

      {/* Placeholder for Calendar */}
      <div className='details-right'>
       <DateContainer tasks={tasks} onUpdateDueDate={handleUpdateDueDate}/>
      </div>
    </div>
  );
}

export default DetailsPageView;
