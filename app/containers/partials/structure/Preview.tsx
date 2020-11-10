import React from 'react';
import { PreviewProps } from './types';

class Preview extends React.PureComponent<PreviewProps> {
  render(): JSX.Element[] {
    const { newStructure, onRemoveHeader, onRemoveField } = this.props;
    const toRender: Array<JSX.Element> = [];

    const keys = Object.keys(newStructure);
    for (let i = 0; i < keys.length; i += 1) {
      const keyToRemove = keys[i];
      toRender.push(
        <div key={keyToRemove}>
          <h4>
            {keyToRemove} -
            <button type="button" onClick={() => onRemoveHeader(keyToRemove)}>
              Delete ({keyToRemove as string})
            </button>
          </h4>
        </div>
      );
      if (newStructure[keyToRemove].length > 0) {
        for (let index = 0; index < newStructure[keyToRemove].length; index += 1) {
          toRender.push(
            <li key={keyToRemove + index}>
              {newStructure[keyToRemove][index]} -
              <button
                type="button"
                onClick={() =>
                  onRemoveField(newStructure[keyToRemove][index], keyToRemove)
                }
              >
                Delete
              </button>
            </li>
          );
        }
      }
    }

    return toRender;
  }
}

export default Preview;
