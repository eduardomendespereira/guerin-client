import { AbstractEntity } from "./abstract-entity.model"
import { Cattle } from "./cattle.model"

export class Weighing extends AbstractEntity {
    cattle! : Cattle
    date! : Date
    weight! : number

    constructor() {
        super()
        this.inactive = false
    }
}