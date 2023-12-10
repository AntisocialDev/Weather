
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

function App() {

  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Layout></Layout>}></Route>
        <Route path="*" element={<p>Error 404</p>}></Route>
      </Routes>
    </Router>
     );
}

export default App;
