import { Injectable, Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { Store, StoreConfig } from "@datorama/akita";
import * as storage from "../storage";
import { Subscription } from "rxjs";

export type SessionState = {
  token: string;
  name: string;
}

export function createInitialSessionState(): SessionState {
  return {
    token: null,
    name: null,
    ...storage.getSession(),
  }
}

@StoreConfig({ name: "session" })
export class SessionStore extends Store<SessionState> {
  constructor() {
    super(createInitialSessionState());
  }

  login(session: SessionState) {
    this.update(session);
    storage.saveSession(session);
  }

  logout() {
    storage.clearSesssion();
    this.update(createInitialSessionState());
  }
}

@Directive({ selector: '[showIfLoggedIn]' })
export class ShowIfLoggedInDirective {
  subscription: Subscription;
  @Input() showIfLoggedIn: boolean;

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private authQuery: SessionQuery
  ){}

  ngOnInit() {
    this.subscription = this.authQuery.isLoggedIn$.subscribe(isLoggedIn => {
      this.viewContainer.clear();
      if (isLoggedIn) {
        if (this.showIfLoggedIn) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      } else {
        if (this.showIfLoggedIn) {
          this.viewContainer.clear();
        } else {
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
      }
    });
  }

  ngOnDestory() {
    this.subscription.unsubscribe();
  }
}