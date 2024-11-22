import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="container flex flex-col justify-center items-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Página Não Encontrada</h1>
      <p className="mb-8">
        Desculpe, a página que você está procurando não existe.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-500 rounded border border-blue-700 hover:opacity-50"
      >
        Ir para a Home
      </Link>
    </main>
  );
};

export default NotFound;
