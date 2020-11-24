export type FileListProps = {
  title: string;
  newFile: string;
  activeFile: string;
  filesPath: string;
  allFiles: Array<string>;
  changeFile: any;
  deleteFile: any;
  onNavigate: () => void;
};

export type FileListStates = {
  deleteFileConfirm: boolean;
  whichFile: string;
};
