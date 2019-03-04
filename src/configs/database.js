var database = {
    development: {
        username: process.env.DATABASE_USERNAME_DEV || 'root',
        password: process.env.DATABASE_PASSWORD_DEV || '1234567890',
        database: process.env.DATABASE_NAME_DEV || 'lottery',
        host: process.env.DATABASE_HOST_DEV || '192.168.20.36',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 1000
        }
    },
    production: {
        username: process.env.DATABASE_USERNAME_PRO || 'root',
        password: process.env.DATABASE_PASSWORD_PRO || '1234567890',
        database: process.env.DATABASE_NAME_PRO || 'lottery',
        host: process.env.DATABASE_HOST_PRO || '192.168.20.36',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 1000
        }
    }
}

module.exports = database