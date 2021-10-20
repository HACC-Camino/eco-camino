import React, { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { BsFillBellFill } from 'react-icons/bs';

const isScroll = [
  {
    name: '',
    scroll: true,
    backdrop: true,
  },
];
const NotificationOffCanvas = ({ name, ...props }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  return (
      <>
        <a>
      <BsFillBellFill size="25px" color="white" style={{ cursor: 'pointer' }} onClick={toggleShow} />
        {name}
        </a>
  <Offcanvas show={show} onHide={handleClose} {...props}>
    <Offcanvas.Header closeButton>
      <Offcanvas.Title>Notifications</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
      Notifications will appear here.
    </Offcanvas.Body>
  </Offcanvas>
  </>
  );
};

const OffCanvas = () => (
      <>
        {isScroll.map((props, idx) => (
            <NotificationOffCanvas key={idx} {...props} placement="end"/>
        ))}
      </>
  );

NotificationOffCanvas.propTypes = {
  name: PropTypes.string.isRequired,
};

export default OffCanvas;
