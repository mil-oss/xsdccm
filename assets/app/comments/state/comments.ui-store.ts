import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
​


export type CommentsUIState = {
  isOpen: boolean;
  isMarked: boolean;
}
​
@StoreConfig({
  name: 'comments-ui'
})
export class CommentsUIStore extends EntityStore<EntityState<CommentUI>, CommentUI> {
  constructor() {
    super();
  }
}
​
export const uiStore = new CommentsUIStore();