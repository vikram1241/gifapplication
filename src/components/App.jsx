import React from 'react';

import { Grid, Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import request from 'superagent';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gifColln : undefined
    };
  }

  componentDidMount() {
    request
     .get(`/api/v1/gyp/`)
     .end((err, res) => {
        if(err) {
          console.log(err);
        } else {
          console.log("recieved data");
          this.setState({
            gifColln : res.body
          })
        }
     })
  }

  loadGifColln = () => {
  	let cadetReport = this.state.gifColln.data.map((dataCol, index) => {
  		return(
  			<Row center="xs" key={index}>
	  			<Col xs={6} style={{"marginTop": "10px", "padding": "5px"}}>
					  <Card>
					    <CardMedia>
							<video width="320" height="240" controls>
							  <source src={dataCol.images.fixed_height.mp4} type="video/mp4" />
							  Your browser does not support the video tag.
							</video>
					    </CardMedia>
					    <CardActions>
					      <FlatButton label="Action1" />
					      <FlatButton label="Action2" />
					    </CardActions>
					  </Card>
	  			</Col>
  			</Row>
  		)
  	})

  	return cadetReport;
  }

  render() {
    return(
      <Grid fluid>
        <Row center="xs">
        <Col xs={8}>
          {(this.state.gifColln !== undefined) ? this.loadGifColln() : 'currently data not available' }
        </Col>
        </Row>
      </Grid>
    );
  }
}