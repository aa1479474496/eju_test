import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/account",
      name: "account",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Account.vue")
    },

    {
      path: "/table",
      name: "table",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "table" */ "./views/Table.vue")
    },

    {
      path: "/loading",
      name: "loading",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "Loading" */ "./views/Loading.vue")
    },
    {
      path: "/searchIndex",
      name: "searchIndex",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "searchIndex" */ "./views/SearchIndex.vue")
    },
    {
      path: "/SearchPage2",
      name: "SearchPage2",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "SearchPage2" */ "./views/SearchPage2.vue")
    },

    {
      path: "/SearchPage3",
      name: "SearchPage3",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "SearchPage3" */ "./views/SearchPage3.vue")
    },
    {
      path: "/SearchPage4",
      name: "SearchPage4",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "SearchPage4" */ "./views/SearchPage4.vue")
    },
    {
      path: "/toggleheight",
      name: "toggleheight",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(
          /* webpackChunkName: "ToggleHeight" */ "./views/ToggleHeight.vue"
        )
    },

    {
      path: "/animation",
      name: "animation",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(
          /* webpackChunkName: "Animation" */ "./views/Animation/index.vue"
        )
    },
    {
      path: "/picker",
      name: "picker",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "picker" */ "./views/Picker/index.vue")
    },

    {
      path: "/skeleton",
      name: "skeleton",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "skeleton" */ "./views/Skeleton.vue")
    },

    {
      path: "/scroll",
      name: "scroll",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "scroll" */ "./views/TestScroll.vue"),

      // TestScrollPageB.vue
      children: [
        {
          path: "/scroll/a",
          name: "scrollA",
          component: () =>
            import(
              /* webpackChunkName: "scroll" */ "./views/TestScrollPageA.vue"
            )
        },
        {
          path: "/scroll/B",
          name: "scrollB",
          component: () =>
            import(
              /* webpackChunkName: "scroll" */ "./views/TestScrollPageB.vue"
            )
        },
        {
          path: "/scroll/C",
          name: "scrollC",
          component: () =>
            import(
              /* webpackChunkName: "scroll" */ "./views/TestScrollPageC.vue"
            )
        }
      ]
    },

    {
      path: "/map",
      name: "map",
      redirect: '/map/basic',
      component: () =>
        import(/* webpackChunkName: "map" */ "./views/map/index.vue"),
      children: [
        {
          path: "/map/basic",
          name: 'map_basic',
          component: () =>
            import(/* webpackChunkName: "map" */ "./views/map/basic/index.vue"),
        }
      ]
    },

    {
      path: "/ckeditor",
      name: "ckeditor",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/CkEditor/index.vue")
    },

    {
      path: '/drag',
      name: 'drag',
      component: () =>
        import(/* webpackChunkName: "drag" */ "./views/Drag/index.vue")
    },

    {
      path: "/testckeditor",
      name: "testckeditor",
      component: () =>
        import(/* webpackChunkName: "testckeditor" */ "@/components/ckeditor/index.vue")
    },
    {
      path: "/testtable",
      name: "testtable",
      component: () =>
        import(/* webpackChunkName: "testckeditor" */ "./views/ElTable/index.vue")
    },

    {
      path: "/handsontable",
      name: "handsontable",
      component: () =>
        import(/* webpackChunkName: "handsontable" */ "./views/HandsonTable/index.vue"),

      children: [
        {
          path: "/handsontable/test1",
          name: "handsontabletest1",
          component: () =>
            import(/* webpackChunkName: "handsontable" */ "./views/HandsonTable/test1.vue"),
        },
        {
          path: "/handsontable/test2",
          name: "handsontabletest2",
          component: () =>
            import(/* webpackChunkName: "handsontable" */ "./views/HandsonTable/test2.vue"),
        },
        {
          path: "/handsontable/test3",
          name: "handsontabletest3",
          component: () =>
            import(/* webpackChunkName: "handsontable" */ "./views/HandsonTable/test3.vue"),
        },
        {
          path: "/handsontable/test4",
          name: "handsontabletest4",
          component: () =>
            import(/* webpackChunkName: "handsontable" */ "./views/HandsonTable/test4.vue"),
        },
        {
          path: "/handsontable/test5",
          name: "handsontabletest5",
          component: () =>
            import(/* webpackChunkName: "handsontable" */ "./views/HandsonTable/test5.vue"),
        },
        {
          path: "/handsontable/test6",
          name: "handsontabletest6",
          component: () =>
            import(/* webpackChunkName: "handsontable" */ "./views/HandsonTable/test6.vue"),
        }
      ]
    },

    {
      path: '/attrs',
      name: 'attrs',
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Attrs/index.vue"),
      children: [
        {
          path: "/attrs",
          name: "attrs",
          component: () =>
            import(
                /* webpackChunkName: "scroll" */ "./views/Attrs/attrs/index.vue"
            )
        }
      ]
    },
  ]
});
