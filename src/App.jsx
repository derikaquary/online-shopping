import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import CheckoutPage from "./pages/CheckoutPage";
import PageNotFound from "./pages/PageNotFound";
import { PropsProvider } from "./contexts/PropContext";

function App() {
  return (
    <PropsProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </PropsProvider>
  );
}

export default App;
