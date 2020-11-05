export type SettingPathInterface = {
  userSettings: string;
  structures: string;
  migrations: string;
};

export type UserConfig = {
  autoSave: boolean;
  paths: SettingPathInterface;
};
