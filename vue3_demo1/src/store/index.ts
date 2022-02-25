// import { createStore } from 'vuex'


// const modulesFiles = require.context('./modules', true, /\.js$/)
// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//     const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
//     const value = modulesFiles(modulePath)
//     modules[moduleName] = value.default
//     return modules
// }, {})

// const store = createStore({
//     modules
// })

// export default store;


import { createStore } from 'vuex'

// https://vitejs.dev/guide/features.html#glob-import
const modulesFiles = import.meta.globEager('./modules/*.ts')

let modules = {}
for (const path in modulesFiles) {
    console.log('path', path);
  const moduleName = path.replace(/(.*\/)*([^.]+).*/gi, '$2')
//   modules = { ...modules, ...modulesFiles[path] }
console.log('moduleName:', moduleName);

    const value = modulesFiles[path]
    modules[moduleName] = value.default

}

console.log('modules::', modules);

const store =  createStore({
  modules
})

export default store

