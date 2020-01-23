import React from "react";
import { connect } from "react-redux";
import { List, Container  } from '@material-ui/core';
import { getDataStart } from "../actions/list";

import useStyles from "../assets/styles";
import Item from "../components/Item";

export function ListPage({ data, getData }) {
  const classes = useStyles();

  React.useEffect(() => {
    getData();
  }, []);
  return (
  <Container maxWidth="sm">
    <h2 className={`${classes.displayCenter} ${classes.w100}`}>List</h2>
    <List>
      {data.map(item => (
        <Item {...item} key={item.id}/>
      ))}
    </List>
  </Container>
  );
}
const mapStateToProps = store => ({
  data: store.list.data
});
const dispatchToProps = dispatch => {
  return {
    getData: () => dispatch(getDataStart())
  };
};

export default connect(mapStateToProps, dispatchToProps)(ListPage);
