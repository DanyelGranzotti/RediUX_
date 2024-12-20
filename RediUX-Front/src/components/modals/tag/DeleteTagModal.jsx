import { toast } from "react-toastify";
import { deleteTag } from "../../../api/entities/tags";
import Modal from "../Modal";

const DeleteTagModal = ({ isModalOpen, setIsModalOpen, tag }) => {
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteTag = async () => {
    try {
      await deleteTag(tag.id);
      setIsModalOpen(false);
      toast.success("Tag excluída com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir tag!");
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      title="Excluir Tag"
      onConfirm={handleDeleteTag}
      onConfirmText="Excluir"
      confirmButtonClass="red_dark_btn_layout w-3/12"
      cancelButtonClass="blue_dark_btn_layout w-3/12"
    >
      <p className="text-gray-700">
        Tem certeza que deseja excluir a tag <strong>{tag?.name}</strong>?
      </p>
      <p className="text-gray-700">Essa ação não pode ser desfeita.</p>
    </Modal>
  );
};

export default DeleteTagModal;
