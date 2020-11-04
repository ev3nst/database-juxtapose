import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link, Switch, Route, HashRouter as Router } from 'react-router-dom';
import { initApp } from './redux/actions';
import { RootState } from './redux/store';
import routes from './utils/routes.json';
import {
  Intro,
  Home,
  NewMigration,
  Structure,
  MigrationWizard,
  Settings,
} from './containers';
import { Menu, Dropdown, Icon } from 'semantic-ui-react';

//#region Redux Configuration
const mapStateToProps = ({ intro }: RootState) => {
  const { loaded } = intro;
  return { loaded };
};

const mapActionsToProps = {
  initApp,
};

const connector = connect(mapStateToProps, mapActionsToProps);
type IRouteProps = ConnectedProps<typeof connector>;
//#endregion

// Component
class Routes extends Component<IRouteProps> {
  state = {};
  componentDidMount() {
    if (this.props.loaded === false) {
      this.props.initApp();
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  render() {
    const { activeItem } = this.state;

    if (this.props.loaded === true) {
      return (
        <React.Fragment>
          <Router>
            <Menu>
              <Menu.Item
                active={activeItem === 'contentStructures'}
                onClick={this.handleItemClick}
              >
                <Icon name="list alternate outline" />
                <span>Content Structures</span>
              </Menu.Item>
              <Menu.Item
                name="databaseMigrations"
                active={activeItem === 'migrations'}
                onClick={this.handleItemClick}
              >
                <Icon name="object ungroup outline" />
                <span>Database Migrations</span>
              </Menu.Item>
              <Dropdown item icon="add">
                <Dropdown.Menu>
                  <Dropdown.Header>CREATE NEW</Dropdown.Header>
                  <Dropdown.Item>
                    <Icon name="file alternate outline" />
                    <span>Content Structure</span>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Icon name="file code outline" />
                    <span>Database Migration</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Menu.Item
                name="migrationWizard"
                active={activeItem === 'migrationWizard'}
                onClick={this.handleItemClick}
              >
                <Icon name="wizard" />
                <span>Migration Wizard</span>
              </Menu.Item>

              <Menu.Item
                name="settings"
                active={activeItem === 'settings'}
                onClick={this.handleItemClick}
              >
                <Icon name="settings" />
                <span>Settings</span>
              </Menu.Item>
            </Menu>
            <Switch>
              <Route path={routes.INTRO} exact component={Home} />
              <Route path={routes.NEW_MIGRATION} component={NewMigration} />
              <Route path={routes.STRUCTURE} component={Structure} />
              <Route
                path={routes.MIGRATION_WIZARD}
                component={MigrationWizard}
              />
              <Route path={routes.SETTINGS} component={Settings} />
              <Route path="*" component={Home} />
            </Switch>
          </Router>
        </React.Fragment>
      );
    }

    return <Intro />;
  }
}

export default connector(Routes);
