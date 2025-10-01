// import del provider dei prodotti 
import GlobalProductsProvider from "./context/GlobalProducts"
import DefaultLayout from "./layout/DefaultLayout"
import { Navigate, Route, Routes } from "react-router-dom"
import ScrollToTop from "./components/ScrollToTop"

// import delle pagine
import HomePage from "./pages/HomePage"
import NotFoundPage from "./pages/NotFoundPage"
import AddProduct from "./pages/AddProduct"
import ProductDetail from "./pages/ProductDetail"
import EditProduct from "./pages/EditProduct"

function App() {

  return (
    <>
      <GlobalProductsProvider>
        <ScrollToTop />
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Navigate to='/home' />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/product/:slugAndId" element={<ProductDetail />} />
            <Route path="/product/edit/:id" element={<EditProduct />} />
            {/* <Route path="/oreficeria" element={<OreficeriaPage />} />
            <Route path="/contatti" element={<ContattiPage />} />
            <Route path="/shop-online" element={<ShopOnlinePage />} />
            <Route path="/shop-online/:category" element={<CategoryPage />} />
            <Route path="/carrello" element={<CarthPage />} />
            <Route path="/preferiti" element={<FavPage />} />
   
            <Route path="/priacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/condizioni-di-vendita" element={<ConditionsPage />} />
            <Route path="/product/:slugAndId" element={<ProductDetail />} /> */}

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </GlobalProductsProvider>
    </>
  )
}

export default App
