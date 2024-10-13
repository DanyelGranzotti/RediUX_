import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Content from "./pages/Content";
import ContentManager from "./pages/ContentManager";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import TagManager from "./pages/TagManager";

const Router = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/content" element={<Content />} />
      <Route
        path="/content-manager"
        element={
          <ProtectedRoute>
            <ContentManager />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tag-manager"
        element={
          <ProtectedRoute>
            <TagManager />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/error" element={<Error />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
