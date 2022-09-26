import {AbstractEntity} from "./abstract-entity.model";

export class Specie extends AbstractEntity {
    name! : string

    constructor() {
        super()
        this.inactive = false
    }
}