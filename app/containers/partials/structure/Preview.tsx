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

  onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    const { onSort } = this.props;
    onSort(oldIndex, newIndex);
  };

  render() {
    const { dataStructure, onRemoveHeader, inverted } = this.props;

    return (
      <StructureHeaderContainer inverted={inverted} axis="xy" onSortEnd={this.onSortEnd}>
        {dataStructure.map((_val, index) => (
          <StructureHeader
            key={dataStructure[index].name}
            index={index}
            header={dataStructure[index].name}
            inverted={inverted}
            onRemoveHeader={onRemoveHeader}
          />
        ))}
      </StructureHeaderContainer>
    );
  }
}

export default Preview;
