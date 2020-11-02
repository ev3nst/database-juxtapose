import React from 'react';
import { useTranslation } from 'react-i18next';
import { InteractiveResponder } from '../types';

const Responder: React.FunctionComponent<InteractiveResponder> = (props) => {
  const { t } = useTranslation();
  if (props.errorState === true) {
    return (
      <div>
        <h5>{t('errors.unexpected_error')}</h5>
      </div>
    );
  }

  return <React.Fragment></React.Fragment>;
};

export default Responder;