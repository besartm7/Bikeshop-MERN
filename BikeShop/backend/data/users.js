import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'besart-admin',
        email: 'besart@hotmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'besart',
        email: 'besart2@hotmail.com',
        password: bcrypt.hashSync('123456', 10)
    }
]

export default users;