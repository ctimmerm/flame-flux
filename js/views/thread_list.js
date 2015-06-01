import ThreadListItem from './thread_list_item';
import ThreadActions from '../actions/thread_actions';
import ThreadStore from '../stores/thread_store';

export default Flame.LazyListView.extend({
  allowReordering: false,
  itemHeight: 60,
  itemViewClass: ThreadListItem,

  getStateFromStores() {
    this.set('content', ThreadStore.getAll());
  },

  init() {
    this._super();
    this.getStateFromStores();
    ThreadStore.addChangeListener(this._onChange.bind(this));
  },

  willDestroy() {
    this._super();
    ThreadStore.removeChangeListener(this._onChange);
  },

  _onChange() {
    Ember.run.scheduleOnce('actions', this, this.getStateFromStores);
  },

  selectIndex(index) {
    const allowSelection = this._super(index);
    ThreadActions.selectThread(this.get('content').objectAt(index));
    return allowSelection;
  }
});
