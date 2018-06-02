import React from 'react';

import { HTTPErrorNormalizer, ShowGifInCard } from '../common';

import { Grid, Row, Col } from 'react-flexbox-grid';
import request from 'superagent';
import LinearProgress from 'material-ui/LinearProgress';

export default class FavouriteGif extends React.Component {
	constructor(){
		super();

		this.state = {
			favourites: [],
			error: null,
      unauthorized: null,
      collnQueryInProgress: false
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
    };
	}

	componentDidMount(){
		this.getMyFavouriteList();
	}

	getMyFavouriteList = () => {
		this.setState({
			collnQueryInProgress: true
		})
		request
		 .get(`/api/v1/gyp/list`)
		 .end((err, res) => {
		 	  if(err){
          let {msg, unauthorized} = HTTPErrorNormalizer.normalizeError(err, res);
          return this.setState({unauthorized: unauthorized, error: msg});
		 	  } else {
		 	  	this.setState({
		 	  		favourites: res.body,
		 	  		collnQueryInProgress: false
		 	  	})
		 	  }
		 })
	}

	deletFromFavouriteList = (data) => {
    let selectedGif = data;

/*    request
     .post(`/api/v1/gyp/`)
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
     })*/
	}

	favouriteListNotFound = () => {
    return (
      <Grid fluid>
        <Row center="xs">
          <Col xs={12}>
            <Row middle="xs">
              <Col xs={12}>
                <div style={this.styles.placeHolder}>
                  <b>No Favourites</b>
                  <p>{" Add Your GIF to your account ....!"}</p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    )
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

		return (
      <Grid fluid>
        <Row start="xs">
          <Col xs={12} md={12} lg={11}>
            <Row center="xs">
              <Col xs={10}>
                {(this.state.favourites.length > 0) ? this.state.favourites.map((data, index) => { return (<div key={index}> <ShowGifInCard data={data} keyName={"Delete"} actionFunction={this.deletFromFavouriteList}/> </div>) }): this.favouriteListNotFound() }
              </Col>
            </Row>
          </Col>
        </Row>
			</Grid>
		)
	}
}