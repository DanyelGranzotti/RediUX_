import { toast } from "react-toastify";
import { deleteContent } from "../../../api/entities/content";
import Modal from "../Modal";

const DeleteContentModal = ({ isModalOpen, setIsModalOpen, content }) => {
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteContent = async () => {
    try {
      await deleteContent(content.id);
      setIsModalOpen(false);
      toast.success("Conteúdo excluído com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluír conteúdo!");
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      title="Excluir Conteúdo"
      onConfirm={handleDeleteContent}
      onConfirmText="Excluir"
      confirmButtonClass="red_dark_btn_layout w-3/12"
      cancelButtonClass="blue_dark_btn_layout w-3/12"
    >
      <p className="text-gray-700">
        Tem certeza que deseja excluir o conteúdo{" "}
        <strong>{content?.title}</strong>?
      </p>
      <p className="text-gray-700">Essa ação não pode ser desfeita.</p>
    </Modal>
  );
};

export default DeleteContentModal;
