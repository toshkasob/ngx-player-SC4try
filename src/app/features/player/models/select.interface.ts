import { AvailableActionsEnum } from './available-actions.enum';

export interface EmitSelectedValue {
  action: AvailableActionsEnum;
  value?: number;
}

export interface OptionInterface {
  value: number;
  label: string;
}

export interface SelectInterface {
  title: string,
  action: AvailableActionsEnum,
  options?: OptionInterface[],
}
