import { ReactNode, createContext, useState } from "react";
import axios from "axios";

type ContextType = {
  exampleValue: string;
  categories: Categories[];
  pokemons: Pokemon[];
  fetchCategories: () => void;
  fetchDataPokemon: () => void;
  saveCategory: (data: SaveCategory) => void;
  updateCategory: (data: UpdateCategory) => void;
  deleteCategory: (id: string) => void;
  fetchCategoryById: (data: GetCategoryById) => void;
} | null;

type ProviderProps = {
  children: ReactNode;
};

type Categories = {
  id: string;
  name: string;
  is_active: string;
};

type SaveCategory = {
  name: string;
  status: string;
};

type UpdateCategory = {
  id: string;
  name: string;
  status: string;
};

type GetCategoryById = {
  id: string;
  name?: string;
};

type Register = {
  name: string;
  email: string;
  password: string;
};

interface Pokemon {
  name: string;
}

export const AppContext = createContext<ContextType>(null);

export const Provider = ({ children }: ProviderProps) => {
  const exampleValue = "this is example from context";
  const [categories, setCategories] = useState<Categories[]>([]);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const token = window.localStorage.getItem("token");

  const fetchDataPokemon = async () => {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
    setPokemons(response.data.results);
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        "https://mock-api.arikmpt.com/api/category",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCategories(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const saveCategory = async (data: SaveCategory) => {
    const response = await axios.post(
      "https://mock-api.arikmpt.com/api/category/create",
      {
        name: data.name,
        is_active: data.status === "Active" ? true : false,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setCategories([...categories, response.data.data]);
  };
  const updateCategory = async (data: UpdateCategory) => {
    try {
      await axios.put(
        `https://mock-api.arikmpt.com/api/category/update`,
        {
          id: data.id,
          name: data.name,
          is_active: data.status === "Active" ? true : false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (id: string) => {
    await axios.delete(`https://mock-api.arikmpt.com/api/category/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchCategories();
  };

  const fetchCategoryById = async (data: GetCategoryById) => {
    await axios.get<Categories>(
      `https://6423f83a47401740432fbc9e.mockapi.io/admins/${data.id}`
    );
    fetchCategories();
  };

  return (
    <AppContext.Provider
      value={{
        exampleValue,
        categories,
        pokemons,
        fetchCategories,
        fetchDataPokemon,
        saveCategory,
        updateCategory,
        deleteCategory,
        fetchCategoryById,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
