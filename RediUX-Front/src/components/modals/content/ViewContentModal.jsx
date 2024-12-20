import React from "react";
import Modal from "../Modal";

const ViewContentModal = ({ isModalOpen, setIsModalOpen, content }) => {
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      title="Visualizar Conteúdo"
    >
      <div className="space-y-4 ">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold">Título:</h3>
          <p className="text-gray-700">{content?.title}</p>
        </div>
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold">Autor</h3>
          <p className="text-gray-700">{content?.autor}</p>
        </div>
        <div className="flex flex-col  gap-4">
          <h3 className="text-lg font-semibold">Descrição</h3>
          <p className="text-gray-700">{content?.description}</p>
        </div>
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold">Link</h3>
          <a
            href={content?.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {content?.link}
          </a>
        </div>
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold">Tipo de Mídia</h3>
          <p className="text-gray-700">
            {content?.media_type.charAt(0).toUpperCase() +
              content?.media_type.slice(1)}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold">Tags</h3>
          <p className="text-gray-700">
            {content?.tags?.map((tag) => tag.name).join(", ")}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ViewContentModal;
