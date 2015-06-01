import AppDispatcher from '../dispatcher/dispatcher';
import ActionTypes from '../constants/action_types';

export default {
  createMessage(text) {
    AppDispatcher.dispatch({
      type: ActionTypes.CREATE_MESSAGE,
      text: text,
      timestamp: Date.now()
    });
  }
};
