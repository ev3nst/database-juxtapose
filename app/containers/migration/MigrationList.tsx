import React from 'react';
import { ActionCreator } from 'redux';
import { Segment, Header, List, Icon } from 'semantic-ui-react';
import {
  DARK_MODE,
  MIGRATION_AUTOSAVE_NAME,
  MIGRATION_AUTOSAVE_FILE,
} from '../../utils/constants';
import { MigrationActionTypes } from '../../redux/migration/action.types';

type MigrationListProps = {
  activeFile: string;
  migrationsPath: string;
  allMigrations: Array<string>;
  changeMigration: ActionCreator<MigrationActionTypes>;
};
class MigrationList extends React.Component<MigrationListProps> {
  shouldComponentUpdate(nextProps: MigrationListProps): boolean {
    const { allMigrations, activeFile } = this.props;
    if (
      allMigrations.length !== nextProps.allMigrations.length ||
      activeFile !== nextProps.activeFile
    ) {
      return true;
    }

    return false;
  }

  renderMigrationList(): JSX.Element[] {
    const { activeFile, migrationsPath, allMigrations, changeMigration } = this.props;
    return allMigrations.map((fileName) => (
      <List.Item
        active={activeFile === fileName}
        key={fileName}
        onClick={() => {
          changeMigration(migrationsPath, `${fileName}.json`);
        }}
      >
        <List.Content>
          <List.Header>
            <Icon size="small" name="file alternate outline" /> {fileName}
          </List.Header>
        </List.Content>
      </List.Item>
    ));
  }

  render() {
    const { activeFile, migrationsPath, changeMigration } = this.props;
    return (
      <Segment inverted={DARK_MODE} basic clearing>
        <Header
          as="h3"
          className="muted-subheader"
          inverted={DARK_MODE}
          content="Migration List"
          subheader="Click to navigate"
          style={{
            marginTop: 1,
          }}
        />
        <List selection animated verticalAlign="middle" inverted={DARK_MODE}>
          <List.Item
            active={activeFile === MIGRATION_AUTOSAVE_NAME}
            key={MIGRATION_AUTOSAVE_FILE}
            onClick={() => {
              changeMigration(migrationsPath, MIGRATION_AUTOSAVE_FILE);
            }}
          >
            <List.Content>
              <List.Header>
                New <Icon size="small" name="plus" />
              </List.Header>
            </List.Content>
          </List.Item>
          {this.renderMigrationList()}
        </List>
      </Segment>
    );
  }
}

export default MigrationList;
