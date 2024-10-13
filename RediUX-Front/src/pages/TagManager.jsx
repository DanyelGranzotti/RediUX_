import { useState } from "react";
import SearchField from "../components/form/SearchField";
import NewTagModal from "../components/modals/tag/NewTagModal";

const TagManager = () => {
  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState("");
  const [openNewTag, setOpenNewTag] = useState(false);

  const validateSearch = () => {
    if (!search) {
      setSearchError("O campo de busca não pode estar vazio.");
      return false;
    }

    setSearchError("");
    return true;
  };

  const handleSearch = () => {
    if (!validateSearch()) return;

    console.log("Searching..." + search);
  };

  return (
    <main
      className="container flex flex-col justify-center items-center gap-8 md:px-32"
      style={{ minHeight: "calc(100vh - 7rem)" }}
    >
      <NewTagModal isModalOpen={openNewTag} setIsModalOpen={setOpenNewTag} />
      <h2 className="text-3xl font-semibold">Visualizar Tags</h2>
      <div className="flex flex-col md:flex-row justify-center items-center w-full gap-4 ">
        <SearchField
          value={search}
          onChange={setSearch}
          placeholder="Digite sua busca"
          error={searchError}
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
            <th className="w-1/2">Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tag 1</td>
            <td className="flex justify-center gap-4">
              <button className="blue_dark_btn_layout">Editar</button>
              <button className="red_dark_btn_layout">Excluir</button>
            </td>
          </tr>
          <tr>
            <td>Tag 2</td>
            <td className="flex justify-center gap-4">
              <button className="blue_dark_btn_layout">Editar</button>
              <button className="red_dark_btn_layout">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
};

export default TagManager;
