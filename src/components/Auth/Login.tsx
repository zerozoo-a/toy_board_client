import axios from "axios";
import { FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { handleOnChangeMultipleInputs } from "../../common/eventHandler";

type Login = {
  email: string;
  password: string;
};

export function Login() {
  const [login, setLogin] = useState<Login>({ email: "", password: "" });
  const navigate = useNavigate();

  const mutation = useMutation(
    (login: Login) => {
      return axios.post("http://localhost:3000/auth/login", login);
    },
    {
      onSuccess: ({ data }) => {
        localStorage.setItem("at", data.access_token);
        navigate("/");
      },
    }
  );

  const handleSetLogin = (login: Login) => {
    setLogin(login);
  };

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate(login);
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            minLength={4}
            maxLength={30}
            size={20}
            placeholder={`account@gmail.com`}
            onChange={(e) =>
              handleOnChangeMultipleInputs<Login>(e, handleSetLogin, login)
            }
          />
        </div>

        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            minLength={4}
            maxLength={50}
            size={20}
            onChange={(e) =>
              handleOnChangeMultipleInputs<Login>(e, handleSetLogin, login)
            }
          />
        </div>

        <input type="submit" value="로그인하기" disabled={mutation.isLoading} />
      </form>
      {mutation.isError ? "email 혹은 비밀번호가 잘못 되었습니다" : null}
    </div>
  );
}
