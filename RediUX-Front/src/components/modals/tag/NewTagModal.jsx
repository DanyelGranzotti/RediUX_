import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createTag } from "../../../api/entities/tags";
import StringField from "../../form/StringField";
import Modal from "../modal";

const NewTagModal = ({ isModalOpen, setIsModalOpen }) => {
  const [name, setName] = useState("");

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddTag = async () => {
    try {
      const response = await createTag(name);
      if (response) {
        setIsModalOpen(false);
        toast.success("Tag criada com sucesso!");
      }
    } catch (error) {
      console.error("Error creating tag:", error);
      toast.error("Erro ao criar tag!");
    }
  };

  useEffect(() => {
    setName("");
  }, [isModalOpen]);

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      title="Cadastrar Tag"
      onConfirm={handleAddTag}
      onConfirmText="Adicionar"
    >
      <StringField
        label="Nome da Tag"
        value={name}
        onChange={setName}
        placeholder="Nome da Tag"
        width="w-full"
      />
    </Modal>
  );
};

export default NewTagModal;
