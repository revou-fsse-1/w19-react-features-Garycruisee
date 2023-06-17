import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface FormProps {
  email: string;
  password: string;
}

export const Login = () => {
  const schema = yup
    .object({
      email: yup.string().email().required("Please input your e-mail"),
      password: yup.string().min(5).required("Please input your password"),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const onSubmit = async (data: FormProps) => {
    const response = await axios.post(
      "https://mock-api.arikmpt.com/api/user/login",
      {
        email: data.email,
        password: data.password,
      }
    );
    console.log(response);
    window.localStorage.setItem("token", response.data.data.token);
    navigate("/");
  };

  return (
    <div className="flex border border-black flex-col px-5 py-5 items-center justify-center w-full h-full bg-white">
      <div className="block my-20 justify-center items-center text-center max-w-sm rounded-lg bg-[#6b858c] px-24 py-24 dark:bg-neutral-700">
        <h2 className="text-3xl text-white font-bold mb-7">Login</h2>

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <div>
              <input
                value={field.value}
                onChange={field.onChange}
                type="email"
                id="helper-email"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="E-mail"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <div>
              <input
                value={field.value}
                onChange={field.onChange}
                type="password"
                id="helper-password"
                aria-describedby="helper-text-explanation"
                className="mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          )}
        />

        <button
          onClick={handleSubmit(onSubmit)}
          type="button"
          className="text-black text-lg mt-5 bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Login
        </button>
      </div>
      <p>
        Create an account? &nbsp;
        <a className="text-red-500" href="http://localhost:5173/register">
          {" "}
          Click Here!
        </a>
      </p>
    </div>
  );
};
