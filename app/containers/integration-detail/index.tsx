import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Form, Button, Grid, Loader } from 'semantic-ui-react';
import { FormFileSegment } from '../../components';
import { saveIntegration, metaChange } from '../../redux/actions';
import {
  ROUTES,
  DARK_MODE,
  AUTOSAVE_INTERVAL,
  EMPTY_INTEGRATION,
  INTEGRATION_AUTOSAVE_NAME,
  SUPPORTED_DATABASES,
} from '../../utils/constants';
import { RootState } from '../../redux/store';

const GridPadding: React.CSSProperties = {
  paddingLeft: 25,
  paddingRight: 25,
};

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
          <Grid.Column style={GridPadding}>
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

            <Form inverted={DARK_MODE}>
              <Form.Group widths={2}>
                <Form.Select
                  fluid
                  label="Database Type"
                  defaultValue={SUPPORTED_DATABASES[0].value}
                  options={SUPPORTED_DATABASES}
                  className={DARK_MODE === true ? 'inverted' : undefined}
                />
                <Form.Input
                  label="Database"
                  placeholder=""
                  transparent={DARK_MODE}
                  className={DARK_MODE === true ? 'inverted-bordered' : undefined}
                />
              </Form.Group>
              <Form.Group widths={4}>
                <Form.Input
                  label="Host"
                  placeholder="localhost"
                  transparent={DARK_MODE}
                  className={DARK_MODE === true ? 'inverted-bordered' : undefined}
                />
                <Form.Input
                  label="Port"
                  placeholder="3306"
                  transparent={DARK_MODE}
                  className={DARK_MODE === true ? 'inverted-bordered' : undefined}
                />
                <Form.Input
                  label="Username"
                  placeholder="root"
                  transparent={DARK_MODE}
                  className={DARK_MODE === true ? 'inverted-bordered' : undefined}
                />
                <Form.Input
                  label="Password"
                  placeholder=""
                  transparent={DARK_MODE}
                  className={DARK_MODE === true ? 'inverted-bordered' : undefined}
                />
              </Form.Group>
              <Form.Checkbox label="I agree to the Terms and Conditions" />
              <Button type="submit">Submit</Button>
            </Form>

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
