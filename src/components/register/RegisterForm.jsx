import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm();
  const password = watch("password");
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const requestData = {
        full_name: data.full_name,
        email: data.email,
        password: data.password,
      };

      // Add the role conditionally
      if (data.admin) {
        requestData.role = "admin";
      }

      console.log(requestData);

      let response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/auth/register`,
        requestData
      );

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      setError("root.random", {
        type: "random",
        message: `Something went wrong: ${error.message}`,
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            Full Name
          </label>
          <input
            {...register("full_name", { required: "Full name is required" })}
            type="text"
            id="name"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.full_name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="John Doe"
          />
          {errors.full_name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.full_name.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            id="email"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Email address"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>
      <div className="flex  gap-4">
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2">
            Enter your Password
          </label>
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            id="password"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2">
            Confirm Password
          </label>
          <input
            {...register("confirm_password", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            type="password"
            id="confirm_password"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.confirm_password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Confirm Password"
          />
          {errors.confirm_password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirm_password.message}
            </p>
          )}
        </div>
      </div>
      <div className="mb-6 flex gap-2 items-center">
        <input
          type="checkbox"
          {...register("admin")}
          id="admin"
          className="px-4 py-3 rounded-lg border border-gray-300"
        />
        <label htmlFor="admin" className="block ">
          Register as Admin
        </label>
      </div>
      <p className="text-red-500">{errors?.root?.random?.message}</p>
      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-lg mb-2"
      >
        Create Account
      </button>
    </form>
  );
};

export default RegisterForm;
