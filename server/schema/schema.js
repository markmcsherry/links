"use strict";
const graphql = require('graphql');
const _ = require('lodash');
const linkModel = require('../models/link.js');
var userModel = require('../models/user.js');
var tagModel = require('../models/tag.js');


const {
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLID, 
  GraphQLInt, 
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} = graphql;


const LinkType = new GraphQLObjectType({
  name: 'Link',
  fields:() => ({
    id: {type: GraphQLID},
    URL: {type: GraphQLString},
    description: {type: GraphQLString},
    userId: {type: GraphQLString},
  })
});


const TagType = new GraphQLObjectType({
  name: 'Tag',
  fields:() => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    colorCode: {type: GraphQLString},
  })
});


const UserType = new GraphQLObjectType({
  name: 'User',
  fields:() => ({
    id: {type: GraphQLID},
    userName: {type: GraphQLString},
    email: {type: GraphQLString},
    firstName: {type: GraphQLString},
    lastName: {type: GraphQLString},
    password: {type: GraphQLString},
    avatar: {type: GraphQLString},
    active: {type: GraphQLBoolean},
  })
});




const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return userModel.findById(args.id);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return userModel.find();
      }
    },
    link: {
      type: LinkType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return linkModel.findById(args.id);
      }
    },
    links: {
      type: new GraphQLList(LinkType),
      resolve(parent, args) {
        return linkModel.find();
      }
    },
    tag: {
      type: TagType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db / other source
        return tagModel.findById(args.id);
      }
    },
    tags: {
      type: new GraphQLList(TagType),
      resolve(parent, args) {
        return tagModel.find();
      }
    }
  }
});  


const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        userName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        avatar: { type: new GraphQLNonNull(GraphQLString) },
        active: { type: new GraphQLNonNull(GraphQLBoolean) }
      },
      resolve(parent, args) {
        var user = new userModel({
          userName: args.userName,
          email: args.email,
          firstName: args.firstName,
          lastName: args.lastName,
          password: args.password,
          avatar: args.avatar,
          active: args.active
        });
        return user.save();
      }
    },
    addLink: {
      type: LinkType,
      args: {
        URL: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        var link = new linkModel({
          URL: args.URL,
          description: args.description,
          userId: args.userId
        });
        return link.save();
      }
    },
    addTag: {
      type: TagType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        colorCode: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let tag = new tagModel({
          name: args.name,
          description: args.description,
          colorCode: args.colorCode
        });
        return tag.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});