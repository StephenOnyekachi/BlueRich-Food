
import { useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Temporary login.
    // We'll connect this to Django authentication later.
    if (
      formData.email === "admin@bluerich.com" &&
      formData.password === "admin123"
    ) {
      navigate("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center justify-center">
        <div className="w-full">

          {/* Logo */}
          <Link
            to="/"
            className="mb-8 flex items-center justify-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white font-bold text-slate-950">
              B
            </div>

            <div className="text-white">
              <p className="font-bold leading-none">
                BLUERICH
              </p>

              <span className="text-xs text-slate-400">
                BAKERY & RESTAURANT
              </span>
            </div>
          </Link>

          {/* Login card */}
          <div className="rounded-3xl bg-white p-7 shadow-2xl sm:p-9">

            <div className="mb-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                <LockKeyhole className="text-slate-900" size={24} />
              </div>

              <h1 className="mt-5 text-2xl font-bold text-slate-950">
                Admin Login
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Sign in to manage your restaurant menu.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@bluerich.com"
                  required
                  className="
                    w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition 
                    focus:border-blue-500 focus:ring-4 focus:ring-blue-50
                  "
                />
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="
                      w-full rounded-xl border border-slate-200 px-4 py-3 pr-12 outline-none 
                      transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Login */}
              <button
                type="submit"
                className="w-full rounded-xl bg-slate-950 px-5 py-3.5 font-semibold text-white transition hover:bg-slate-800"
              >
                Sign in
              </button>
            </form>

            <p className="mt-7 text-center text-xs text-slate-400">
              Authorized restaurant administrators only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

