import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import './App.css';

function App() {
  // Use import.meta.env.BASE_URL to automatically pick up the base path configured in vite.config.js
  const basename = import.meta.env.BASE_URL;

  return (
    <BrowserRouter basename={basename}>
      {/* Global Application Header */}
      <header className="app-header">
        <div className="app-header__logo">
          <div className="app-header__logo-icon">S</div>
          ShopVault
        </div>

        <div className="app-header__search">
          <span className="app-header__search-icon">🔍</span>
          <input type="text" placeholder="Search products..." />
        </div>

        <div className="app-header__actions">
          <button style={{ fontSize: '20px' }} aria-label="User Account">👤</button>
          <button style={{ fontSize: '20px' }} aria-label="Shopping Cart">🛒</button>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<ProductListingPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
