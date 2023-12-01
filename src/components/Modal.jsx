import {useState} from 'react'


export const Modal = () => {

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
      setIsOpen(true);
    };
  
    const closeModal = () => {
      setIsOpen(false);
    };
  
    return (
      <div>
        <button onClick={openModal}>Open Modal</button>
        {isOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <h2>Modal Title</h2>
              <p>Modal content goes here.</p>
            </div>
          </div>
        )}
      </div>
    );
  }
