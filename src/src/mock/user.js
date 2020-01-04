const mock =require("mockjs");
let Random = mock.Random;
Random.extend({
    typelx: function(icon) {
        var typelx = ['admin', 'user', 'guess', 'superadmin']
        return this.pick(typelx)
    }
})
Random.typelx();

let userDate =mock.mock({
    'user':{
        'id': "@id",
        "name": '@cname',
        "email":"@email",
        "username":"@last",
        "type":'@typelx'
    }
})

module.exports = {

    [`GET /api/user/`](req, res) {
        res.status(200).json({data:userDate})
    }
}