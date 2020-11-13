import React from 'react';
import { StructureObject } from '../../types';

type StructureListProps = {
  dataStructure: StructureObject;
};
class StructureList extends React.PureComponent<StructureListProps> {
  render() {
    return (
      <div>
        <p>this is type?</p>
      </div>
    );
  }
}

export default StructureList;
