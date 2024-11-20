import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const LoginForm = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const requestData = {
        email: data.email,
        password: data.password,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/auth/login`,
        requestData
      );

      if (response.status === 200) {
        const { tokens, user } = response.data.data;

        if (tokens) {
          const authToken = tokens.accessToken;
          const refreshToken = tokens.refreshToken;

          console.log(`Login time auth token: ${authToken}`);
          setAuth({ user, authToken, refreshToken });

          navigate("/");
        }
      }
    } catch (error) {
      console.error(error);
      setError("root.random", {
        type: "random",
        message: `User with email ${data.email} is not found`,
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="username" className="block mb-2">
          Enter your username or email address
        </label>
        <input
          type="text"
          id="username"
          {...register("email", { required: "Email is required" })}
          className={`w-full px-4 py-3 rounded-lg ${
            errors.email ? "border-red-500" : "border border-gray-300"
          } `}
          placeholder="Email address"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block mb-2">
          Enter your Password
        </label>
        <input
          type="password"
          id="password"
          {...register("password", { required: "password is required" })}
          className={`w-full px-4 py-3 rounded-lg ${
            errors.password ? "border-red-500" : "border border-gray-300"
          } `}
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>
      {/* <div className="mb-6 flex gap-2 items-center">
        <input
          type="checkbox"
          {...register("admin")}
          id="admin"
          className="px-4 py-3 rounded-lg border border-gray-300"
        />
        <label htmlFor="admin" className="block ">
          Login as Admin
        </label>
      </div> */}
      <p className="text-red-500">{errors?.root?.random?.message}</p>
      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-lg mb-4"
      >
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
