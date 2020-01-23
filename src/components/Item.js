import React from "react";
import "../App.css";
import { ListItem, ListItemText  } from '@material-ui/core';
import { Link } from "react-router-dom";
import useStyles from "../assets/styles";

function ItemComponent(item) {
  const classes = useStyles();
  return (
    <ListItem data-testid="item">
      <Link
        key={`ind-${item.id}`}
        to={`/detail/${item.id}`}
      >
        {item.title}
      </Link>
      {item.completed ? 
        <ListItemText className={`${classes.greenFont} ${classes.flexEnd}`} primary="completed" />:
        <ListItemText className={`${classes.redFont} ${classes.flexEnd}`} primary="no completed" />
      }
    </ListItem>
  );
}

export default ItemComponent;
