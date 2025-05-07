import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const WelcomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/quiz", { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <h1 className="text-4xl mb-6 text-center">Login or Register to Continue</h1>
      <div className="flex flex-col gap-5 w-full items-center">
        <Link
          className="border rounded-lg uppercase px-8 py-3 text-center"
          to="/login"
        >
          Login
        </Link>
        <Link
          className="border rounded-lg uppercase px-8 py-3 text-center"
          to="/register"
        >
          Register
        </Link>
      </div>
    </>
  );
};

export default WelcomePage;
