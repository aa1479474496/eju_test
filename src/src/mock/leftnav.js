const mock = require('mockjs')
let Random = mock.Random;
Random.extend({
    menuicon: function(icon) {
        var menuicon = ['el-icon-menu', 'el-icon-info', 'el-icon-message', 'el-icon-edit-outline', 'el-icon-edit', 'el-icon-document', 'el-icon-setting', 'el-icon-upload']
        return this.pick(menuicon)
    }
})
Random.menuicon();

let menuData =mock.mock({
    'menudata|5-10':[{
        'id|+1': 1,
        "icon": '@menuicon',
        "name": '@name',
        "title":'@ctitle(2,4)',
        'subMenus|2-3':[{
            "id": '@id',
            "name": '@name',
            "title":'@ctitle(2,4)'
        }]
    }]
})


module.exports = {

    [`POST /api/left/edit`](req, res) {
        res.status(200).json({data:menuData})
    },
    [`GET /api/left/list`](req, res) {
        res.status(200).json({data:menuData})
    }
}