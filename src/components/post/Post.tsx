import { handleOnChangeMultipleInputs } from "../../common/eventHandler";
import { FormEvent, useContext, useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Post = { name: string; contents: string; at: string | null };
export function Post() {
  const [post, setPost] = useState<Post>({
    name: "",
    contents: "",
    at: localStorage.getItem("at"),
  });
  const navigate = useNavigate();
  const mutation = useMutation(
    (post: Post) => {
      return axios.post("http://localhost:3000/board", post);
    },
    {
      onSuccess: (data) => console.log("post success!  >", data),
      onError: (error: Error) => {
        const reg = new RegExp("40*");
        if (reg.test(error.message)) {
          alert("로그인 세션이 만료되어 로그아웃됩니다.");
          navigate("/logout");
        }
      },
    }
  );

  const handleSetPost = (post: Post) => setPost(post);
  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      mutation.mutate(post);
    } catch (e) {
      alert("error");
    }
  };

  return (
    <div>
      <h1>POST</h1>
      <form onSubmit={handleOnSubmit}>
        <div>
          <label htmlFor="name">TITLE: </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            minLength={3}
            maxLength={99}
            size={20}
            onChange={(e) => {
              handleOnChangeMultipleInputs<Post>(e, handleSetPost, post);
            }}
          />
        </div>
        <div>
          <label htmlFor="name">contents: </label>
          <input
            type="text"
            id="contents"
            name="contents"
            required
            minLength={3}
            maxLength={9999999}
            size={60}
            onChange={(e) => {
              handleOnChangeMultipleInputs<Post>(e, handleSetPost, post);
            }}
          />
        </div>
        <div>
          <input type="submit" value="작성하기" />
        </div>
      </form>
    </div>
  );
}
