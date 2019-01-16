import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
​import { uiStore } from './comments-ui.store.ts';

export interface CommentsState extends EntityState<Comment> {
    ui: {
      filter: VISIBILITY_FILTER;
    };
  }

@StoreConfig({
    name: 'todos'
  })
  export class CommentsStore extends EntityStore<State, Comment> {
    readonly uiStore = uiStore;
  ​
    constructor() {
      super(initialState);
    }
  }
  ​
  const initialState = {
    ui: { filter: VISIBILITY_FILTER.SHOW_ALL }
  };
  ​
  @StoreConfig({ name: 'comments' })
  export class CommentsStore extends EntityStore<CommentsState, Comment> {
    constructor() {
      super(initialState);
    }
    
    updateFilter(filter: VISIBILITY_FILTER) {
      this.updateRoot({ ui: { filter } } )
    }
  }