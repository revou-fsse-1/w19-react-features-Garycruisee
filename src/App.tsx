import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./components/DefaultLayout";
import { Home } from "./pages/Auth/Home";
import { ListCategory } from "./pages/Category/ListCategory";
import { EditCategory } from "./pages/Category/EditCategory";
import { NewCategory } from "./pages/Category/NewCategory";
import { Provider } from "./pages/Category/Provider";
import { Register } from "./pages/Auth/Register";
import { Login } from "./pages/Auth/Login";
import { PrivateLayout } from "./components/PrivateLayout";

function App() {
  return (
    <>
      <Provider>
        <Routes>
          <Route element={<PrivateLayout />}>
            <Route path="/" index element={<Home />} />
            <Route path="/category" element={<ListCategory />} />
            <Route path="/category/new" element={<NewCategory />} />
            <Route path="/category/edit/:id" element={<EditCategory />} />
          </Route>
          <Route element={<DefaultLayout />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route
            path="*"
            index
            element={<h1 className="text-6xl font-bold">404 ERROR</h1>}
          />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
