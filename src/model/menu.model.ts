import { AbstractEntity } from "./abstract-entity.model"

export class Menu extends AbstractEntity {
    name! : string
    description! : string
    path! : string
    icon! : string

    constructor() {
        super()
        this.inactive = false
    }
}