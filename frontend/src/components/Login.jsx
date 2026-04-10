import React from "react";
import AscendLogo from "./AscendLogo";

export default function Login({
  role,
  setRole,
  emailInput,
  setEmailInput,
  passwordInput,
  setPasswordInput,
  handleLogin,
  loginError,
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans text-slate-900">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-3xl shadow-xl overflow-hidden">
        {/* Left Side: Illustration */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 p-12 bg-white/40">
          <div className="flex items-center gap-3 mb-10">
            <div className="text-indigo-500">
              <AscendLogo className="w-10 h-10" />
            </div>
            <span className="text-3xl font-display font-extrabold tracking-tight">
              Ascend
            </span>
          </div>
          <img
            src="https://illustrations.popsy.co/amber/student-going-to-school.svg"
            alt="Student Illustration"
            className="w-4/5 mb-8"
          />
          <p className="text-indigo-600 text-center mt-2 font-medium italic">
            "We rise by lifting others." <br />
            <span className="text-sm not-italic font-bold text-slate-500">
              — Robert Ingersoll
            </span>
          </p>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white/80">
          {/* Role Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-slate-100 p-1 rounded-full flex shadow-inner border border-slate-200">
              <button
                onClick={() => setRole("STUDENT")}
                className={`px-8 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
                  role === "STUDENT"
                    ? "bg-indigo-500 text-white shadow-md"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Student
              </button>
              <button
                onClick={() => setRole("INSTRUCTOR")}
                className={`px-8 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
                  role === "INSTRUCTOR"
                    ? "bg-indigo-500 text-white shadow-md"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Instructor
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-5 py-4 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-slate-50 font-medium"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-5 py-4 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-slate-50 font-medium"
                required
              />
              <div className="text-right mt-3">
                <a
                  href="#"
                  className="text-sm font-bold text-indigo-500 hover:text-indigo-700 transition-colors"
                >
                  Forgot Password?
                </a>
              </div>
            </div>

            {loginError && (
              <div className="text-red-500 text-sm font-bold text-center bg-red-50 p-3 rounded-xl border border-red-200">
                {loginError}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 mt-4"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
