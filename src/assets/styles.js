import { makeStyles } from "@material-ui/styles";

const displayCenter = {
  justifyContent: "center",
  alignItems: "center",
  display: "flex"
}

export default makeStyles(theme => ({
  signInPage: {
    ...displayCenter,
    width: "100%",
    height: "100vh",
  },
  displayCenter: displayCenter,

  w100: {
    width: "100%"
  },

  mb50: {
    marginBottom: "50px"
  },

  p50: {
    padding: "50px"
  },

  textAlignCenter: {
    textAlign: "center"
  },
  redFont: {
    color: "red"
  },
  greenFont: {
    color: "green"
  }
}));
