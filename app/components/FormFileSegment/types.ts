import { ActionCreator } from 'redux';

export type FormFileSegmentProps = {
  title: string;
  defaultFileName: string;
  savePath: string;
  emptyData: any;
  activeFile: string;
  dataToSave: any;
  SaveFile: ActionCreator<any>;
  extraButtons?: React.ReactNode;
  onGoBack: (params?: any) => void;
};
