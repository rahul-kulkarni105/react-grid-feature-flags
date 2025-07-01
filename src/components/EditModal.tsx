import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

interface EditModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  rowData: any; // Replace 'any' with the appropriate type from your types file
  onSave: (updatedRow: any) => void; // Replace 'any' with the appropriate type
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onRequestClose,
  rowData,
  onSave,
}) => {
  const [formData, setFormData] = useState(rowData);

  useEffect(() => {
    setFormData(rowData);
  }, [rowData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onRequestClose();
  };

  const handleCancel = () => {
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={handleCancel}>
      <h2>Edit Row</h2>
      <form>
        {Object.keys(formData).map(key => (
          <div key={key}>
            <label>
              {key}:
              {typeof formData[key] === 'boolean' ? (
                <input
                  type='checkbox'
                  name={key}
                  checked={formData[key]}
                  onChange={handleChange}
                />
              ) : (
                <input
                  type='text'
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                />
              )}
            </label>
          </div>
        ))}
      </form>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </Modal>
  );
};

export default EditModal;
