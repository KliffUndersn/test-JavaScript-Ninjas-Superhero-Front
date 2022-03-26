import { Input } from '@mui/material';
import { useDispatch } from "react-redux";
import superheroesOperations from "../../redux/superheroes/superheroes-operations";
import Button from '@mui/material/Button';
import styles from "./RedactorPage.module.css"

import { useForm } from "../../shared/hooks"

const  RedactorPage = () => {
  const dispatch = useDispatch(); 
const [data, handleChange, handleSubmit] = useForm({}, onSubmit);
function onSubmit() {
  console.log(data.images)
  let arr = new Set([data.images]) 
  let arr1 = Array.from(arr)
  console.log(arr1)
  dispatch(superheroesOperations.createHero(data));
}
  return (<>
  <form onSubmit={handleSubmit} className={styles.form}>
  <Input className={styles.input} name={"nickname"} placeholder={"Nickname"} value={data.nickname} onChange={handleChange}/>
  <Input className={styles.input} name={"real_name"}  placeholder={"Real name"}value={data.real_name} onChange={handleChange}/>
  <Input className={styles.input} name={"origin_description"}  placeholder={"Origin description"}value={data.origin_description} onChange={handleChange}/>
  <Input className={styles.input} name={"superpowers"}  placeholder={"Superpowers"}value={data.superpowers} onChange={handleChange}/>
  <Input className={styles.input} name={"catch_phrase"}  placeholder={"Catch phrase"}value={data.catch_phrase} onChange={handleChange}/>
  <Input className={styles.input} name={"images"} placeholder={"Images"} value={data.images} onChange={handleChange}/>
  <Button variant="contained" onClick={handleSubmit}>Be a Hero</Button>
  </form>
  {/* <ul>
  {data.images?.map(el => <li>
    <img src={el} alt={el} key={el} />
        </li>)}
  </ul> */}
  </>)
 
};

export default RedactorPage;
