// require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const { createStore } = require('./utils');

const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');

const store = createStore();

const server = new ApolloServer({ 
    typeDefs,
    dataSources: () => ({
        launchAPI: new LaunchAPI(),
        /*If you use this.context in a datasource, it's critical to create a new instance in the dataSources function, rather than sharing a single instance. Otherwise, initialize might be called during the execution of asynchronous code for a particular user, replacing this.context with the context of another user.*/
        userAPI: new UserAPI({ store })
    })
 });

server.listen().then(() => {
    console.log(`
        Server is running!
        Listenning on port 4000
        Explore at https://studio.apollographql.com/dev
    `);
});
