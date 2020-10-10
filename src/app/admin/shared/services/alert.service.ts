import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

export type AllertType = 'success'|'warning'|'danger'

export interface Alert {
    type: AllertType
    text: string
}

@Injectable()
export class AlertService {
    public alert$ = new Subject<Alert>()

    success(text: string){
        console.log(text)
        this.alert$.next({type: 'success', text})
    }

    warning(text: string){
        this.alert$.next({type: 'warning', text})
    }

    danger(text: string){
        this.alert$.next({type: 'danger', text})
    }


}