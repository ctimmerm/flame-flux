import assign from 'object-assign';
import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/dispatcher';
import BaseStore from './base_store';
import ActionTypes from '../constants/action_types';

let _threads = {};
let _currentID = null;

const ThreadStore = assign(new EventEmitter(), BaseStore, {
  getAll() {
    let threads = [];
    for (let id in _threads) {
      threads.push(_threads[id]);
    }
    return threads;
  },

  getCurrent() {
    return _threads[_currentID];
  }
});

ThreadStore.dispatchToken = AppDispatcher.register(action => {
  switch(action.type) {
    case ActionTypes.RECEIVE_MESSAGES:
      action.messages.forEach(message => {
        _threads[message.threadID] = _threads[message.threadID] || {};
        const thread = _threads[message.threadID];
        thread.threadName = message.threadName;
        thread.id = message.threadID;
        thread.lastMessage = message.text;
        thread.lastTimestamp = message.timestamp;
      });
      ThreadStore.emitChange();
      break;
    case ActionTypes.SELECT_THREAD:
      _currentID = action.threadID;
      ThreadStore.emitChange();
      break;
    case ActionTypes.CREATE_MESSAGE:
      const thread = _threads[_currentID];
      Ember.set(thread, 'lastMessage', action.text);
      Ember.set(thread, 'lastTimestamp', action.timestamp);
      ThreadStore.emitChange();
      break;
  }
});

export default ThreadStore;
