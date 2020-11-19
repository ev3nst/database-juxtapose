import React from 'react';
import { Progress } from 'semantic-ui-react';
import { IntroProgressProps } from './types';

class ProgressPercentage extends React.PureComponent<IntroProgressProps> {
  checkIfLoaded(): boolean {
    const { initStates } = this.props;

    return (
      initStates.settings.loaded === true &&
      initStates.structure.loaded === true &&
      initStates.integration.loaded === true
    );
  }

  resolveProgress(): JSX.Element {
    const { initStates, errors, inverted } = this.props;

    if (this.checkIfLoaded()) {
      return <Progress inverted={inverted} percent={100} success />;
    }

    const loadingKeys = Object.keys(initStates);
    let loadedCount = loadingKeys.length;
    for (let i = 0; i < loadingKeys.length; i += 1) {
      const key = loadingKeys[i] as keyof typeof initStates;
      if (initStates[key].loaded === false) loadedCount -= 1;
    }

    let loadingPercentage: string | number = 0;
    if (loadedCount === loadingKeys.length) {
      loadingPercentage = 100;
    } else {
      loadingPercentage = loadedCount * (100 / loadingKeys.length);
    }

    loadingPercentage = loadingPercentage.toFixed(0);

    const errorKeys = Object.keys(errors);
    for (let i = 0; i < errorKeys.length; i += 1) {
      const key = errorKeys[i] as keyof typeof initStates;
      if (errors[key].errorState === true) {
        return (
          <Progress inverted={inverted} percent={loadingPercentage} error>
            There was an error
          </Progress>
        );
      }
    }
    return <Progress percent={loadingPercentage} progress active color="teal" />;
  }

  render(): JSX.Element {
    return this.resolveProgress();
  }
}

export default ProgressPercentage;
