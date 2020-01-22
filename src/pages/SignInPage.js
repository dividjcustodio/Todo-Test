import React from "react";
import { connect } from "react-redux";
import { Button, Container, Card, TextField  } from '@material-ui/core';
import { signInAction } from "../actions/user";
import useStyles from "../assets/styles";

function SignInPage({ signInAction, history }) {
  const classes = useStyles();
  const [data, dataSet] = React.useState({
    name: "",
    password: ""
  });
  const handleChangeValue = event => {
    const { name, value } = event.target;

    dataSet(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const onSubmit = () => {
    if (data.name) {
      signInAction(data, history);
    }
  };
  return (
    <Container maxWidth="sm" className={classes.signInPage}>
      <Card className={classes.w100}>
        <h3 className={classes.textAlignCenter}>Sign In</h3>
        <div className={ `${classes.w100} ${classes.displayCenter} ${classes.mb50}`}>
          <TextField
            required 
            onChange={handleChangeValue}
            value={data.name}
            name="name"
            type="text"
            id="filled-basic"
            label="UserName"
          />
        </div>
        <div  className={ `${classes.w100} ${classes.displayCenter} ${classes.mb50}`}>
          <Button variant="contained" color="primary" onClick={onSubmit}>submit</Button>
        </div>
      </Card>
    </Container>
  );
}
export default connect(null, { signInAction })(SignInPage);
