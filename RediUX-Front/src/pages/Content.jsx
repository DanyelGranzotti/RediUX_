import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getContentById } from "../api/entities/content";

const Content = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const fetchContent = async () => {
    const contentData = await getContentById(id);
    setContent(contentData[0]);
  };

  useEffect(() => {
    fetchContent();
  }, [id]);

  if (!content) {
    return <p>Loading...</p>;
  }

  if (content !== null) {
    return (
      <main className="container flex flex-col justify-center items-center gap-8 md:px-32">
        <h1 className="text-3xl font-bold">{content.title}</h1>
        <p>{content.description}</p>
        <span className="text-sm text-gray-500">{content.media_type}</span>
      </main>
    );
  }
};

export default Content;
