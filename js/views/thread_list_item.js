import moment from 'moment';

export default Flame.LazyListItemView.extend({
  layout: { height: 60, left: 0, right: 0 },
  childViews: ['threadNameLabel', 'timestampLabel'],

  threadNameLabel: Flame.LabelView.extend({
    layout: { top: 5, left: 10 },
    value: Ember.computed.readOnly('parentView.content.threadName')
  }),

  timestampLabel: Flame.LabelView.extend({
    layout: { top: 25, left: 10 },

    value: Ember.computed('parentView.content.lastTimestamp', function() {
      return moment(this.get('parentView.content.lastTimestamp')).calendar();
    }).readOnly()
  })
});
