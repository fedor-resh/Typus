import Modal from './Modal';
import React, {useState} from 'react';
import ContextButton from '../ContextButton/ContextButton';

export default {
  title: 'Components/Modal',
  component: Modal,
};

const Template = (args) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  return (
    <>
      <ContextButton onClick={handleOpen}>Открыть</ContextButton>
      {modalOpen && <Modal {...args}>
        <p>Текст</p>
        <ContextButton onClick={handleClose}>Закрыть</ContextButton>
      </Modal>}
    </>
  );
};

export const Regular = Template.bind({});
