import { useForm } from "react-hook-form";
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
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
      <div className="mb-6 flex gap-2 items-center">
        <input
          type="checkbox"
          {...register("admin")}
          id="admin"
          className="px-4 py-3 rounded-lg border border-gray-300"
        />
        <label htmlFor="admin" className="block ">
          Login as Admin
        </label>
      </div>
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
