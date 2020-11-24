import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Grid } from 'semantic-ui-react';
import { saveIntegration, changeIntegration } from '../../redux/actions';
import { RootState } from '../../redux/store';
import { DARK_MODE } from '../../utils/constants';
import IntegrationItem from './IntegrationItem';
import IntegrationList from './IntegrationList';

// #region Redux Configuration
const mapStateToProps = ({ integration, settings }: RootState) => {
  const {
    autosaveLoading,
    allIntegrations,
    integrationFile,
    dataIntegration,
    errorState,
    errorMessage,
  } = integration;
  const { paths } = settings;
  return {
    paths,
    autosaveLoading,
    allIntegrations,
    integrationFile,
    dataIntegration,
    errorState,
    errorMessage,
  };
};

const mapActionsToProps = {
  saveIntegration,
  changeIntegration,
};

const connector = connect(mapStateToProps, mapActionsToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type IProps = PropsFromRedux & RouteComponentProps;
type IStates = {};
// #endregion

const listBorder: React.CSSProperties = {
  borderRightWidth: 1,
  borderRightColor: DARK_MODE === true ? '#333333' : '#eeeeee',
  borderRightStyle: 'solid',
};

const itemSpace: React.CSSProperties = {
  marginLeft: 10,
  paddingRight: 10,
};

class Integration extends React.PureComponent<IProps, IStates> {
  render() {
    const {
      paths,
      autosaveLoading,
      allIntegrations,
      integrationFile,
      dataIntegration,
      changeIntegration: ChangeIntegration,
      errorState,
      errorMessage,
      saveIntegration: SaveIntegration,
    } = this.props;
    return (
      <Grid inverted={DARK_MODE} padded className="maximize-height-with-nav">
        <Grid.Row color={DARK_MODE === true ? 'black' : undefined}>
          <IntegrationList
            activeFile={integrationFile}
            integrationsPath={paths.integrations}
            allIntegrations={allIntegrations}
            changeIntegration={ChangeIntegration}
          />
        </Grid.Row>
      </Grid>
    );
  }
}
export default connector(Integration);
