import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createContent } from "../../../api/entities/content";
import { getTag } from "../../../api/entities/tags";
import StringField from "../../form/StringField";
import TagSelector from "../../form/TagSelector";
import Modal from "../modal";

const NewContentModal = ({ isModalOpen, setIsModalOpen }) => {
  const [title, setTitle] = useState("");
  const [autor, setAutor] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddContent = async () => {
    try {
      const response = await createContent(
        title,
        autor,
        description,
        link,
        mediaType,
        selectedTags.map((tag) => tag.id)
      );

      if (response) {
        setIsModalOpen(false);
        toast.success("Conteúdo criado com sucesso!");
      }
    } catch (error) {
      console.error("Error creating content:", error);
      toast.error("Erro ao criar conteúdo!");
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      setTitle("");
      setAutor("");
      setDescription("");
      setLink("");
      setMediaType("");
      setSelectedTags([]);
    }
  }, [isModalOpen]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await getTag();
        setTags(response);
      } catch (error) {
        console.error("Error getting tags:", error);
      }
    };

    fetchTags();
  }, []);

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      title="Cadastrar Conteúdo"
      onConfirm={handleAddContent}
      onConfirmText="Adicionar"
    >
      <StringField
        label="Título do Conteúdo"
        value={title}
        onChange={setTitle}
        placeholder="Título do Conteúdo"
        width="w-full"
      />
      <StringField
        label="Autor"
        value={autor}
        onChange={setAutor}
        placeholder="Autor"
        width="w-full"
      />
      <StringField
        label="Descrição"
        value={description}
        onChange={setDescription}
        placeholder="Descrição"
        width="w-full"
      />
      <StringField
        label="Link"
        value={link}
        onChange={setLink}
        placeholder="Link"
        width="w-full"
      />
      <StringField
        label="Tipo de Mídia"
        value={mediaType}
        onChange={setMediaType}
        placeholder="Tipo de Mídia"
        width="w-full"
      />

      <TagSelector
        label="Tags"
        selectedTags={selectedTags}
        onTagAdd={(tag) => setSelectedTags([...selectedTags, tag])}
        onTagRemove={(tag) =>
          setSelectedTags(selectedTags.filter((t) => t.id !== tag.id))
        }
        options={tags.map((tag) => ({
          id: tag.id,
          label: tag.name,
        }))}
        defaultOption="Adicionar Tag"
        width="w-full"
      />
    </Modal>
  );
};

export default NewContentModal;
