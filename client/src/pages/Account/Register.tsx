import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router";

function Register() {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  }

  return (
    <section className="bg-[url('/accounts-page-bg.jpg')] bg-cover bg-no-repeat px-2 md:px-12 lg:px-24 h-screen flex items-center justify-center">
      <div className="border-2 border-white rounded-lg flex flex-col xl:flex-row items-center justify-center gap-4 h-[98%] md:h-[90%] lg:h-[85%] w-[98%] md:w-[95%] xl:w-[85%] bg-black/20 backdrop-blur-sm">
        <div className="px-5 py-20 md:py-20 lg:flex-1/3">
          <h1 className="text-4xl font-extrabold font-head text-white">
            Welcome to D'Joe Steakhouse
          </h1>
          <p className="text-lg text-gray-300">
            Your home of delicious steakhouse cuisine
          </p>
        </div>
        <div className="bg-white p-4 md:p-10 rounded-sm shadow-md h-full w-full lg:flex-2/3">
          <Link to="/" className="flex items-center gap-2 mb-5 text-gray-500 hover:text-gray-700 transition">
            <BiArrowBack />
            Back to Home
          </Link>
          <h2 className="text-xl font-semibold mb-5 capitalize">
            create an account
          </h2>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col md:flex-row md:gap-2">
              <input type="text" name="name" id="name" placeholder="Name" />
              <input type="text" name="surname" id="surname" placeholder="Surname" />
            </div>
            <input type="text" name="username" id="username" placeholder="Username" />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input type="tel" name="phone" id="phone" placeholder="Phone Number" />
            <div className="flex items-center">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-charcoal-800 rounded-md py-4 text-white font-bold transition hover:scale-102 cursor-pointer"
            >
              Register
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-4">
            Don't have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Register;