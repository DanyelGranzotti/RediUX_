import Modal from "../modal";

const NewContentModal = ({ isModalOpen, setIsModalOpen }) => {
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
      title="Cadastrar conteúdo"
    ></Modal>
  );
};

export default NewContentModal;
