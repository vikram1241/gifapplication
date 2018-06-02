import React from 'react';

import { HTTPErrorNormalizer, ShowGifInCard } from '../common';

import { Grid, Row, Col } from 'react-flexbox-grid';
import request from 'superagent';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import LinearProgress from 'material-ui/LinearProgress';
import Dialog from 'material-ui/Dialog';
import Search from 'material-ui/svg-icons/action/search';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gifColln : undefined,
      error: null,
      unauthorized: null,
      collnQueryInProgress: false,
      open: false,
      serachGifColln: undefined
    };

    this.styles = {
      placeHolder : {
        fontSize: "20px",
        margin: "10px auto auto 5px",
        padding: "100px",
        height: "100%",
        background: "#efefef",
        color: "#949494",
        borderRadius: "3px"
      },
      errorMsg: {
        color: 'red'
      }
    }
  }

  componentDidMount() {
    this.getGifvideos();
  }

  getGifvideos = () => {
    this.setState({
      collnQueryInProgress: true
    })

    let gifUrl = `/api/v1/gyp/`;

    request
      .get(gifUrl)
      .end((err, res) => {
        if(err) {
          let {msg, unauthorized} = HTTPErrorNormalizer.normalizeError(err, res);
          return this.setState({unauthorized: unauthorized, error: msg});
        } else {
          this.setState({
            gifColln : res.body.data,
            collnQueryInProgress: false
          })
        }
    })
  }

  addToFavouriteList = (index) => {
    let selectedGif = this.state.gifColln[index];

    request
     .post(`/api/v1/gyp/favourites`)
     .send({
       title: selectedGif.title,
       id: selectedGif.id,
       images: selectedGif.images,
       source: selectedGif.source,
       url: selectedGif.url,
       type: selectedGif.type,
       rating: selectedGif.rating
     })
     .end((err, res) => {
        if(err){
          let {msg, unauthorized} = HTTPErrorNormalizer.normalizeError(err, res);
          return this.setState({unauthorized: unauthorized, error: msg});
        } else {
          this.setState({
            open: true
          })
        }
     })
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  openDailog = () => {
    return(
      <Dialog
        title="GIF Notification"
        actions={[
          <FlatButton
            label="Close"
            primary={true}
            onClick={this.handleClose}
          />
        ]}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        {"GIF is succesfully added"}
      </Dialog>
    )
  }

  handleSearchQuery = (event) => {
    let searchQuery = event.target.value;

    let gifUrl = `/api/v1/gyp/?search=${searchQuery}`;
    request
      .get(gifUrl)
      .end((err, res) => {
        if(err) {
          let {msg, unauthorized} = HTTPErrorNormalizer.normalizeError(err, res);
          return this.setState({unauthorized: unauthorized, error: msg});
        } else {
          this.setState({
            serachGifColln : res.body.data,
            collnQueryInProgress: false
          })
        }
    })
  }

  render() {

    if(this.state.error) {
      return (
        <Grid fluid>
          <Row center="xs">
            <Col xs={12}>
              <Row middle="xs">
                <Col xs={12}>
                  <div style={this.styles.placeHolder}>
                    <b>Error</b>
                    <p style={this.styles.errorMsg}>{this.state.error}</p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      )
    }

    if(this.state.collnQueryInProgress) {
      return(
        <Grid fluid>
          <Row center="xs">
            <Col xs={12}>
              <div style={{padding: "200px"}}>
                <LinearProgress mode="indeterminate"/>
              </div>
            </Col>
          </Row>
        </Grid>
      )
    }

    return(
      <Grid fluid>
        { (this.state.open) ? this.openDailog() : ""}
        <Row start="xs">
          <Col xs={12} md={12} lg={11}>

            <Row center="xs" style={{"marginTop": "10px"}}>
              <Col style={{"marginTop": "10px"}}>
                <Search />
              </Col>
              <Col xs={6}>
                <TextField
                  hintText="search for trending gif ..!"
                  fullWidth={true}
                  onChange={this.handleSearchQuery}
                />
              </Col>
            </Row>

            <Row center="xs">
              <Col xs={10}>
                {(this.state.gifColln !== undefined || this.state.serachGifColln !== undefined) ? <ShowGifInCard data={(this.state.serachGifColln !== undefined) ? this.state.serachGifColln : this.state.gifColln} keyName={"add to favourite"} actionFunction={this.addToFavouriteList} />: 'currently data not available' }
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}