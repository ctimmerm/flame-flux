import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/dispatcher';
import BaseStore from './base_store';
import ThreadStore from './thread_store';
import ActionTypes from '../constants/action_types';

let _messages = [];

const MessageStore = Object.assign(new EventEmitter(), BaseStore, {
  getMessagesForCurrentThread() {
    let currentThread = ThreadStore.getCurrent();
    if (!currentThread) return [];
    return _messages.filter(message => message.threadID === currentThread.id);
  }
});

AppDispatcher.register(action => {
  AppDispatcher.waitFor([ThreadStore.dispatchToken]);

  switch(action.type) {
    case ActionTypes.RECEIVE_MESSAGES:
      _messages = action.messages;
      MessageStore.emitChange();
      break;
    case ActionTypes.SELECT_THREAD:
      MessageStore.emitChange();
      break;
    case ActionTypes.CREATE_MESSAGE:
      let currentThread = ThreadStore.getCurrent();
      _messages.push({
        text: action.text,
        threadID: currentThread.id,
        threadName: currentThread.threadName,
        user: 'Foo',
        timestamp: Date.now()
      });
      MessageStore.emitChange();
      break;
  }
});

export default MessageStore;
