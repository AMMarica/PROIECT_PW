const {
    Users
} = require('../data');

const {
    generateToken,
} = require('../security/Jwt');

const {
    ServerError
} = require('../errors');

const {
    hash,
    compare
} = require('../security/Password');

const addUser = async (username, password, name, email) => {
    const hashedPassword = await hash(password);
    let role = '';
    if (username === 'admin') {
        role = 'admin';
    } else if (username === 'tehnic') {
        role = 'tehnic';
    } else {
        role = 'user';
    }
    const user = new Users({
        username,
        password: hashedPassword,
        name,
        email,
        role
    });
    await user.save();
    return user._id;
};

const confirmUser = async (id) => {
    await Users.findByIdAndUpdate(id, { confirmed: true });
}

const authenticate = async (username, password) => {

    const user_username = await Users.findOne({ username: username });
    const user_email = await Users.findOne({ email: username });
    if (user_username === null && user_email === null) {
        throw new ServerError(`User registered with ${username} doesn't exist!`, 404);
    }

    user = null
    if (user_username) {
        user = user_username;
    } else{
        user = user_email;
    }

    if (!user.confirmed) {
        throw new ServerError(`Please, confirm your email!`, 404);
    }
    
    if (await compare(password, user.password)) {
        return await generateToken({
            userId: user._id,
            userRole: user.role
        });
    } 
    throw new ServerError("Username or password are not correct!", 404);
};

const getUsers = async () => {
    return await Users.find();
}

const deleteById = async (id) => {
    await Users.findByIdAndDelete(id);
};

module.exports = {
    addUser,
    confirmUser,
    authenticate,
    getUsers,
    deleteById
}