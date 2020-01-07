var components = {};

components.navcom = {
  template: `<div>nav{{navText}}</div>`,
  props: {
    navText: {
      type: String,
      default: "te"
    }
  }
};

components.navvv = {
  template: `<div>
  <p>main</p>
  <navcom navText="123"></navcom>
    </div>`,
  components: {
    navcom: components.navcom
  }
};

let count = {
  data: function() {
    return {
      count: 0
    };
  },
  template:
    '<button v-on:click="count++">You clicked me {{ count }} times123.</button>'
};

Vue.component("button-counter", count);

Vue.component("navvv", components.navvv);

// Vue.component;
