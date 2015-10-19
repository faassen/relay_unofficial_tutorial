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
    getStories() {
        const {previousStories, nextStories} = this.props.viewer;
        if (previousStories.edges.length) {
            return previousStories;
        } else {
            return nextStories;
        }
    }
    render() {
        const stories = this.getStories();
        let hasPrevious = false;
        let hasNext = false;
        if (this.props.relay.variables.wantPrevious) {
            hasPrevious = this.props.viewer.previousStories.pageInfo.hasPreviousPage;
            hasNext = true;
        } else {
            // if the after variable is null, we don't have previous
            // otherwise, we always do as we just got the next batch
            hasPrevious = this.props.relay.variables.after !== null;
            hasNext = this.props.viewer.nextStories.pageInfo.hasNextPage;
        }
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
                <div>
                    {hasPrevious ? <a onClick={()=> this.previous()}>Previous</a> : null}
                    &nbsp;
                    {hasNext ? <a onClick={() => this.next()}>Next</a> : null}
                </div>
            </div>
        );
    }
    previous() {
        const stories = this.getStories();
        this.props.relay.setVariables({
            first: null,
            after: null,
            last: 10,
            before: stories.pageInfo.startCursor,
            wantPrevious: true,
            wantNext: false
        });
    }
    next() {
        const stories = this.getStories();
        this.props.relay.setVariables({
            last: null,
            before: null,
            first: 10,
            after: stories.pageInfo.endCursor,
            wantPrevious: false,
            wantNext: true
        });
    }
}


const StoriesContainer = Relay.createContainer(Stories, {
    fragments: {
        viewer: () => Relay.QL`
              fragment on Viewer {
                previousStories: stories(last: $last before: $before) @include(if: $wantPrevious) {
                  edges {
                    cursor
                    node {
                      ${StoryContainer.getFragment('story')}
                    }
                  }
                  pageInfo {
                    startCursor
                    endCursor
                    hasPreviousPage
                    hasNextPage
                  }
                }
                nextStories: stories(first: $first after: $after) @include(if: $wantNext) {
                  edges {
                    cursor
                    node {
                      ${StoryContainer.getFragment('story')}
                    }
                  }
                  pageInfo {
                    startCursor
                    endCursor
                    hasPreviousPage
                    hasNextPage
                  }
                }
              }`
    },
    initialVariables: {
        first: 10,
        last: null,
        before: null,
        after: null,
        wantPrevious: false,
        wantNext: true
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

