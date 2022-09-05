import {AbstractEntity} from "./abstract-entity.model";
import { Cattle } from "./cattle.model";
import { Vaccine } from "./vaccine.model";

export class VaccineApplication extends AbstractEntity {
    note! : string
    vaccine! : Vaccine
    date! : Date
    cattle! : Cattle
 
    constructor() {
        super()
        this.inactive = false
    }
}