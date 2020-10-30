export type SettingPathInterface = {
  userSettings: string;
  structures: string;
  migrations: string;
};

export type UserSettings = {
  paths: SettingPathInterface;
};
