import React, { Component } from 'react';
import { withStyles, Container, Card, CardMedia, Typography, Button } from '@material-ui/core';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  cardMedia: {
    height: 0,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing(2),
    paddingTop: '20%',
    width: '20%',
  },
});

class MyTokens extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Container maxWidth="sm">
          <CardMedia
            className={classes.cardMedia}
            image={require(`../images/Compound.png`)}
            title="Compound Token"
          />
          <Typography gutterBottom variant="h6">
            My <code>COMP</code> Tokens: {this.props.empTokens}
          </Typography>
          <Button size="medium" variant="outlined" color="primary"
            onClick={(event) => {
              this.props.initBalance();
            }}>
            Give me 100,000 COMP Tokens
          </Button>
        </Container>
      </div>
    )
  }
}

export default withStyles(styles)(MyTokens)