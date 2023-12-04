import { useState } from "react";
import Button from "../../components/button";
import Textfield from "../../components/textfield";
import { toastError, toastSuccess } from "../../components/toast";
// import { supabase } from "../../lib/api";
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     setIsLoading(true);
  //     const { data, error } = await supabase.auth.signInWithPassword({
  //       email,
  //       password,
  //     });
  //     setIsLoading(false);

  //     if (data.session) {
  //     //   Cookies.set("token_simentel", data.session.access_token);
  //       toastSuccess("Login successfully");
  //       navigate("/");
  //     }

  //     if (error) {
  //       toastError(error.message);
  //     } else if (!data && !error) {
  //       toastError("An email has been sent to you for verification!");
  //     }
  //   };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[url('./assets/background.jpg')] bg-cover bg-purple-primary bg-blend-luminosity items-center justify-center">
      <form
        // onSubmit={(e) => handleLogin(e)}
        className="flex h-auto w-1/3 rounded-3xl flex-col items-center justify-center bg-background px-10 py-10 gap-4 "
      >
        <div className="flex flex-col items-center">
          <img src="/assets/logo.png" alt="" className="w-[200px]" />
        </div>
        <Textfield
          useLabel
          labelText="Username"
          labelStyle="font-semibold"
          type={"email"}
          required
          value={email}
          placeholder={"Your email"}
          onChange={(val) => setEmail(val.target.value)}
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
      </form>
    </div>
  );
}

export default Login;
