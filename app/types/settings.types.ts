export type SettingPathInterface = {
  userSettings: string;
  structures: string;
  migrations: string;
};

export type UserConfig = {
  autoSave: Boolean;
  paths: SettingPathInterface;
};
