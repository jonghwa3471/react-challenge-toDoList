import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { categoriesState, toDoState } from "../atoms";

export default function CreateCategory() {
  const setToDos = useSetRecoilState(toDoState);
  const setAtomCategory = useSetRecoilState(categoriesState);
  const [category, setCategory] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setCategory(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCategory("");
    setAtomCategory((prev) => {
      const newCategory = [...prev, category];
      localStorage.setItem("newCategory", JSON.stringify(newCategory));
      return newCategory;
    });
  };
  const onClick = () => {
    setAtomCategory(["TO_DO", "DOING", "DONE"]);
    setToDos([]);
    localStorage.clear();
  };
  return (
    <>
      <button onClick={onClick}>Reset</button>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={category}
          placeholder="Add category"
        />
        <button>Add</button>
      </form>
    </>
  );
}
