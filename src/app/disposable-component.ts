import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class DisposableComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription[] = [];

    constructor() {

    }

    protected addToSubscriptions(subscription: Subscription): void {
        this.subscriptions.push(subscription);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(p => p.unsubscribe());
    }

    ngOnInit(): void {
    }
}