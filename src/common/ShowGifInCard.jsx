import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-flexbox-grid';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

export default class ShowGifInCard extends React.Component {

	static propTypes = {
    data: PropTypes.array.isRequired,
    keyName: PropTypes.string.isRequired,
    actionFunction: PropTypes.func.isRequired,
  }

	invokeParentFunction = (index) => {
		this.props.actionFunction(index);
	}

	loadGifColln = () => {
  	let cadetReport = this.props.data.map((dataCol, index) => {
  		return(
  			<Row center="xs" key={index}>
	  			<Col xs={8} style={{"marginTop": "10px", "padding": "5px"}}>
					  <Card>
					    <CardMedia>
							<video width="320" height="240" controls>
							  <source src={dataCol.images.fixed_height.mp4} type="video/mp4" />
							  Your browser does not support the video tag.
							</video>
					    </CardMedia>
					    <CardActions>
					      <FlatButton
                  label={this.props.keyName}
                  primary={true}
                  onClick={this.invokeParentFunction.bind(null, index)}/>
					    </CardActions>
					  </Card>
	  			</Col>
  			</Row>
  		)
  	})

  	return cadetReport;
  }

	render(){
		return (
			<div>
			  {this.loadGifColln()}
			</div>
		)
	}
}