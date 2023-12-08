import { useState } from "react";
import Button from "../../components/button";
import Textfield from "../../components/textfield";
import { toastError, toastSuccess } from "../../components/toast";
import { useNavigate } from "react-router";
import { post } from "../../api/api";

export const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [nama, setNama] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await post("register", {
        username: username,
        nama: nama,
        email: email,
        password: password,
        role: role
      });
      console.log(response)
      navigate("/login");
      toastSuccess("Register successfuly");
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
          onSubmit={(e) => handleRegister(e)}
          className="flex h-auto w-1/3 rounded-3xl flex-col items-center justify-center bg-background px-10 py-10 gap-4 "
        >
          <h1 className="font-bold text-[24px]">
            Register now and join us!
          </h1>
          <Textfield
            useLabel
            labelText="Username"
            labelStyle="font-semibold"
            type={"field"}
            required
            value={username}
            placeholder={"Your username"}
            onChange={(val) => setUsername(val.target.value)}
            />
          <Textfield
            useLabel
            labelText="Full Name"
            labelStyle="font-semibold"
            type={"field"}
            required
            value={nama}
            placeholder={"Your name"}
            onChange={(val) => setNama(val.target.value)}
            />
          <Textfield
            useLabel
            labelText="Email"
            labelStyle="font-semibold"
            type={"field"}
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
          <Textfield
            useLabel
            labelText="Role"
            labelStyle="font-semibold"
            required
            value={role}
            type={"field"}
            placeholder={"Your Role"}
            onChange={(val) => setRole(val.target.value)}
          />
          <div>
            <Button
              type="submit"
              color="primary"
              isLoading={isLoading}
              text="Register"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
