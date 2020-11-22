const controller = {
    find(req, res, next){
        try {
            res.send({controller: 'category', query: req.query, params: req.params});
        } catch (err) {
            next(err);
        }
    },
    count(req, res, next){
        try {
            res.send({controller: 'category', query: req.query, params: req.params});
        } catch (err) {
            next(err);
        }
    },
    findOne(req, res, next){
        try {
            res.send({controller: 'category', query: req.query, params: req.params});
        } catch (err) {
            next(err);
        }
    },
    create(req, res, next){
        try {
            res.send({controller: 'category', query: req.query, params: req.params, body: req.body});
        } catch (err) {
            next(err);
        }
    },
    update(req, res, next){
        try {
            res.send({controller: 'category', query: req.query, params: req.params, body: req.body});
        } catch (err) {
            next(err);
        }
    },
    delete(req, res, next){
        try {
            res.send({controller: 'category', query: req.query, params: req.params});
        } catch (err) {
            next(err);
        }
    }
}
export default controller;