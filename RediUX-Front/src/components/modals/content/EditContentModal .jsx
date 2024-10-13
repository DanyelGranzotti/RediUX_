import Modal from "../modal";

const EditContentModal = ({ isModalOpen, setIsModalOpen }) => {
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      title="Editar conteúdo"
    ></Modal>
  );
};

export default EditContentModal;
