import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import routes from '../utils/routes.json';

import { Menu } from 'semantic-ui-react';

class Home extends Component {
  state = {};
  componentDidMount() {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <React.Fragment>
        <Menu>
          <Menu.Item header>DB Juxtapose</Menu.Item>
          <Menu.Item
            name="aboutUs"
            active={activeItem === 'aboutUs'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="jobs"
            active={activeItem === 'jobs'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="locations"
            active={activeItem === 'locations'}
            onClick={this.handleItemClick}
          />
        </Menu>
        <ul>
          <li>
            <Link to={routes.NEW_MIGRATION}>Start New Migration</Link>
          </li>

          <li>
            <Link to={routes.STRUCTURE}>Create New Structure</Link>
          </li>

          <li>
            <Link to={routes.NEW_MIGRATION}>Start New Migration</Link>
          </li>

          <li>
            <Link to={routes.MIGRATION_WIZARD}>Migration Wizard</Link>
          </li>

          <li>
            <Link to={routes.SETTINGS}>Settings</Link>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(Home);
