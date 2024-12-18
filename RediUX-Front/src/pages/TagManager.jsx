import { useEffect, useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { getTag } from "../api/entities/tags";
import SearchField from "../components/form/SearchField";
import DeleteTagModal from "../components/modals/tag/DeleteTagModal";
import NewTagModal from "../components/modals/tag/NewTagModal";

const TagManager = () => {
  const [search, setSearch] = useState("");
  const [openNewTag, setOpenNewTag] = useState(false);
  const [openDeleteTag, setOpenDeleteTag] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [tags, setTags] = useState([]);

  const handleSearch = async () => {
    try {
      const result = await getTag(search);
      setTags(result);
    } catch (error) {
      console.error("Error fetching tags:", error);
      toast.error("Erro ao buscar tags.");
    }
  };

  const fetchTags = async () => {
    try {
      const result = await getTag(search);
      setTags(result);
    } catch (error) {
      console.error("Error fetching tags:", error);
      toast.error("Erro ao buscar tags.");
    }
  };

  useEffect(() => {
    fetchTags();
  }, [openNewTag, openDeleteTag]);

  useEffect(() => {
    if (!search) {
      fetchTags();
    }
  }, [search]);

  return (
    <main
      className="container flex flex-col justify-center items-center gap-8 md:px-32"
      style={{ minHeight: "calc(100vh - 7rem)" }}
    >
      <NewTagModal isModalOpen={openNewTag} setIsModalOpen={setOpenNewTag} />
      <DeleteTagModal
        isModalOpen={openDeleteTag}
        setIsModalOpen={setOpenDeleteTag}
        tag={selectedTag}
      />

      <h2 className="text-3xl font-semibold">Visualizar Tags</h2>
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
            setOpenNewTag(true);
          }}
        >
          Cadastar Tag
        </button>
      </div>

      <table className="table-auto w-full mt-8">
        <thead>
          <tr>
            <th className="w-3/4">Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tags.length > 0 ? (
            tags.map((tag) => (
              <tr key={tag.id}>
                <td>{tag.name}</td>
                <td className="flex justify-center gap-4">
                  <button
                    className="text-red-500 hover:opacity-50 p-2"
                    onClick={() => {
                      setSelectedTag(tag);
                      setOpenDeleteTag(true);
                    }}
                  >
                    <BsTrashFill size={24} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center">
                Nenhuma tag encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
};

export default TagManager;
