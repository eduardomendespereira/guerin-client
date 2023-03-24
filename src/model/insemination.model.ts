import { AbstractEntity } from "./abstract-entity.model"
import {Cattle} from "@/model/cattle.model";

export class Insemination extends AbstractEntity {
    date! : Date
    cattle! : Cattle

    constructor() {
        super()
        this.inactive = false
    }
}