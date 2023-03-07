import { AbstractEntity } from "./abstract-entity.model";
import { Farm } from "./farm.model";
import { Gender } from "./gender.enum";
import { Specie } from "./specie.model";
import { CattleStatus } from "./cattle-status.enum";

export class Cattle extends AbstractEntity {
  earring!: number;
  weight!: number;
  specie!: Specie;
  farm!: Farm;
  gender!: Gender;
  father!: number;
  mother!: number;
  bornAt!: Date;
  breastFeeding!: Boolean;
  status!: CattleStatus;

  constructor() {
    super();
    this.inactive = false;
  }
}
