import { Input } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import superheroesOperations from "../../redux/superheroes/superheroes-operations";
import Button from '@mui/material/Button';
import styles from "./RedactorPage.module.css"
import { useForm } from "../../shared/hooks"
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

const  RedactorPage = () => {
const dispatch = useDispatch(); 
const { location } = useHistory()
const [imageInput, setimageInput] = useState([""]);
const innerData = useSelector(state => state.hero.oneHero)
const pathToCreate = location.pathname === "/create"
const initial = pathToCreate ? {} : {...innerData}
const [data, handleChange, handleSubmit] = useForm(initial, onSubmit);
const toggle = pathToCreate ? imageInput : initial?.images

function onSubmit() {
  const dataToSend = {...data, images: imageInput};
  pathToCreate ? dispatch(superheroesOperations.createHero(dataToSend)) : dispatch(superheroesOperations.editHero(dataToSend));
  setimageInput([])
}
const handleInputChange = (event, i) => {
  const { value } = event.target;
    const li = [...toggle];
    li[i] = value;
     setimageInput(li) 
}

const handleRemoveClick = i => {
  const li = [...toggle];
  li.splice(i, 1);
   setimageInput(li)
};

const handleAddClick = () => {
   setimageInput([...toggle, ""])
};

  return (<>
  <form onSubmit={handleSubmit} className={styles.form}>
  <Input className={styles.input} name={"nickname"} placeholder={"Nickname"} value={data.nickname} onChange={handleChange}/>
  <Input className={styles.input} name={"real_name"}  placeholder={"Real name"}value={data.real_name} onChange={handleChange}/>
  <Input className={styles.input} name={"origin_description"}  placeholder={"Origin description"}value={data.origin_description} onChange={handleChange}/>
  <Input className={styles.input} name={"superpowers"}  placeholder={"Superpowers"}value={data.superpowers} onChange={handleChange}/>
  <Input className={styles.input} name={"catch_phrase"}  placeholder={"Catch phrase"}value={data.catch_phrase} onChange={handleChange}/>
  {toggle? toggle.map((el, i) => { return(
  <div className={styles.input} key={"keyname"+[i]}>  
    <Input className={styles.input} name={"name"+[i]} placeholder={"Add new photo"} value={el} onChange={event => handleInputChange(event, i) } />
      <div>
        {toggle.length !== 1 && <Button variant="contained" onClick={() => handleRemoveClick(i)}>Remove</Button>}
        {toggle.length - 1 === i && <Button variant="contained" onClick={handleAddClick}>Add</Button>}
      </div>
  </div>)
      }): <></>
      }
 
  <Button variant="contained" onClick={handleSubmit}>{pathToCreate ? "Be a Hero" : "Edit Hero"}</Button>
  </form>
  </>)
 
};

export default RedactorPage;
