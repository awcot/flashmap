import "./App.css";

import DrawTree from "./DrawTree";

export const DIMS = {
  height: 850,
  width: 1200,
  nodeHeight: 200,
  nodeWidth: 300,
};

function App() {
  return (
    <div className="app">
      <DrawTree />
    </div>
  );
}

export default App;
