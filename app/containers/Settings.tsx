import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../redux/store';
import { changePath } from '../redux/actions';
import { Container, Header, Form, Message } from 'semantic-ui-react';

const { dialog } = require('electron').remote;

//#region Redux Configuration
const mapStateToProps = ({ settings }: RootState) => {
  const { paths, autoSave } = settings;
  return {
    paths,
    autoSave,
  };
};

const mapActionsToProps = {
  changePath,
};

const connector = connect(mapStateToProps, mapActionsToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ISettingsProps = PropsFromRedux & RouteComponentProps;
//#endregion

class Settings extends Component<ISettingsProps> {
  componentDidMount() {}

  async onPathChange(key: string) {
    const resp = await dialog.showOpenDialog({
      title: 'THIS IS TITLE',
      message: 'message prop',
      defaultPath: this.props.paths.structures,
      properties: ['openDirectory', 'createDirectory'],
    });

    if (resp.filePaths[0] !== undefined && resp.filePaths[0] !== null) {
      this.props.changePath(key, resp.filePaths[0]);
    }
  }

  private pathInfoConfig = {
      color: 'teal',
      labelPosition: 'right',
      icon: 'folder open outline',
      content: 'Edit',
    }
  
    componentDidUpdate() {
      
    console.log(this.props) 
    }

  render() {
    return (
      <Container>
        <Header
          as="h2"
          content="Application Settings"
          subheader="User preferences are saved on a static path. Meaning it cannot be changed. When Other path preferences are changed their contents are moved as well."
        />
        <Form>
          <Form.Input
            fluid readOnly
            label="Structures Path"
            value={this.props.paths.structures}
            action={{
              ...this.pathInfoConfig,
              onClick: () => this.onPathChange('structures')
            }}
          />
          <Form.Input
            fluid readOnly
            label="Migrations Path"
            value={this.props.paths.migrations}
            action={{
              ...this.pathInfoConfig,
              onClick: () => this.onPathChange('migrations')
            }}
          />
          <Form.Input required
            disabled
            fluid
            label="User Preferences"
            value={this.props.paths.userSettings}
          />
          <Form.Checkbox label="Auto Save" checked={this.props.autoSave} />
          <Message
            info
            header='Works on content structure and database migration.'
            list={[
              'When creating a new structure or migration every minute progress is saved and will be kept until page is manually cleaned via button provided in that page or progress is saved manually by the user.',
            ]}
          />
          <Form.Button>Submit</Form.Button>
        </Form>
      </Container>
    );
  }
}

export default connector(Settings);
