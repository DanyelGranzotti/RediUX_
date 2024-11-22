import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getContentById } from "../api/entities/content";

const Content = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      const contentData = await getContentById(id);
      setContent(contentData);
    };
    fetchContent();
  }, [id]);

  if (!content) {
    return <p>Loading...</p>;
  }

  return (
    <main className="container flex flex-col justify-center items-center gap-8 md:px-32">
      <h1 className="text-3xl font-bold">{content.title}</h1>
      <p>{content.description}</p>
      <span className="text-sm text-gray-500">{content.mediaType}</span>
    </main>
  );
};

export default Content;
