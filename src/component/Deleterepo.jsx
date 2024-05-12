import React from 'react';

function DeleteRepo({ onConfirm, onCancel }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Are you sure you want to delete this repository?</h2>
                <div className="button-group">
                    <button onClick={onConfirm}>Yes</button>
                    <button onClick={onCancel}>No</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteRepo;
