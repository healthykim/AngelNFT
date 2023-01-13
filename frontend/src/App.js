import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from "./routes/main_page";
import Layout from "./components/layout";
import DonatePage from './routes/donate_page';
import MintCompletePage from './routes/mint_complete_page';
import MyPage from './routes/my_page';


function App() {
  return (
    <BrowserRouter>
    <Layout>
    <Routes>
      <Route path="/" element={<MainPage/>} />
      <Route path="/donate" element={<DonatePage/>} />
      <Route path="/show_NFT" element={<MintCompletePage/>} />
      <Route path="/my_page" element={<MyPage/>} />
    </Routes>
    </Layout>
    </BrowserRouter>
  );
}

export default App;
