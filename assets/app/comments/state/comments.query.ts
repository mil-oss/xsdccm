import { EntityState, QueryEntity } from '@datorama/akita';
​
const uiQuery = 
      new QueryEntity<EntityState<CommentUI>, CommentUI>(uiStore);
​

export class CommentsQuery extends QueryEntity<CommentState, Comment> {
  selectVisibilityFilter$ = this.select(state => state.ui.filter);
  
  constructor(protected store: CommentsStore) {
    super(store);
  }
}