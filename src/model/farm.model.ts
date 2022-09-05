import {AbstractEntity} from "./abstract-entity.model";

export class Farm extends AbstractEntity{
    name! : string
    address! : string

    constructor() {
        super()
        this.inactive = false
    }
}