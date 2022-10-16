import axios from "axios";
import { FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { handleOnChangeMultipleInputs } from "../../common/eventHandler";
import { useNavigate } from "react-router-dom";

export function Auth() {
  const [user, setUser] = useState<User>({ email: "", password: "" });
  const navigate = useNavigate();

  const mutation = useMutation((auth: User) => {
    return axios.post("http://localhost:3000/user/auth", auth);
  });

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      mutation.mutate(user);
      navigate("/");
    } catch (e) {
      alert("에러발생");
    }
  };
  const handleSetUser = (user: User) => {
    setUser(user);
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          minLength={4}
          maxLength={30}
          size={20}
          onChange={(e) =>
            handleOnChangeMultipleInputs<User>(e, handleSetUser, user)
          }
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          minLength={4}
          maxLength={30}
          size={30}
          onChange={(e) =>
            handleOnChangeMultipleInputs<User>(e, handleSetUser, user)
          }
        />
        <input type="submit" value="보내기" disabled={mutation.isLoading} />
        {mutation.isSuccess && "signin에 성공하였습니다."}
      </form>
    </div>
  );
}

type User = {
  // name:string,
  email: string;
  password: string;
};
