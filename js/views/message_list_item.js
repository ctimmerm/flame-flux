import moment from 'moment';

const readOnly = Ember.computed.readOnly;

export default Flame.LazyListItemView.extend({
  childViews: ['user', 'message', 'time'],
  layout: { height: 60, left: 0, right: 0 },

  user: Flame.LabelView.extend({
    classNames: 'message-user',
    layout: { left: 20 },
    value: readOnly('parentView.content.user')
  }),

  message: Flame.LabelView.extend({
    classNames: 'message-body',
    layout: { left: 30, top: 30 },
    defaultWidth: null,
    value: readOnly('parentView.content.text')
  }),

  time: Flame.LabelView.extend({
    classNames: 'message-time',
    layout: { right: 15 },
    value: Ember.computed('parentView.content.timestamp', function() {
      return moment(new Date(this.get('parentView.content.timestamp'))).calendar();
    }).readOnly()
  })
});