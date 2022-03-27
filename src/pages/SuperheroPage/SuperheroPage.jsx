import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { initialState } from "../MainPage/initialState";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import superheroesOperations from "../../redux/superheroes/superheroes-operations";
import { useHistory } from "react-router-dom";

const SuperheroPage = () => {
  const dispatch = useDispatch();
  const init = useSelector(state => state.hero.oneHero)
  const { location } = useHistory()
  const _id = location.pathname.substring(1)
  React.useEffect(() => {
    dispatch(superheroesOperations.getHero({ _id }))
  }, []);
  function srcset(image, width, height, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${width * cols}&h=${
        height * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }
  return (<> {init? <>
      <ImageList
        sx={{
          width: 1,
          height: 600,
          // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
          transform: "translateZ(0)",
        }}
        rowHeight={200}
        gap={1}
      >
        {init?.images.map((item) => {
          const cols = item.featured ? 2 : 1;
          const rows = item.featured ? 2 : 1;

          return (
            <ImageListItem key={init._id} cols={cols} rows={rows}>
              <img
                {...srcset(item, 250, 200, rows, cols)}
                alt={"superhero"}
                loading="lazy"
              />
              <ImageListItemBar
                sx={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                    "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                }}
                position="top"
                actionPosition="left"
              />
            </ImageListItem>
          );
        })}
      </ImageList>
      <Typography gutterBottom variant="h4" component="div">
        Nickname: {init.nickname}
      </Typography>
      <Typography gutterBottom variant="h5" component="div">
        Real name: {init.real_name}
      </Typography>
      <Typography gutterBottom variant="h5" component="div">
        Description: {init.origin_description}
      </Typography>
      <Typography gutterBottom variant="h5" component="div">
        Superpowers: {init.superpowers}
      </Typography>
      <Typography gutterBottom variant="h5" component="div">
        Catch phrase: {init.catch_phrase}
      </Typography> </> : <p>Cant find</p>}
    </>
  );
};

export default SuperheroPage;
