import React  from 'react';
import { InteractiveResponder } from '../types';

const Responder: React.FunctionComponent <InteractiveResponder> = (props) => {
 if(props.errorState === true) {
    return (
        <div>
            <h5></h5>
        </div>
    )
 }

 return <React.Fragment></React.Fragment>
}