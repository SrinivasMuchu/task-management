import React, { useState } from 'react';
import './TaskManagement.css'

const draggableItems = [
  {
    "_id": "64cc95b4825b643e10390612",
    "icon": "template-text-icon.svg",
    "placeholder": "Enter text",
    "display_type": "Text input",
    "input_type": "text",
    "is_default": false
  },
  {
    "_id": "64cc95d4825b643e10390614",
    "icon": "template-paragraph-icon.svg",
    "placeholder": "Enter text",
    "display_type": "Paragraph input",
    "input_type": "textarea",
    "is_default": false
  },
  {
    "_id": "64cc95e2825b643e10390616",
    "icon": "template-number-icon.svg",
    "placeholder": "Enter number",
    "display_type": "Number",
    "input_type": "number",
    "is_default": false
  },
  {
    "_id": "64cc95ef825b643e10390618",
    "icon": "template-date-icon.svg",
    "placeholder": "Select date",
    "display_type": "Date",
    "input_type": "date",
    "is_default": false
  },
  {
    "_id": "64cc961e825b643e10390620",
    "icon": "template-link-btn.svg",
    "placeholder": "Add link",
    "display_type": "Link",
    "input_type": "link",
    "is_default": false
  }
];

// Predefined default fields
const defaultFields = [
  {
    "_id": "64cc95b4825b643e10390612",
    "display_name": "Name",
    "input_type": "text",
    "is_default": true,
    "is_mandatory": true
  },
  {
    "_id": "64cc95d4825b643e10390614",
    "display_name": "Description",
    "input_type": "textarea",
    "is_default": true,
    "is_mandatory": false
  },
  {
    "_id": "64cc95e2825b643e10390616",
    "display_name": "Quantity",
    "input_type": "number",
    "is_default": true,
    "is_mandatory": true
  },
  {
    "_id": "64cc95ef825b643e10390618",
    "display_name": "Due Date",
    "input_type": "date",
    "is_default": true,
    "is_mandatory": false
  },
  {
    "_id": "64cc961e825b643e10390620",
    "display_name": "Website",
    "input_type": "link",
    "is_default": true,
    "is_mandatory": false
  }
];

function TaskForm() {
  const [fields, setFields] = useState([...defaultFields]); // Initialize with default fields
  const [formData, setFormData] = useState({});
  const [savedData, setSavedData] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempField, setTempField] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const draggedFieldId = event.dataTransfer.getData("text/plain");
    const draggedField = draggableItems.find(item => item._id === draggedFieldId);

    // Open modal for non-default fields
    if (draggedField && !draggedField.is_default) {
      setTempField(draggedField);
      setIsEditing(false); // Set editing mode to false (adding)
      setIsModalOpen(true);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    const { display_name, is_mandatory } = tempField;

    const newField = {
      ...tempField,
      display_name,
      is_mandatory,
    };

    if (isEditing) {
      // Update existing field based on index
      setFields((prevFields) => {
        const updatedFields = [...prevFields];
        updatedFields[editIndex] = newField;
        return updatedFields;
      });
    } else {
      // Add new field
      setFields((prevFields) => [...prevFields, newField]);
    }

    setIsModalOpen(false);
    setTempField({});
    setIsEditing(false); // Reset editing mode
    setEditIndex(null); // Reset edit index
  };

  const handleDeleteField = (index) => {
    setFields((prevFields) => prevFields.filter((_, i) => i !== index));
  };

  const handleEditField = (field, index) => {
    setTempField(field);
    setIsEditing(true); // Set editing mode to true
    setIsModalOpen(true); // Open modal for editing
    setEditIndex(index); // Store index for editing
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = fields.reduce((acc, field) => {
      const fieldKey = field.display_name.toLowerCase().replace(/\s+/g, '_');
      acc[fieldKey] = { ...field, value: formData[field.display_name] || '' };
      return acc;
    }, {});

    setSavedData(formattedData);
    console.log('Formatted Form Data:', formattedData);
    // You can send formattedData to your backend here
  };

  return (
    <div className='template-page' style={{ marginTop: '100px',marginLeft:'200px' }}>
      <div className='template-draging' >
        {draggableItems.map(item => (
          <div
            key={item._id}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text/plain", item._id)}
            style={{ padding: '10px', border: '1px solid #ddd', margin: '5px', cursor: 'grab' }}
          >
            <img src={item.icon} alt={item.display_type} style={{ width: '20px', marginRight: '10px' }} />
            {item.display_type}
          </div>
        ))}
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className='template-dropping'
        // style={{
        //   width: '60%',
        //   border: '2px dashed #ccc',
        //   padding: '10px',
        //   minHeight: '400px',
        //   position: 'relative',
        //   backgroundColor: '#fafafa'
        // }}
      >
        <h3>Form Builder Area</h3>
        <form onSubmit={handleSubmit}>
          {fields.map((field, index) => (
            <div key={field._id} style={{ marginBottom: '15px' }}>
              <label htmlFor={field.display_name}>{field.display_name}</label>
              {field.input_type === 'text' && (
                <input
                  type="text"
                  id={field.display_name}
                  name={field.display_name}
                  value={formData[field.display_name] || ''}
                  onChange={(e) => handleInputChange(field.display_name, e.target.value)}
                  required={field.is_mandatory}
                />
              )}
              {field.input_type === 'textarea' && (
                <textarea
                  id={field.display_name}
                  name={field.display_name}
                  value={formData[field.display_name] || ''}
                  onChange={(e) => handleInputChange(field.display_name, e.target.value)}
                  required={field.is_mandatory}
                />
              )}
              {field.input_type === 'number' && (
                <input
                  type="number"
                  id={field.display_name}
                  name={field.display_name}
                  value={formData[field.display_name] || ''}
                  onChange={(e) => handleInputChange(field.display_name, e.target.value)}
                  required={field.is_mandatory}
                />
              )}
              {field.input_type === 'date' && (
                <input
                  type="date"
                  id={field.display_name}
                  name={field.display_name}
                  value={formData[field.display_name] || ''}
                  onChange={(e) => handleInputChange(field.display_name, e.target.value)}
                  required={field.is_mandatory}
                />
              )}
              {field.input_type === 'link' && (
                <input
                  type="url"
                  id={field.display_name}
                  name={field.display_name}
                  value={formData[field.display_name] || ''}
                  onChange={(e) => handleInputChange(field.display_name, e.target.value)}
                  required={field.is_mandatory}
                />
              )}
              {/* Edit and Delete buttons only for non-default fields */}
              {!field.is_default && (
                <>
                  <button
                    type="button"
                    onClick={() => handleEditField(field, index)}
                    style={{ marginTop: '5px', marginRight: '5px' }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteField(index)}
                    style={{ marginTop: '5px', marginLeft: '5px' }}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}

         
        </form>
        <button type="submit">Save Form</button>
        {/* Modal for Adding/Editing Fields */}
        {isModalOpen && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: '1px solid #ccc',
            backgroundColor: 'white',
            padding: '20px',
            zIndex: 1000
          }}>
            <h3>{isEditing ? 'Edit Field' : 'Add Field'}</h3>
            <form onSubmit={handleModalSubmit}>
              <div>
                <label>
                  Display Name:
                  <input
                    type="text"
                    value={tempField.display_name || ''}
                    onChange={(e) => setTempField({ ...tempField, display_name: e.target.value })}
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={tempField.is_mandatory || false}
                    onChange={(e) => setTempField({ ...tempField, is_mandatory: e.target.checked })}
                  />
                  Mandatory
                </label>
              </div>
              <button type="submit">{isEditing ? 'Update' : 'Add'}</button>
              <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </form>
          </div>
        )}
      </div>

      {/* {savedData && <div>Saved Data: {JSON.stringify(savedData)}</div>} */}
    </div>
  );
}

export default TaskForm;
