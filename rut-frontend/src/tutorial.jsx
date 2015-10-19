import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

class Story extends React.Component {
    render() {
        const {story} = this.props;
        return (
            <div>{story.author.name}: {story.text}</div>
        );
    }
}

const StoryContainer = Relay.createContainer(Story, {
    fragments: {
        story: () => Relay.QL`
        fragment on Story {
            id
            text
            author {
              name
            }
        }
        `
    }
});

class Stories extends React.Component {
    render() {
        const stories = this.props.viewer.stories;
        return (
            <div>
                <ul>
                    {stories.edges.map(edge => {
                        return (
                            <li key={edge.__dataID__}>
                            <StoryContainer story={edge.node} />
                            </li>
                        );
                     })}
                </ul>
                {stories.pageInfo.hasNextPage ?
                 <div>
                   <a onClick={()=> this.more()}>More...</a>
                 </div> :
                 null
                 }
            </div>
        );
    }
    more() {
        this.props.relay.setVariables({
            first: this.props.relay.variables.first + 10
        });
    }
}


const StoriesContainer = Relay.createContainer(Stories, {
    fragments: {
        viewer: () => Relay.QL`
              fragment on Viewer {
                stories: stories(first: $first) {
                  edges {
                    node {
                      ${StoryContainer.getFragment('story')}
                    }
                  }
                  pageInfo {
                    hasNextPage
                  }
                }
              }`
    },
    initialVariables: {
        first: 10
    }
});

class ViewerRoute extends Relay.Route {
}

ViewerRoute.queries = {
    viewer: () => Relay.QL`
        query {
            viewer
        }
        `
};

ViewerRoute.routeName = 'ViewerRoute';
const route = new ViewerRoute();

window.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Relay.RootContainer
          Component={StoriesContainer}
          route={route}
        />,
        document.getElementById('root')
    );
});

