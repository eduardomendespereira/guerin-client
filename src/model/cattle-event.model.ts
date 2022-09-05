import {AbstractEntity} from "./abstract-entity.model";
import { Cattle } from "./cattle.model";
import { EventType } from "./event-type.model";
import { VaccineApplication } from "./vaccine-application.model";
import { Weighing } from "./weighing.model";

export class CattleEvent extends AbstractEntity {
    cattle! : Cattle
    eventType! : EventType
    date! : Date
    description! : string
    vaccineApplication! : VaccineApplication
    weighing! : Weighing

    constructor() {
        super()
        this.inactive = false
    }
}