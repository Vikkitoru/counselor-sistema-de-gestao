import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { VisaoGeral } from "./pages/VisaoGeral";
import { Olimpiadas } from "./pages/Olimpiadas";
import { ProcessosSeletivos } from "./pages/ProcessosSeletivos";
import { Counseling } from "./pages/Counseling";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<VisaoGeral />} />
          <Route path="/olimpiadas" element={<Olimpiadas />} /> 
          <Route path="/processos" element={<ProcessosSeletivos />} />
          <Route path="/counseling" element={<Counseling />} />
          {/* Outras rotas virão aqui */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
export default App;