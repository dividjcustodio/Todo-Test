import React from "react";
import "../App.css";
import { ListItem, ListItemText  } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useStyles from "../assets/styles";

function ItemComponent(item) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <ListItem button onClick={ () => history.push(`/detail/${item.id}`)}>
      <ListItemText primary={item.title} />
      {item.completed ? 
        <ListItemText className={classes.greenFont} primary="completed" />:
        <ListItemText className={classes.redFont} primary="no completed" />
      }
    </ListItem>
  );
}

export default ItemComponent;
