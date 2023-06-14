import { EnumDifficulty } from 'app/enums/dificulty.enum';
import { EnumAnswersType } from 'app/enums/type.enum';

export interface RequestParam {
  category: number;
  amount: number;
  difficulty: EnumDifficulty;
  type: EnumAnswersType;
}
