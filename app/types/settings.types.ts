export type SettingPathInterface = {
  userSettings: string;
  structures: string;
  integrations: string;
};

export type UserConfig = {
  autoSave: boolean;
  paths: SettingPathInterface;
};
