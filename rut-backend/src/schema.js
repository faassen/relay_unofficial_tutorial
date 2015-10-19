import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
} from 'graphql-relay';

import {
  Author,
  Story,
  getAuthor,
  getStory,
  getViewer
} from './database';

const {nodeInterface, nodeField} = nodeDefinitions(
  globalId => {
    const {type, id} = fromGlobalId(globalId);
    if (type === 'Story') {
      return getStory(id);
    } else if (type === 'Author') {
      return getAuthor(id);
    } else {
      return null;
    }
  },
  obj => {
    if (obj instanceof Story) {
      return storyType;
    } else if (obj instanceof Author) {
      return authorType;
    } else {
      return null;
    }
  }
);

const authorType = new GraphQLObjectType({
  name: 'Author',
  description: 'An author',
  fields: () => ({
    id: globalIdField('Author'),
    name: {
      type: GraphQLString,
      description: 'The name of the author.'
    }
  }),
  interfaces: [nodeInterface]
});

const storyType = new GraphQLObjectType({
  name: 'Story',
  description: 'A story',
  fields: () => ({
    id: globalIdField('Story'),
    text: {
      type: GraphQLString,
      description: 'The text of the story.'
    },
    author: {
      type: authorType,
      description: 'The author of the story.'
    }
  }),
  interfaces: [nodeInterface]
});

const {connectionType: storyConnection} = connectionDefinitions({
  name: 'Story', nodeType: storyType});

const viewerType = new GraphQLObjectType({
    name: 'Viewer',
    description: 'Viewer',
    fields: () => ({
        stories: {
            type: storyConnection,
            description: "The stories known by the application.",
            args: connectionArgs,
            resolve: (viewer, args) => connectionFromArray(viewer.stories,
                                                           args)
        }
    })
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    viewer: {
      type: viewerType,
      resolve: () => getViewer()
    }
  })
});

export const Schema = new GraphQLSchema({
  query: queryType,
  node: nodeField
});
