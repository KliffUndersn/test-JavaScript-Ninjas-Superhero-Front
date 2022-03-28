import { useEffect, useState } from "react";

export const useForm = (initialState, onSubmitForm) => {
  useEffect(() => {
    setData(initialState);
  }, []);
  const [data, setData] = useState(initialState);
  const handleChange = ({ target }) => {
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

