import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { initialState } from "../MainPage/initialState";
import { Typography } from "@mui/material";

const RedactorPage = () => {

  // isLoggedIn? render edit btn
  
  function srcset(image, width, height, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${width * cols}&h=${
        height * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }
  return (
    <>
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
        {initialState[0].images.map((item) => {
          const cols = item.featured ? 2 : 1;
          const rows = item.featured ? 2 : 1;

          return (
            <ImageListItem key={item} cols={cols} rows={rows}>
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
        Nickname: {initialState[0].nickname}
      </Typography>
      <Typography gutterBottom variant="h5" component="div">
        Real name: {initialState[0].real_name}
      </Typography>
      <Typography gutterBottom variant="h5" component="div">
        Description: {initialState[0].origin_description}
      </Typography>
      <Typography gutterBottom variant="h5" component="div">
        Superpowers: {initialState[0].superpowers}
      </Typography>
      <Typography gutterBottom variant="h5" component="div">
        Catch phrase: {initialState[0].catch_phrase}
      </Typography>
    </>
  );
};

export default RedactorPage;
