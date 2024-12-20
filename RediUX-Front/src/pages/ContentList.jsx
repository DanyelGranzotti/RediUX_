import { useEffect, useState } from "react";
import { BsArrowLeft, BsSearch } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { getContent } from "../api/entities/content";
import { getTag } from "../api/entities/tags";
import SearchField from "../components/form/SearchField";
import ViewContentModal from "../components/modals/content/ViewContentModal";

const ContentList = () => {
  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState("");
  const [tagOptions, setTagOptions] = useState([]);
  const [tag, setTag] = useState("");
  const [content, setContent] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchTags = async () => {
    const options = await getTag();
    if (Array.isArray(options)) {
      setTagOptions(options.map((tag) => ({ label: tag.name, value: tag.id })));
    }
  };

  const fetchContent = async (search, tag) => {
    const contentData = await getContent(search, tag);
    if (Array.isArray(contentData)) {
      setContent(contentData);
    }
  };

  useEffect(() => {
    fetchTags();
    const params = new URLSearchParams(location.search);
    const searchParam = params.get("search") || "";
    const tagParam = params.get("tag") || "";
    setSearch(searchParam);
    setTag(tagParam);
    fetchContent(searchParam, tagParam);
  }, [location.search]);

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

    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (tag) params.append("tag", tag);

    window.history.pushState({}, "", `/content-list?${params.toString()}`);
    fetchContent(search, tag);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleContentClick = (content) => {
    setSelectedContent(content);
    setIsModalOpen(true);
  };

  return (
    <main className="container flex flex-col justify-center items-center gap-8 md:px-32">
      <div className="flex flex-col md:flex-row justify-center items-center w-full gap-4 mt-8">
        <BsArrowLeft
          size={24}
          onClick={handleBack}
          className="cursor-pointer"
        />
        <SearchField
          value={search}
          onChange={setSearch}
          placeholder="Digite sua busca"
          error={searchError}
          onSearch={handleSearch}
          // width="md:w-3/4"
        />
        {/* <DropdownField
          options={tagOptions}
          value={tag}
          onChange={setTag}
          defaultOption="Tags"
          width="md:w-1/4"
        /> */}
      </div>
      <div className="w-full">
        <h2 className="text-2xl mb-4 text-gray-medium text-center lg:text-left flex items-center gap-4">
          <BsSearch size={24} />
          Aqui estão os resultados da sua busca: {search}{" "}
          {/* {tag && `com a tag ${tag}`} */}
        </h2>
        {content.length > 0 ? (
          content.map((item) => (
            <div
              key={item.id}
              className="mb-4 p-4 border rounded flex items-center justify-between"
            >
              <div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p>{item.description}</p>
                <span className="text-sm text-gray-500">{item.mediaType}</span>
              </div>
              <button
                onClick={() => handleContentClick(item)}
                className="dark_blue_dark_outline_btn_layout w-2/12"
              >
                Visualizar
              </button>
            </div>
          ))
        ) : (
          <p className="text-center">Nenhum conteúdo encontrado.</p>
        )}
      </div>
      {selectedContent && (
        <ViewContentModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          content={selectedContent}
        />
      )}
    </main>
  );
};

export default ContentList;
