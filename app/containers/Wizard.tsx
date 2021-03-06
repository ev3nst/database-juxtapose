import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Grid, Header } from 'semantic-ui-react';
import { DARK_MODE } from '../utils/constants';

class Wizard extends Component<RouteComponentProps> {
  componentDidMount() {}

  render() {
    return (
      <Grid inverted={DARK_MODE} padded className="maximize-height-with-nav">
        <Grid.Row color={DARK_MODE === true ? 'black' : undefined}>
          <Grid.Column>
            <Header inverted={DARK_MODE} as="h1" content="This is Integration Wizard" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = () => {
  // const { test } = integration;
  return {};
};

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(Wizard);
