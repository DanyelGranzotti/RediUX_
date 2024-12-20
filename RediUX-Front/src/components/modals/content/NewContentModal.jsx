import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createContent } from "../../../api/entities/content";
import { getTag } from "../../../api/entities/tags";
import DropdownField from "../../form/DropdownField";
import StringField from "../../form/StringField";
import TagSelector from "../../form/TagSelector";
import Modal from "../Modal";

const NewContentModal = ({ isModalOpen, setIsModalOpen }) => {
  const [formData, setFormData] = useState({
    title: "",
    autor: "",
    description: "",
    link: "",
    mediaType: "",
    selectedTags: [],
  });
  const [tags, setTags] = useState([]);

  const handleCloseModal = () => setIsModalOpen(false);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleAddContent = async () => {
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
      const response = await createContent({
        title,
        autor,
        description,
        link,
        media_type: mediaType,
        tags: selectedTags.map((tag) => tag.id),
      });

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
      setFormData({
        title: "",
        autor: "",
        description: "",
        link: "",
        mediaType: "",
        selectedTags: [],
      });
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

export default NewContentModal;
