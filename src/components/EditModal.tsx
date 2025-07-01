import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FormData, EditModalProps } from '../types';

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onRequestClose,
  rowData,
  onSave,
}) => {
  const [formData, setFormData] = useState<FormData>(rowData);

  useEffect(() => {
    setFormData(rowData);
  }, [rowData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, type, checked, value } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = (): void => {
    onSave(formData);
    onRequestClose();
  };

  const handleCancel = (): void => {
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
