import React from 'react';
import { useTranslation } from 'react-i18next';
import { InteractiveResponder } from '../types';

const Responder: React.FunctionComponent<InteractiveResponder> = (props) => {
  const { t } = useTranslation();
  const { errorState } = props;
  if (errorState === true) {
    return (
      <div>
        <h5>{t('errors.unexpected_error')}</h5>
      </div>
    );
  }

  return <></>;
};

export default Responder;
