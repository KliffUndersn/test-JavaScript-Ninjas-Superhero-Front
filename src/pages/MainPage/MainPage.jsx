import * as React from "react";
import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Styles from "./MainPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import superheroesOperations from "../../redux/superheroes/superheroes-operations";


export default function MainPage() {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);
  useEffect(() => {
    dispatch(superheroesOperations.loadPage({ page }))
  }, [page]);
  const init = useSelector(state => state.hero.hero)
  
  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <div className={Styles.container}>
      <div className={Styles.cardList}>
        {init?.map((el) => {
          return (
            <Card sx={{ maxWidth: 1 / 5, m: 1 } } key={el._id} >
              <CardActionArea
              href={`/${el._id}`}
              >
                
                <CardMedia
                  component="img"
                  height="440"
                  image={el.images[Math.floor(Math.random() * el.images.length)]}
                  alt={el.nickname}
                  
                />
                <CardContent>
                  <Typography gutterBottom variant="h4" component="div">
                    {el.nickname}
                  </Typography>
                </CardContent>
                
              </CardActionArea>
            </Card>
          );
        })}
      </div>
      <Stack spacing={2}>
        <Pagination count={10} shape="rounded" onChange={handleChange}/>
      </Stack>
    </div>
  );
}
