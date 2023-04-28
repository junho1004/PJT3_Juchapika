import React from 'react';
import Swal from 'sweetalert2';

function Modal(data) {
    console.log(data.data)
  const handleClick = () => {
    Swal.fire({
      title: data.data.car,
      text: data.data.address,
    });
  };   

  return (
    <div>
      <button onClick={handleClick}>Show Alert</button>
    </div>
  );
}

export default Modal;
