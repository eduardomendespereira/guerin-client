import {AbstractEntity} from "./abstract-entity.model";

export class Specie extends AbstractEntity {
    nome! : string

    constructor() {
        super()
        this.inactive = false
    }
}