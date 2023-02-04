const jwt = require("jsonwebtoken");

class TokenService {
    generateAccess(id, login, role) {
        return jwt.sign({ id, login, role }, process.env.SECRET_KEY, {
            expiresIn: "24h",
        });
    }

    generateJWT(id, login, role) {
        return jwt.sign({ id, login, role }, process.env.SECRET_KEY, {
            expiresIn: "10s",
        });
    }

    validateJWT(token) {
        try {
            const userData = jwt.verify(token, process.env.SECRET_KEY);
            return userData;
        } catch (e) {
            return null;
        }
    }
}

module.exports = new TokenService();
