import { useState } from "react";
import Button from "../../components/button";
import Textfield from "../../components/textfield";
import { toastError, toastSuccess } from "../../components/toast";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { post } from "../../api/api";
import { Link } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await post("login", {
        username: username,
        password: password,
      });
      console.log(response)
      const access_token = response?.data.access_token;
      navigate("/");
      Cookies.set("access_token", access_token, { expires: 7 });
      toastSuccess("Login successfuly");
    } catch (error) {
      toastError((error as any).response.data.detail);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex h-screen w-full overflow-hidden bg-[url('./assets/background.jpg')] bg-cover bg-purple-primary bg-blend-luminosity items-center justify-center">
        <form
          onSubmit={(e) => handleLogin(e)}
          className="flex h-auto w-1/3 rounded-3xl flex-col items-center justify-center bg-background px-10 py-10 gap-4 "
        >
          <div className="flex flex-col items-center">
            <img src="/assets/logo.png" alt="" className="w-[200px]" />
          </div>
          <Textfield
            useLabel
            labelText="Username"
            labelStyle="font-semibold"
            type={"field"}
            required
            value={username}
            placeholder={"Your email"}
            onChange={(val) => setUsername(val.target.value)}
            />
          <Textfield
            useLabel
            labelText="Password"
            labelStyle="font-semibold"
            required
            value={password}
            type={"password"}
            placeholder={"Your password"}
            onChange={(val) => setPassword(val.target.value)}
          />
          <div>
            <Button
              type="submit"
              color="primary"
              isLoading={isLoading}
              text="Login"
            />
          </div>
          <p
              className="inline-block align-baseline font-bold text-sm text-gray-800"
            >
              Don't have an account? <Link to="/register" className="inline-block align-baseline font-bold text-sm text-gray-800 hover:text-purple-secondary transition-all duration-300">Register Now</Link>
            </p>
        </form>
      </div>
    </>
  );
}

export default Login;
