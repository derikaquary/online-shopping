import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, useReducer } from "react";
import MainPage from "./pages/MainPage";
import CheckoutPage from "./pages/CheckoutPage";
import PageNotFound from "./pages/PageNotFound";
import PropContext from "./components/PropContext";

const initialState = {
  products: [],
  deliveryOptions: [],
  cart: [],
  isLoading: false,
  satus: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "isLoading":
      return { ...state, isLoading: true };
    case "dataReceived":
      return {
        ...state,
        products: action.payload.products,
        deliveryOptions: action.payload.deliveryOptions,
      };
    case "failedToFetch":
      return { ...state, status: "error" };
    case "loadingOver":
      return { ...state, isLoading: false };
    case "addToCartAndQuantity":
      // eslint-disable-next-line no-case-declarations
      const { product, selectedNum } = action.payload;
      // eslint-disable-next-line no-case-declarations
      const newItem = {
        id: product.id,
        image: product.image,
        name: product.name,
        price: product.priceCents,
        quantity: selectedNum,
        deliveryCost: 0,
      };
      // eslint-disable-next-line no-case-declarations
      const existingItem = state.cart.find(
        (newItem) => newItem.id === product.id
      );
      return {
        ...state,
        cart: existingItem
          ? state.cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + selectedNum }
                : item
            )
          : [...state.cart, newItem],
      };
    case "updateCartItemQuantity":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.cartItemId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "deleteCartItem":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case "addDeliveryCost":
      // eslint-disable-next-line no-case-declarations
      const deliveryPrice = action.payload.delivOption;
      // eslint-disable-next-line no-case-declarations
      const cartItem = action.payload.cartItem;
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === cartItem.id
            ? { ...item, deliveryCost: deliveryPrice }
            : item
        ),
      };
    case "initializeCart":
      return {
        ...state,
        cart: action.payload,
      };
    default:
      throw new Error("action unknown");
  }
}

function App() {
  const [initialized, setInitialized] = useState(false);

  const [{ products, deliveryOptions, isLoading, status, cart }, dispatch] =
    useReducer(reducer, initialState);

  // how to make search bar functioning
  // 1) search Query being declared
  const [searchQuery, setSearchQuery] = useState("");

  // 2)
  // Derived state. These are the products that will actually be displayed
  const searchedProducts =
    searchQuery.length > 0
      ? products.filter((product) =>
          `${product.name}`.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : products;

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const totalPrices = cart.map((item) => item.price * item.quantity);

  const totalPrice = totalPrices.reduce((total, item) => total + item, 0);

  const totalDeliveryCost = cart.reduce(
    (total, item) => total + item.deliveryCost,
    0
  );

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      dispatch({ type: "initializeCart", payload: JSON.parse(cartData) });
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, initialized]);

  useEffect(function () {
    async function fetchData() {
      dispatch({ type: "isLoading" });
      try {
        const [productsRes, deliveryOptRes] = await Promise.all([
          fetch("http://localhost:8000/products"),
          fetch("http://localhost:8001/deliveryOptions"),
        ]);
        const [productsData, deliveryOptions] = await Promise.all([
          productsRes.json(),
          deliveryOptRes.json(),
        ]);
        dispatch({
          type: "dataReceived",
          payload: { products: productsData, deliveryOptions: deliveryOptions },
        });
      } catch (err) {
        dispatch({ type: "failedToFetch" });
      } finally {
        dispatch({ type: "loadingOver" });
      }
    }
    fetchData();
  }, []);

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return (
    <PropContext.Provider
      value={{
        isLoading: isLoading,
        status: status,
        searchQuery,
        setSearchQuery,
        // 3) put searchProducts in products 4) create SearchProducts component
        products: searchedProducts,
        dispatch: dispatch,
        totalQuantity: totalQuantity,
        cart: cart,
        deliveryOptions: deliveryOptions,
        totalPrice: totalPrice,
        totalDeliveryCost: totalDeliveryCost,
      }}>
      <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<MainPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </PropContext.Provider>
  );
}

export default App;
