export enum EpilepsyProtectionEnum {
  CUT = 'CUT',
  SLOWDOWN = 'SLOWDOWN',
  FORCE_SKIP = 'FORCE_SKIP',
  SKIP = 'SKIP',
}

export enum EpilepsyProtectionRUEnum {
  CUT = 'Вырезание',
  SLOWDOWN = 'Замедление',
  FORCE_SKIP = 'Принудительно пропустить',
  SKIP = 'Пропустить по желанию'
}

export enum labelSkipControl {
  CUT = 'Сцена была вырезана',
  SLOWDOWN = 'Замедление сцены',
  FORCE_SKIP = 'Сцена была пропущена',
  SKIP = 'Пропустить',
}

export enum typeSkipControl {
  WARNING = 'WARNING',
  ACTION = 'ACTION',
}
