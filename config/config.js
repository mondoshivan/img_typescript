
const config = {
    server: {
        port: process.env.PORT || 8080
    },
    database: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'admin',
        password: process.env.DB_PASSWORD || 'secret'
    },
    dummyData: {
        Index: [
            {name: 'some name'},
            {name: 'some other name'}
        ]
    }
};

module.exports = config;