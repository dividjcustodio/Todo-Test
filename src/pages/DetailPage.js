import React from "react";
import { getDataDetailStart } from "../actions/list";
import "../App.css";
import { Container, Card  } from '@material-ui/core';
import useStyles from "../assets/styles";

export function DetailPage({ match }) {
  const classes = useStyles();
  const id = Number.isInteger(+match.params.id) ? match.params.id : 0;

  const [data, dataSet] = React.useState([]);
  React.useEffect(() => {
    getDataDetailStart(id, dataSet);
  }, []);

  return (
    <Container maxWidth="sm" className={classes.signInPage}>
      <Card className={`${classes.w100} ${classes.p50}`}>
        <h2>Title : { data.title }</h2>
        <p>UserId : {data.userId}</p>
        <p>ID : {data.id}</p>
        <p>State : {data.completed ? 
          <span className={classes.greenFont}>completed</span> : 
          <span className={classes.redFont}>no completed</span>
        }</p>
      </Card>
    </Container>
  );
}

export default DetailPage;
