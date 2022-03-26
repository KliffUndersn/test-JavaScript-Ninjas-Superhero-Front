import { useState } from "react";

export const useForm = (initialState, onSubmitForm) => {
  const [data, setData] = useState(initialState);

  const handleChange = ({ target }) => {
    console.log(target.name)
    const { type, name, value, checked } = target;
    const newValue = type === "checkbox" ? checked : value;

    setData((prevState) => ({ ...prevState, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitForm(data);
    setData(initialState);
  };

  return [data, handleChange, handleSubmit];
};

