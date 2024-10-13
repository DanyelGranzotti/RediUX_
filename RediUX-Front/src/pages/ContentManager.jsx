import { useState } from "react";
import SearchField from "../components/form/SearchField";
import NewContentModal from "../components/modals/content/NewContentModal";

const ContentManager = () => {
  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState("");
  const [openNewContent, setOpenNewContent] = useState(false);

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
      <NewContentModal
        isModalOpen={openNewContent}
        setIsModalOpen={setOpenNewContent}
      />
      <h2 className="text-3xl font-semibold">Visualizar Conteúdos</h2>
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
            setOpenNewContent(true);
          }}
        >
          Cadastar Conteúdo
        </button>
      </div>
    </main>
  );
};

export default ContentManager;
