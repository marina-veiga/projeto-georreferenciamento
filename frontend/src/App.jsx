// Importa o sistema de rotas do React Router para controlar a navegação
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importa as páginas que vamos exibir
import MapaPublico from "./pages/MapaPublico";
import Login from "./pages/Login";

function App() {
  return (
    // O BrowserRouter: gerencia as trocas de página sem atualizar o navegador
    <BrowserRouter>

      {/* definindo quais páginas aparecem para cada endereço (URL) */}
      <Routes>

        {/* Rota inicial: ao abrir o site*/}
        <Route path="/" element={<MapaPublico />} />

        {/* Rota de acesso: quando o usuário precisar fazer login */}
        <Route path="/login" element={<Login />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;