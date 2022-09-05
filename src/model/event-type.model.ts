import { AbstractEntity } from "./abstract-entity.model"

export class EventType extends AbstractEntity {
    name! : string

    constructor() {
        super()
        this.inactive = false
    }
}