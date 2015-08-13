import MessageStore from '../stores/message_store';
import MessageActions from '../actions/message_actions';
import ThreadStore from '../stores/thread_store';
import MessageListItem from './message_list_item';

export default Flame.View.extend({
  childViews: ['threadNameView', 'messagesListView', 'textFieldView'],

  currentThreadName: null,
  messages: null,

  getStateFromStores() {
    let currentThread = ThreadStore.getCurrent();
    this.setProperties({
      currentThreadName: currentThread ? currentThread.threadName : '',
      messages: MessageStore.getMessagesForCurrentThread()
    });
    Ember.run.scheduleOnce('afterRender', this.get('messagesListView'), this._scrollToBottom);
  },

  init() {
    this._super();
    this.getStateFromStores();
    MessageStore.addChangeListener(this._onChange.bind(this));
    ThreadStore.addChangeListener(this._onChange.bind(this));
  },

  willDestroy() {
    this._super();
    MessageStore.removeChangeListener(this._onChange);
    ThreadStore.removeChangeListener(this._onChange);
  },

  _onChange() {
    Ember.run.scheduleOnce('actions', this, this.getStateFromStores);
  },

  _scrollToBottom() {
    let element = this.get('element');
    element.scrollTop = element.scrollHeight;
  },

  threadNameView: Flame.LabelView.extend({
    layout: { top: 10, left: 10, right: 10 },
    tagName: 'h3',
    value: Ember.computed.readOnly('parentView.currentThreadName')
  }),

  messagesListView: Flame.ScrollView.extend({
    layout: { top: 40, left: 0, right: 0, bottom: 45 },
    childViews: ['contentView'],

    contentView: Flame.LazyListView.extend({
      allowSelection: false,
      allowReordering: false,
      itemHeight: 60,
      content: Flame.computed.nearest('messages').readOnly(),
      itemViewClass: MessageListItem
    })
  }),

  textFieldView: Flame.TextFieldView.extend({
    isVisible: Ember.computed.bool('parentView.messages').readOnly(),
    layout: { bottom: 10, right: 10, left: 10 },
    action: function() {
      MessageActions.createMessage(this.get('value'));
      this.set('value', '');
    }
  })
});
