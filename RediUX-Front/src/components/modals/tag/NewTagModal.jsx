import { useState } from "react";
import { createTag } from "../../../api/entities/tags";
import StringField from "../../form/StringField";
import Modal from "../Modal";

const NewTagModal = ({ isModalOpen, setIsModalOpen }) => {
  const [name, setName] = useState("");

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddTag = async () => {
    const response = await createTag(name);
    if (response) {
      setIsModalOpen(false);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      title="Cadastrar Tag"
      onConfirm={handleAddTag}
      onConfirmText="Adicionar"
    >
      <StringField
        value={name}
        onChange={setName}
        placeholder="Nome da Tag"
        width="w-full"
      />
    </Modal>
  );
};

export default NewTagModal;
