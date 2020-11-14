import React from 'react';
import { StructureHeaderContainer, StructureHeader } from './StructureHeaders';
import { PreviewProps } from './types';

class Preview extends React.Component<PreviewProps> {
  shouldComponentUpdate(nextProps: PreviewProps): boolean {
    const { dataStructure } = this.props;
    if (
      Object.keys(dataStructure).length !== Object.keys(nextProps.dataStructure).length
    ) {
      return true;
    }

    return true;
  }

  render() {
    const { dataStructure, onRemoveHeader, onRemoveField, inverted, onSort } = this.props;

    return (
      <StructureHeaderContainer
        inverted={inverted}
        axis="xy"
        onSortEnd={({ oldIndex, newIndex }) => onSort(oldIndex, newIndex)}
        useDragHandle
      >
        {dataStructure.map((_val, index) => (
          <StructureHeader
            key={dataStructure[index].name}
            index={index}
            header={dataStructure[index].name}
            items={dataStructure[index].items}
            inverted={inverted}
            onRemoveHeader={onRemoveHeader}
            onRemoveField={onRemoveField}
            onSort={onSort}
          />
        ))}
      </StructureHeaderContainer>
    );
  }
}

export default Preview;
