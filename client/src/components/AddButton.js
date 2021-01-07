import React from 'react';
import { Link } from 'react-router-dom';

const AddButton = () => (
  <Link className="add-button" to="/new">
    +
  </Link>
);

export default AddButton;
