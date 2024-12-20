import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateContent } from "../../../api/entities/content";
import { getTag } from "../../../api/entities/tags";
import DropdownField from "../../form/DropdownField";
import StringField from "../../form/StringField";
import TagSelector from "../../form/TagSelector";
import Modal from "../Modal";

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
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );

    if (!title || !autor || !description || !link || !mediaType) {
      toast.error("Todos os campos devem ser preenchidos!");
      return;
    }

    if (!urlPattern.test(link)) {
      toast.error("O link deve ser uma URL válida!");
      return;
    }

    try {
      const response = await updateContent(content.id, {
        title,
        autor,
        description,
        link,
        media_type: mediaType,
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
      setFormData({
        title: content.title || "",
        autor: content.autor || "",
        description: content.description || "",
        link: content.link || "",
        mediaType: content.media_type || "",
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
      {["title", "autor", "description", "link"].map((field) => (
        <StringField
          key={field}
          label={
            {
              title: "Título",
              autor: "Autor",
              description: "Descrição",
              link: "Link",
            }[field]
          }
          value={formData[field]}
          onChange={(value) => handleInputChange(field, value)}
          placeholder={"Digite aqui"}
          width="w-full"
        />
      ))}
      <DropdownField
        label="Tipo de Mídia"
        value={formData.mediaType}
        onChange={(value) => handleInputChange("mediaType", value)}
        options={[
          { label: "Livro", value: "livro" },
          { label: "Vídeo", value: "video" },
          { label: "Podcast", value: "podcast" },
          { label: "Artigo", value: "artigo" },
        ]}
        defaultOption="Selecione uma opção"
        defaultValue={formData.mediaType}
        width="w-full"
      />
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
