import { SelectInterface } from '../models/select.interface';
import { MenuInterface } from '../models/menu.interface';
import { AvailableActionsEnum } from '../models/available-actions.enum';

export const speedConfig: SelectInterface = {
  title: 'Скорость',
  action: AvailableActionsEnum.CHANGE_SPEED,
  options: [
    {
      value: 25,
      label: 'x0.25',
    },
    {
      value: 75,
      label: 'x0.75',
    },
    {
      value: 100,
      label: 'x1.00',
    },
    {
      value: 125,

      label: 'x1.25',
    },
    {
      value: 200,
      label: 'x2.00',
    },
  ],
};

export const playerSettings: SelectInterface = {
  title: 'Настройки',
  action: AvailableActionsEnum.OPEN_SETTINGS,
}

export const playerMenu: MenuInterface[] = [
  {
    selectConfig: speedConfig,
  },
  {
    selectConfig: playerSettings,
  },
]



