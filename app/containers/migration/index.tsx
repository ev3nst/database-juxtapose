import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Grid } from 'semantic-ui-react';
import { saveMigration, changeMigration } from '../../redux/actions';
import { RootState } from '../../redux/store';
import { DARK_MODE } from '../../utils/constants';
import MigrationItem from './MigrationItem';
import MigrationList from './MigrationList';

// #region Redux Configuration
const mapStateToProps = ({ migration, settings }: RootState) => {
  const {
    autosaveLoading,
    allMigrations,
    migrationFile,
    dataMigration,
    errorState,
    errorMessage,
  } = migration;
  const { paths } = settings;
  return {
    paths,
    autosaveLoading,
    allMigrations,
    migrationFile,
    dataMigration,
    errorState,
    errorMessage,
  };
};

const mapActionsToProps = {
  saveMigration,
  changeMigration,
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

class Migration extends React.PureComponent<IProps, IStates> {
  render() {
    const {
      paths,
      autosaveLoading,
      allMigrations,
      migrationFile,
      dataMigration,
      changeMigration: ChangeMigration,
      errorState,
      errorMessage,
      saveMigration: SaveMigration,
    } = this.props;
    return (
      <Grid inverted={DARK_MODE} padded className="maximize-height-with-nav">
        <Grid.Row color={DARK_MODE === true ? 'black' : undefined}>
          <Grid.Column width={3} style={listBorder}>
            <MigrationList
              activeFile={migrationFile}
              migrationsPath={paths.migrations}
              allMigrations={allMigrations}
              changeMigration={ChangeMigration}
            />
          </Grid.Column>
          <Grid.Column width={13}>
            <div style={itemSpace}>
              <MigrationItem
                activeFile={migrationFile}
                errorState={errorState}
                errorMessage={errorMessage}
                paths={paths}
                autosaveLoading={autosaveLoading}
                dataMigration={dataMigration}
                SaveMigration={SaveMigration}
              />
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
export default connector(Migration);
