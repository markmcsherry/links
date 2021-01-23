"use strict";
const graphql = require('graphql');
const _ = require('lodash');
const linkModel = require('../models/link.js');
//var userModel = require('../models/user.js');
var tagModel = require('../models/tag.js');



const {
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLID, 
  GraphQLInt, 
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
/*    books: {
      type: new GraphQLList(BookType),
      resolve(parent,args){
//        return _.filter(books, {authorId: parent.id});
        return Book.find({authorID: parent.id});
      }

    } */
  })
});



const TagType = new GraphQLObjectType({
  name: 'Tag',
  fields:() => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    colorCode: {type: GraphQLString},
/*
    author:{
      type: AuthorType,
      resolve(parent, args){
//        return _.find(authors, {id:parent.authorId});
          return Author.findById(parent.authorId);
      }
    }*/
  })
});
/*
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields:() => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve(parent,args){
//        return _.filter(books, {authorId: parent.id});
        return Book.find({authorID: parent.id});
      }

    }
  })
});
*/



const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
      link: {
          type: LinkType,
          args: {id: {type: GraphQLID}},
          resolve(parent, args){
            return linkModel.findById(args.id);
          }  
      },
      links: {
        type: new GraphQLList(LinkType),
        resolve(parent, args){
          return linkModel.find();
        }
      },  
      tag: {
        type: TagType,
          args: {id: {type: GraphQLID}},
          resolve(parent, args){
            //code to get data from db / other source
            return tagModel.findById(args.id);
          }  
        },
      tags:{
        type: new GraphQLList(TagType),
        resolve(parent, args){
          return tagModel.find();
        }
      }

      /*      author: {
        type: AuthorType,
          args: {id: {type: GraphQLID}},
          resolve(parent, args){
            //code to get data from db / other source
//            return _.find(authors,{ id: args.id});
            return Author.findById(args.id);
          }  
        },*/
/*  
      authors:{
        type: new GraphQLList(AuthorType),
        resolve(parent, args){
//          return authors
          return Author.find();
        }
      }*/

    }

});  
/*
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
      addAuthor: {
          type: AuthorType,
          args: {
              name: { type: new GraphQLNonNull(GraphQLString) },
              age: { type: new GraphQLNonNull(GraphQLInt) }
          },
          resolve(parent, args){
              var author =  new Author({
                  name: args.name,
                  age: args.age
              });
              return author.save();
          }
      },
      addBook: {
          type: BookType,
          args: {
              name: { type: new GraphQLNonNull(GraphQLString) },
              genre: { type: new GraphQLNonNull(GraphQLString) },
              authorId: { type: new GraphQLNonNull(GraphQLID) }
          },
          resolve(parent, args){
              let book = new Book({
                  name: args.name,
                  genre: args.genre,
                  authorId: args.authorId
              });
              return book.save();
          }
      }
  }
});
*/
module.exports = new GraphQLSchema({
  query: RootQuery
//  mutation: Mutation
});