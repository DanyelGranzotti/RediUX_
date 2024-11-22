import { useEffect, useState } from "react";
import { BsPencilFill, BsTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { getContent } from "../api/entities/content";
import SearchField from "../components/form/SearchField";
import DeleteContentModal from "../components/modals/content/DeleteContentModal";
import EditContentModal from "../components/modals/content/EditContentModal";
import NewContentModal from "../components/modals/content/NewContentModal";

const ContentManager = () => {
  const [search, setSearch] = useState("");
  const [openNewContent, setOpenNewContent] = useState(false);
  const [openDeleteContent, setOpenDeleteContent] = useState(false);
  const [openEditContent, setOpenEditContent] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [contents, setContents] = useState([]);

  const handleSearch = async () => {
    try {
      const result = await getContent(search);
      setContents(result);
    } catch (error) {
      console.error("Error fetching contents:", error);
      toast.error("Erro ao buscar conteúdos.");
    }
  };

  const fetchContents = async () => {
    try {
      const result = await getContent(search);
      setContents(result);
    } catch (error) {
      console.error("Error fetching contents:", error);
      toast.error("Erro ao buscar conteúdos.");
    }
  };

  useEffect(() => {
    fetchContents();
  }, [openNewContent, openDeleteContent]);

  useEffect(() => {
    if (!search) {
      fetchContents();
    }
  }, [search]);

  return (
    <main
      className="container flex flex-col justify-center items-center gap-8 md:px-32"
      style={{ minHeight: "calc(100vh - 7rem)" }}
    >
      <NewContentModal
        isModalOpen={openNewContent}
        setIsModalOpen={setOpenNewContent}
      />
      <DeleteContentModal
        isModalOpen={openDeleteContent}
        setIsModalOpen={setOpenDeleteContent}
        content={selectedContent}
      />
      <EditContentModal
        isModalOpen={openEditContent}
        setIsModalOpen={setOpenEditContent}
        content={selectedContent}
      />

      <h2 className="text-3xl font-semibold">Visualizar Conteúdos</h2>
      <div className="flex flex-col md:flex-row justify-center items-center w-full gap-4 ">
        <SearchField
          value={search}
          onChange={setSearch}
          placeholder="Digite sua busca"
          onSearch={handleSearch}
          width="md:w-3/4"
        />

        <button
          className="blue_dark_btn_layout w-3/12"
          onClick={() => {
            setOpenNewContent(true);
          }}
        >
          Cadastar Conteúdo
        </button>
      </div>

      <table className="table-auto w-full mt-8">
        <thead>
          <tr>
            <th className="w-2/4">Título</th>
            <th className="w-1/4">Autor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {contents.length > 0 ? (
            contents.map((content) => (
              <tr key={content.id}>
                <td>{content.title}</td>
                <td>{content.autor}</td>
                <td className="flex justify-center gap-4">
                  <button
                    className="text-red-500 hover:opacity-50 p-2"
                    onClick={() => {
                      setSelectedContent(content);
                      setOpenDeleteContent(true);
                    }}
                  >
                    <BsTrashFill size={24} />
                  </button>
                  <button
                    className="text-blue-dark hover:opacity-50 p-2"
                    onClick={() => {
                      setSelectedContent(content);
                      setOpenEditContent(true);
                    }}
                  >
                    <BsPencilFill size={24} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center">
                Nenhuma conteúdo encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
};

export default ContentManager;
