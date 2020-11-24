import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Grid, Loader } from 'semantic-ui-react';
import { FormFileSegment } from '../../components';
import { saveIntegration, metaChange } from '../../redux/actions';
import {
  ROUTES,
  DARK_MODE,
  AUTOSAVE_INTERVAL,
  EMPTY_INTEGRATION,
  INTEGRATION_AUTOSAVE_NAME,
} from '../../utils/constants';
import { RootState } from '../../redux/store';

// #region Redux Configuration
const mapStateToProps = ({ integration, settings }: RootState) => {
  const {
    integrationFile,
    autosaveLoading,
    loading,
    loaded,
    dataIntegration,
    errorState,
    errorMessage,
  } = integration;

  const { paths } = settings;
  return {
    paths,
    integrationFile,
    autosaveLoading,
    loading,
    loaded,
    dataIntegration,
    errorState,
    errorMessage,
  };
};

const mapActionsToProps = {
  saveIntegration,
  metaChange,
};

const connector = connect(mapStateToProps, mapActionsToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type IProps = PropsFromRedux & RouteComponentProps;
type IStates = {
  showNotification: boolean;
};
// #endregion

class IntegrationDetail extends Component<IProps, IStates> {
  autosaveID!: NodeJS.Timeout;

  notificationID!: NodeJS.Timeout;

  constructor(props: IProps) {
    super(props);

    this.state = {
      showNotification: false,
    };
  }

  componentDidMount() {
    this.autosaveID = setInterval(() => {
      const {
        errorState,
        integrationFile,
        paths,
        dataIntegration,
        saveIntegration: SaveIntegration,
      } = this.props;
      if (errorState !== true && integrationFile !== undefined) {
        this.setState({
          showNotification: true,
        });
        SaveIntegration(
          paths.integrations,
          dataIntegration === undefined ? EMPTY_INTEGRATION : dataIntegration,
          integrationFile,
          true
        );
      }
    }, AUTOSAVE_INTERVAL);
  }

  onGoBack = () => {
    const { history } = this.props;
    history.push(ROUTES.INTEGRATIONS);
  };

  render() {
    const {
      paths,
      integrationFile,
      dataIntegration,
      saveIntegration: SaveIntegration,
    } = this.props;
    const { showNotification } = this.state;
    return (
      <Grid inverted={DARK_MODE} padded className="maximize-height-with-nav">
        <Grid.Row color={DARK_MODE === true ? 'black' : undefined}>
          <Grid.Column>
            <FormFileSegment
              title="Integration"
              defaultFileName={INTEGRATION_AUTOSAVE_NAME}
              savePath={paths.integrations}
              emptyData={EMPTY_INTEGRATION}
              activeFile={integrationFile}
              dataToSave={dataIntegration}
              SaveFile={SaveIntegration}
              onGoBack={this.onGoBack}
            />
            <Loader
              className="loading-notification"
              inverted={DARK_MODE}
              active={showNotification}
            >
              Autosave...
            </Loader>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default connector(IntegrationDetail);
