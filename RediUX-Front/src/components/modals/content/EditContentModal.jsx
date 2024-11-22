import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateContent } from "../../../api/entities/content";
import { getTag } from "../../../api/entities/tags";
import StringField from "../../form/StringField";
import TagSelector from "../../form/TagSelector";
import Modal from "../modal";

const EditContentModal = ({ isModalOpen, setIsModalOpen, content }) => {
  const [formData, setFormData] = useState({
    title: content?.title || "",
    autor: content?.autor || "",
    description: content?.description || "",
    link: content?.link || "",
    mediaType: content?.mediaType || "",
    selectedTags:
      content?.tags?.map((tag) => ({ id: tag.id, label: tag.name })) || [],
  });
  const [tags, setTags] = useState([]);

  const handleCloseModal = () => setIsModalOpen(false);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleUpdateContent = async () => {
    const { title, autor, description, link, mediaType, selectedTags } =
      formData;
    if (!title || !autor || !description || !link || !mediaType) {
      toast.error("Todos os campos devem ser preenchidos!");
      return;
    }
    try {
      const response = await updateContent(content.id, {
        title,
        autor,
        description,
        link,
        media_type: mediaType,
        tags: selectedTags.map((tag) => ({ id: tag.id, name: tag.label })),
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
      setFormData({
        title: content.title || "",
        autor: content.autor || "",
        description: content.description || "",
        link: content.link || "",
        mediaType: content.mediaType || "",
        selectedTags:
          content.tags?.map((tag) => ({ id: tag.id, label: tag.name })) || [],
      });
    }
  }, [isModalOpen, content]);

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      title="Editar Conteúdo"
      onConfirm={handleUpdateContent}
      onConfirmText="Salvar"
    >
      {["title", "autor", "description", "link", "mediaType"].map((field) => (
        <StringField
          key={field}
          label={
            {
              title: "Título",
              autor: "Autor",
              description: "Descrição",
              link: "Link",
              mediaType: "Tipo de Mídia",
            }[field]
          }
          value={formData[field]}
          onChange={(value) => handleInputChange(field, value)}
          placeholder={"Digite aqui"}
          width="w-full"
        />
      ))}
      <TagSelector
        label="Tags"
        selectedTags={formData.selectedTags}
        onTagAdd={(tag) =>
          handleInputChange("selectedTags", [...formData.selectedTags, tag])
        }
        onTagRemove={(tag) =>
          handleInputChange(
            "selectedTags",
            formData.selectedTags.filter((t) => t.id !== tag.id)
          )
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
