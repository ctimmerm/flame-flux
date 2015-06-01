import AppDispatcher from './dispatcher/dispatcher';
import ActionTypes from './constants/action_types';
import ThreadList from './views/thread_list';
import MessageList from './views/message_list';

window.App = Ember.Application.create();

App.RootView = Flame.View.extend({
  layout: { width: 960, height: 500, centerY: -75, centerX: 0 },
  classNames: 'root',
  childViews: ['threadList', 'messageList'],

  threadList: Flame.ScrollView.extend({
    layout: { width: 250, top: 0, bottom: 0 },
    classNames: 'list',
    childViews: ['contentView'],

    contentView: ThreadList
  }),

  messageList: MessageList.extend({
    layout: { left: 250, top: 0, bottom: 0, right: 0 }
  })
});

// Push some data to the stores
let messages = [
  { id: 1, text: 'This is the first message', threadID: 1, threadName: 'Baz', user: 'Foo', timestamp: Date.now() - 20000 },
  { id: 2, text: 'This is the second message', threadID: 1, threadName: 'Baz', user: 'Bar', timestamp: Date.now() - 3000 },
  { id: 2, text: 'This is a message in another thread', threadID: 2, threadName: 'Quux', user: 'Bar', timestamp: Date.now() - 1000 }
];

AppDispatcher.dispatch({
  type: ActionTypes.RECEIVE_MESSAGES,
  messages
});
