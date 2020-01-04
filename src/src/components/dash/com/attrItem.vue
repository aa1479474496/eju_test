<script>
import Vue from 'vue'
export default {
  render: function(createElement) {
    let _type = bi.dash.currItem.type;
    let _conf = bi.dash.components[_type];
    let _node = bi.dash.components[_type]['attr'] || {name: _type + 'Attr', file: _type};
    let _module = require ('@/components/dash/attr/' + _node.file);
    bi.log('createDashAttr:' + _type + ':' + _node.name);
    Vue.component(_node.name, _module.default);

    return createElement(
      'div',
      {
        attrs: {
          class: ''
        }
      },
      [
        createElement(_node.name)
      ]
    );
  }
};
</script>