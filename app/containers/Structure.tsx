import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Grid, Container, Form, Button, Header, Segment } from 'semantic-ui-react';
import {
  saveStructure,
  manipulateStructureHeader,
  manipulateStructureField,
} from '../redux/actions';
import { Preview, FieldForm, HeaderForm } from './partials/structure';
import { RootState } from '../redux/store';
import { INTERVAL_TIMEOUT, DARK_MODE } from '../utils/constants';

// #region Redux Configuration
const mapStateToProps = ({ structure, settings }: RootState) => {
  const { loading, loaded, newStructure } = structure;
  const { paths } = settings;
  return { loading, loaded, newStructure, paths };
};

const mapActionsToProps = {
  saveStructure,
  manipulateStructureHeader,
  manipulateStructureField,
};

const connector = connect(mapStateToProps, mapActionsToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type IProps = PropsFromRedux & RouteComponentProps;

type IStates = {
  showNotification: boolean;
};
// #endregion

class Structure extends Component<IProps, IStates> {
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
      this.onSaveStructure(true);
    }, INTERVAL_TIMEOUT);
  }

  componentDidUpdate(prevProps: IProps) {
    const { loading } = this.props;
    if (prevProps.loading !== loading) {
      this.notificationID = setTimeout(() => {
        this.setState({
          showNotification: false,
        });
      }, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.autosaveID);
    clearInterval(this.notificationID);
  }

  onSaveStructure(isAutosave: boolean = false) {
    const { paths, newStructure, saveStructure: SaveStructure } = this.props;
    this.setState({
      showNotification: true,
    });
    SaveStructure(
      paths.structures,
      newStructure === undefined ? {} : newStructure,
      isAutosave
    );
  }

  getStructureHeaders = (): Array<string> => {
    const { newStructure } = this.props;
    return Object.keys(newStructure);
  };

  getStructureFields = (whichHeader: string): Array<string> => {
    const { newStructure } = this.props;
    return Object.values(newStructure[whichHeader]);
  };

  onNewHeader = (newHeader: string): void => {
    const { manipulateStructureHeader: ManipulateStructureHeader } = this.props;

    const headers = this.getStructureHeaders();
    if (!headers.includes(newHeader)) {
      ManipulateStructureHeader(newHeader, 'add');
    }
  };

  onRemoveHeader = (removeHeader: string): void => {
    const { manipulateStructureHeader: ManipulateStructureHeader } = this.props;

    const headers = this.getStructureHeaders();
    if (headers.includes(removeHeader)) {
      ManipulateStructureHeader(removeHeader, 'remove');
    }
  };

  onNewField = (newField: string, selectedHeader: string): void => {
    const { manipulateStructureField: ManipulateStructureField } = this.props;

    const fields = this.getStructureFields(selectedHeader);
    if (!fields.includes(newField)) {
      ManipulateStructureField(newField, selectedHeader, 'add');
    }
  };

  onRemoveField = (removeField: string, whichHeader: string): void => {
    const { manipulateStructureField: ManipulateStructureField } = this.props;

    const fields = this.getStructureFields(whichHeader);
    if (fields.includes(removeField)) {
      ManipulateStructureField(removeField, whichHeader, 'remove');
    }
  };

  render() {
    const { newStructure } = this.props;
    const { showNotification } = this.state;

    return (
      <Grid inverted={DARK_MODE} padded className="maximize-height-with-nav">
        <Grid.Row color={DARK_MODE === true ? 'black' : undefined}>
          <Grid.Column>
            <Container>
              <Segment
                inverted={DARK_MODE}
                style={{
                  paddingLeft: 0,
                  paddingRight: 0,
                }}
                basic
                clearing
              >
                <Header inverted={DARK_MODE} as="h2" floated="left">
                  New Structure
                </Header>
                <Header inverted={DARK_MODE} as="h2" floated="right">
                  <Button
                    color={DARK_MODE === true ? 'green' : undefined}
                    inverted={DARK_MODE}
                    loading={showNotification}
                    onClick={() => this.onSaveStructure(true)}
                  >
                    SAVE
                  </Button>
                </Header>
              </Segment>

              <Form inverted={DARK_MODE}>
                <Form.Group widths="equal">
                  <HeaderForm onNewHeader={this.onNewHeader} />
                  <FieldForm
                    onNewField={this.onNewField}
                    structureHeaders={this.getStructureHeaders()}
                  />
                </Form.Group>
              </Form>

              <Preview
                inverted={DARK_MODE}
                onRemoveHeader={this.onRemoveHeader}
                onRemoveField={this.onRemoveField}
                newStructure={newStructure}
              />
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default connector(Structure);
