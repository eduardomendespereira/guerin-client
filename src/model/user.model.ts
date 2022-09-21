import { AbstractEntity } from "./abstract-entity.model"
import { Role } from "./role.enum"

export class User extends AbstractEntity {
    firstName! : string
    lastName! : string
    email! : string
    username! : string
    password! : string
    role! : Role

    constructor() {
        super()
        this.inactive = false
    }
}