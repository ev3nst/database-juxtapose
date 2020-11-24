import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Grid } from 'semantic-ui-react';
import { NavigationFilelist } from '../../components';
import {
  saveIntegration,
  changeIntegration,
  deleteIntegration,
} from '../../redux/actions';
import { ROUTES, DARK_MODE, INTEGRATION_AUTOSAVE_FILE } from '../../utils/constants';
import { RootState } from '../../redux/store';

// #region Redux Configuration
const mapStateToProps = ({ integration, settings }: RootState) => {
  const { integrationFile, allIntegrations } = integration;
  const { paths } = settings;
  return {
    paths,
    integrationFile,
    allIntegrations,
  };
};

const mapActionsToProps = {
  saveIntegration,
  changeIntegration,
  deleteIntegration,
};

const connector = connect(mapStateToProps, mapActionsToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type IProps = PropsFromRedux & RouteComponentProps;
// #endregion

class Integrations extends React.PureComponent<IProps> {
  navigate = () => {
    const { history } = this.props;
    history.push(ROUTES.INTEGRATION_DETAIL);
  };

  render() {
    const {
      paths,
      integrationFile,
      allIntegrations,
      changeIntegration: ChangeIntegration,
      deleteIntegration: DeleteIntegration,
    } = this.props;

    return (
      <Grid inverted={DARK_MODE} padded className="maximize-height-with-nav">
        <Grid.Row color={DARK_MODE === true ? 'black' : undefined}>
          <Grid.Column>
            <NavigationFilelist
              title="Integration List"
              newFile={INTEGRATION_AUTOSAVE_FILE}
              onNavigate={this.navigate}
              activeFile={integrationFile}
              filesPath={paths.integrations}
              allFiles={allIntegrations}
              changeFile={ChangeIntegration}
              deleteFile={DeleteIntegration}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
export default connector(Integrations);
