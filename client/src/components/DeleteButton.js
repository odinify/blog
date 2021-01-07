import React from 'react';
import { BiTrash } from 'react-icons/bi';

const DeleteButton = ({ deletePost }) => (
  <button className="delete-button" onClick={deletePost}>
    <BiTrash />
  </button>
);

export default DeleteButton;
