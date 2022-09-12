import { AbstractEntity } from "./abstract-entity.model"

export class Vaccine extends AbstractEntity {
    name! : string
    date! : Date
    required! : boolean

    constructor() {
        super()
        this.inactive = false
    }
}