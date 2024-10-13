import { useEffect, useState } from "react";
import { BsFileTextFill, BsFillMicFill, BsPlayBtnFill } from "react-icons/bs";
import { IoBookmarks } from "react-icons/io5";
import { getTag } from "../api/entities/tags";
import DropdownField from "../components/form/DropdownField";
import SearchField from "../components/form/SearchField";

const Home = () => {
  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState("");
  const [tagOptions, setTagOptions] = useState([]);
  const [tag, setTag] = useState("");

  const fetchTags = async () => {
    const options = await getTag();
    setTagOptions(options.map((tag) => ({ label: tag.name, value: tag.id })));
  };

  useEffect(() => {
    fetchTags();
  }, []);

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
      <img
        src="/img/hero_image.png"
        alt="RediUX Logo"
        className="w-1/2 md:w-2/6 mb-16"
      />
      <div className="flex flex-col md:flex-row justify-center items-center w-full gap-4 ">
        <SearchField
          value={search}
          onChange={setSearch}
          placeholder="Digite sua busca"
          error={searchError}
          onSearch={handleSearch}
          width="md:w-3/4"
        />

        <DropdownField
          options={tagOptions}
          value={tag}
          onChange={setTag}
          defaultOption="Tags"
          width="md:w-1/4"
        />
      </div>
      <hr className="w-full border-1 border-gray my-8 hidden md:block" />
      <div className="w-full">
        <h2 className="text-2xl mb-4 text-gray-medium text-center lg:text-left">
          Navegue por tipo de mídia
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <button className="bg-blue-light hover:bg-blue text-blue-dark font-semibold py-2 px-6 rounded flex items-center gap-2 justify-center min-w-40 md:w-1/4">
            <IoBookmarks />
            Livro
          </button>
          <button className="bg-blue-light hover:bg-blue text-blue-dark font-semibold py-2 px-6 rounded flex items-center gap-2 justify-center min-w-40 md:w-1/4">
            <BsFileTextFill />
            Artigo
          </button>
          <button className="bg-blue-light hover:bg-blue text-blue-dark font-semibold py-2 px-6 rounded flex items-center gap-2 justify-center min-w-40 md:w-1/4">
            <BsFillMicFill />
            Podcast
          </button>
          <button className="bg-blue-light hover:bg-blue text-blue-dark font-semibold py-2 px-6 rounded flex items-center gap-2 justify-center min-w-40 md:w-1/4">
            <BsPlayBtnFill />
            Vídeo
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
