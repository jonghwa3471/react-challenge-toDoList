import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoriesState, IToDo, toDoState } from "../atoms";
import React from "react";

function ToDo({ text, category, id }: IToDo) {
  const categories = useRecoilValue(categoriesState);
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const deleteToDo = () => {
    setToDos((oldToDos) => oldToDos.filter((toDo) => toDo.id !== id));
  };
  return (
    <li>
      <span>{text} &nbsp;</span>
      {categories.map(
        (i, index) =>
          i !== category && (
            <button key={index} name={i} onClick={onClick}>
              {i}
            </button>
          )
      )}
      <button onClick={deleteToDo}>❌</button>
    </li>
  );
}

export default ToDo;
