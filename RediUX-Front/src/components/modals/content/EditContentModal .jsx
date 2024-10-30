import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateContent } from "../../../api/entities/content";
import { getTag } from "../../../api/entities/tags";
import StringField from "../../form/StringField";
import TagSelector from "../../form/TagSelector";
import Modal from "../modal";

const EditContentModal = ({ isModalOpen, setIsModalOpen, content }) => {
  const [title, setTitle] = useState(content?.title || "");
  const [autor, setAutor] = useState(content?.autor || "");
  const [description, setDescription] = useState(content?.description || "");
  const [link, setLink] = useState(content?.link || "");
  const [mediaType, setMediaType] = useState(content?.mediaType || "");
  const [selectedTags, setSelectedTags] = useState(
    content?.tags.map((tag) => ({ id: tag.id, label: tag.name })) || []
  );
  const [tags, setTags] = useState([]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateContent = async () => {
    try {
      const response = await updateContent(content.id, {
        title,
        autor,
        description,
        link,
        mediaType,
        tags: selectedTags.map((tag) => tag.id),
      });

      if (response) {
        setIsModalOpen(false);
        toast.success("Conteúdo atualizado com sucesso!");
      }
    } catch (error) {
      console.error("Error updating content:", error);
      toast.error("Erro ao atualizar conteúdo!");
    }
  };

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

  useEffect(() => {
    if (isModalOpen && content) {
      setTitle(content.title || "");
      setAutor(content.autor || "");
      setDescription(content.description || "");
      setLink(content.link || "");
      setMediaType(content.mediaType || "");
      setSelectedTags(
        content.tags.map((tag) => ({ id: tag.id, label: tag.name })) || []
      );
    }
  }, [isModalOpen, content]);

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      title="Editar Conteúdo"
      onConfirm={handleUpdateContent}
      onConfirmText="Salvar Alterações"
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

export default EditContentModal;
