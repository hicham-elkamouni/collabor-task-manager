import { AppRoutes } from "@routes/routes";
import "./main.css";

function App() {
  return (
    <div className="base-layout">
      <div className="content-layout">
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
