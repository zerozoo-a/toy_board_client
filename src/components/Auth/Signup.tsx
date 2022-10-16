import { FormEvent, useState } from "react";
import { handleOnChangeMultipleInputs } from "../../common/eventHandler";
import axios from "axios";
import { useMutation } from "react-query";

function Signup() {
  const mutation = useMutation((signup: Signup) => {
    return axios.post("http://localhost:3000/user", signup);
  });

  const [signup, setSignup] = useState<Signup>({
    name: "",
    email: "",
    password: "",
  });

  const handleSetSignup = (signup: Signup) => {
    setSignup(signup);
  };

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate(signup);
  };

  return (
    <div>
      <h2>Signup</h2>
      {mutation.isSuccess ? "성공적으로 생성 되었습니다" : null}
      <form onSubmit={handleOnSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="name"
            id="name"
            name="name"
            required
            minLength={4}
            maxLength={8}
            size={20}
            onChange={(e) =>
              handleOnChangeMultipleInputs<Signup>(e, handleSetSignup, signup)
            }
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            minLength={4}
            maxLength={50}
            size={20}
            placeholder={`account@gmail.com`}
            onChange={(e) =>
              handleOnChangeMultipleInputs<Signup>(e, handleSetSignup, signup)
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
              handleOnChangeMultipleInputs<Signup>(e, handleSetSignup, signup)
            }
          />
        </div>
        <div>
          <input type="submit" value="보내기" disabled={mutation.isLoading} />
        </div>
      </form>
    </div>
  );
}

type Signup = {
  name: string;
  email: string;
  password: string;
};

export { Signup };
