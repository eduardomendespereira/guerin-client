import {AbstractEntity} from "./abstract-entity.model";
import { Farm } from "./farm.model";
import { Gender } from "./gender.enum";
import { Specie } from "./specie.model";

export class Cattle extends AbstractEntity {
    earring! : number
    weight! : Date
    specie! : Specie
    farm! : Farm
    gender! : Gender
    father! : number
    mother! : number

    constructor() {
        super()
        this.inactive = false
    }
}