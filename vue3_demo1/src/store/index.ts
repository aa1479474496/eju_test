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
// export interface Modules {
//     [key: string]: any;
// }
export type Modules = {
    [key: string]: any;
}


let modules: Modules = {}
for (const path in modulesFiles) {
    const moduleName: string = path.replace(/(.*\/)*([^.]+).*/gi, '$2')
    const value = modulesFiles[path]
    modules[moduleName] = value.default
}

const store = createStore({
    modules
})

export default store

