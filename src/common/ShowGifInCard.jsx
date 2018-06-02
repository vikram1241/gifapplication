import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-flexbox-grid';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

export default class ShowGifInCard extends React.Component {

	static propTypes = {
    data: PropTypes.object.isRequired,
    keyName: PropTypes.string.isRequired,
    actionFunction: PropTypes.func.isRequired,
  }

	invokeParentFunction = (index) => {
		this.props.actionFunction(index);
	}

  shouldComponentUpdate(nextProps, nextState){

  	let update = true;
  	if(nextProps.id === this.props.data.id){
  		return update = false;
  	} else {
  		return update = true;
  	}
  }

	loadGifColln = () => {
		return(
			<Row center="xs">
  			<Col xs={8} style={{"marginTop": "10px", "padding": "5px"}}>
				  <Card>
				    <CardHeader
				      title={<h3>{this.props.data.title.replace(/(^|\s)\S/g, l => l.toUpperCase())}</h3>}
				      subtitle={`Type :- ${this.props.data.type}`}
				      actAsExpander={true}
				      showExpandableButton={true}
				    />
				    <CardMedia>
						<video width="320" height="240" controls>
						  <source src={this.props.data.images.fixed_height.mp4} type="video/mp4" />
						  Your browser does not support the video tag.
						</video>
				    </CardMedia>
				    <CardText expandable={true}>
				    { ` This GIF source is ${this.props.data.source} link to the URL ${this.props.data.url}. Video for playing MP4`}
				    </CardText>
				    <CardActions>
				      <FlatButton
                label={this.props.keyName}
                primary={true}
                onClick={this.invokeParentFunction.bind(null, this.props.data)}/>
				    </CardActions>
				  </Card>
  			</Col>
			</Row>
		)

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