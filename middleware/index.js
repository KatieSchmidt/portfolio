function loggedOut(req, res, next){
	if (req.session && req.session.userId){
		return res.redirect('/');
	}
	return next();
}

function requiresLogin(req, res, next) {
	if (req.session && req.session.userId){
		return next()
	} else {
		var err = new Error('You must be logged in to view this content');
		err.status = 401;
		return next(err);
	}
}

module.exports.requiresLogin = requiresLogin;
module.exports.loggedOut = loggedOut;