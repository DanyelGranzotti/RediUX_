import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Content from "./pages/Content";
import ContentList from "./pages/ContentList";
import ContentManager from "./pages/ContentManager";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import TagManager from "./pages/TagManager";

const protectedRoute = (path, Component) => (
  <Route
    path={path}
    element={
      <ProtectedRoute>
        <Component />
      </ProtectedRoute>
    }
  />
);

const Router = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/content-list" element={<ContentList />} />
      <Route path="/content/:id" element={<Content />} />
      {protectedRoute("/content-manager", ContentManager)}
      {protectedRoute("/tag-manager", TagManager)}
      {protectedRoute("/register", Signup)}
      <Route path="/login" element={<Login />} />
      <Route path="/error" element={<Error />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
