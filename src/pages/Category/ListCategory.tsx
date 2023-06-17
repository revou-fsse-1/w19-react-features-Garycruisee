import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./Provider";

export const ListCategory = () => {
  const context = useContext(AppContext);
  useEffect(() => {
    context?.fetchCategories();
  }, []);

  console.log(context?.categories);

  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/category/new");
  };
  const handleEdit = (id: string) => {
    navigate(`/category/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    context?.deleteCategory(id);
  };

  const [filterValue, setFilterValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value.toLowerCase());
  };

  const filteredCategories = context?.categories?.filter((category) =>
    filterValue === ""
      ? true
      : category.is_active
      ? filterValue === "active"
      : filterValue === "inactive"
  );

  return (
    <div className="flex flex-col px-6 py-5 items-center justify-center">
      <h4 className="text-3xl mb-3 font-bold">List of Category</h4>
      <div className="flex justify-center items-center py-2 ">
        <input
          className="py-1 px-12 border border-black rounded-xl text-center"
          type="text"
          placeholder="Search Here"
          onChange={handleInputChange}
        />
      </div>
      <button
        type="button"
        onClick={handleRedirect}
        className="text-white bg-blue-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Add New Category
      </button>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full mt-3 text-sm text-left text-gray-500">
          <thead className="text-xs text-center text-white uppercase bg-[#6b858c]">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories?.map((category) => (
              <tr key={category.id} className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {category.id}
                </th>
                <td className="px-6 py-4">{category.name}</td>
                <td className="px-6 py-4">
                  {category.is_active ? "Active" : "Inactive"}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEdit(category.id)}
                    className="text-white bg-blue-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="text-white bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
