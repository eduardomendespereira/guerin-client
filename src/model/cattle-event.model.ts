import {AbstractEntity} from "./abstract-entity.model";
import { Cattle } from "./cattle.model";
import { EventType } from "./event-type.model";
import { VaccineApplication } from "./vaccine-application.model";
import { Weighing } from "./weighing.model";
import {Insemination} from "@/model/insemination.model";

export class CattleEvent extends AbstractEntity {
    cattle! : Cattle
    eventType! : EventType
    date! : Date
    description! : string
    vaccineApplication! : VaccineApplication
    weighing! : Weighing
    insemination! : Insemination

    constructor() {
        super()
        this.inactive = false
    }
}