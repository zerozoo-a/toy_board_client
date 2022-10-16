import { handleOnChangeMultipleInputs } from "../../common/eventHandler";
import { FormEvent, useContext, useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Post = { name: string; description: string };
export function Post() {
  const [post, setPost] = useState<Post>({
    name: "",
    description: "",
  });
  const navigate = useNavigate();
  const mutation = useMutation((post: Post) => {
    return axios.post("http://localhost:3000/board", post);
  });

  const handleSetPost = (post: Post) => setPost(post);
  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      mutation.mutate(post);
      navigate("boards");
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
          <label htmlFor="name">DESCRIPTION: </label>
          <input
            type="text"
            id="description"
            name="description"
            required
            minLength={3}
            maxLength={9999999}
            size={60}
            onChange={(e) => {
              handleOnChangeMultipleInputs<Post>(e, handleSetPost, post);
            }}
          />
        </div>
      </form>
    </div>
  );
}
