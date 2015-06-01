import AppDispatcher from '../dispatcher/dispatcher';
import ActionTypes from '../constants/action_types';

export default {
  selectThread(thread) {
    AppDispatcher.dispatch({
      type: ActionTypes.SELECT_THREAD,
      threadID: thread.id
    });
  }
};
