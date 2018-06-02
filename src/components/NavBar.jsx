import React from 'react';
import { Link, hashHistory } from 'react-router';

import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import { Card, CardHeader, CardMedia, CardTitle } from 'material-ui/Card';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';

import ActionDashboard from 'material-ui/svg-icons/action/dashboard';
import ActionTrackAssignment from 'material-ui/svg-icons/action/view-list';

export default class NavBar extends React.Component {
	constructor(){
		super();

		this.state = {
			drawerOpen: false,
			grants: ["home", "favourites"]
		}

		this.grantsToNavMap = {
			home: {
        name: 'Home',
        linkTo: '/',
        icon: () => <ActionDashboard />
			},
			favourites: {
				name: 'Favourites',
				linkTo: '/favourites',
				icon: () => <ActionTrackAssignment />
			}
		}
	}

	getMyAvatar = () => {
		return
	}

	render(){
		return (
			<div>
        <AppBar
          title={<span style={{ cursor: 'pointer' }} onClick={() => { hashHistory.push('/'); }}>GIF</span>}
          onLeftIconButtonClick={() => { this.setState({ drawerOpen: true }); }}
          iconElementRight={this.getMyAvatar()}
        />
        {this.state.drawerOpen}
        <Drawer
          open={this.state.drawerOpen}
          docked={false}
          onRequestChange={() => { this.setState({ drawerOpen: false }); }}
        >
          <AppBar
            style={{ backgroundColor: '#eeeeee' }}
            showMenuIconButton={false}
            titleStyle={{ lineHeight: 'normal' }}
            title={
              <div style={{ marginTop:'15px', color: '#000000de' }}>
                <div >{`GIF`}</div>
                <div style={{ fontSize: 'x-small', fontWeight: 200}}>{`v1.0.0`}</div>
              </div>
            }
          />
            {
              this.state.grants.map((grant, index) => (
                <Link key={index} to={this.grantsToNavMap[grant].linkTo} style={{ textDecoration: 'none' }} onClick={this.handleDrawerClose}>
                  <MenuItem onClick={() => { this.setState({ drawerOpen: false }); }} leftIcon={this.grantsToNavMap[grant].icon()}>
                    {this.grantsToNavMap[grant].name}
                  </MenuItem>
                </Link>
                ))
            }
        </Drawer>
			</div>
		)
	}
}