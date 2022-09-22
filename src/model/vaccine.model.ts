import { AbstractEntity } from "./abstract-entity.model"

export class Vaccine extends AbstractEntity {
    name! : string
    required! : boolean

    constructor() {
        super()
        this.inactive = false
    }
}