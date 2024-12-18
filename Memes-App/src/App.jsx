import MemesApp from "./MemesApp";
import { ProveedorAutenticacion } from "./context/ContextoAutenticacion";

const App = () => {
  return (
    <ProveedorAutenticacion>
      <MemesApp />
    </ProveedorAutenticacion>
  );
};

export default App;