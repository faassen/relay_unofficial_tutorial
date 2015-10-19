Relay: The Unofficial Tutorial
==============================

**This tutorial is far from done. Do not use**

Introduction
------------

Welcome to the unofficial Relay tutorial! I (Martijn Faassen) created it
because I thought the official Relay tutorial was a bit minimalistic and
at the same time confronts the beginner with too much detail.

This Relay tutorial focuses on using Relay on the *frontend*. We focus
on the core goal of Relay right way: improve how frontend development is
done. For now we're not going to discuss how to implement a
Relay-compliant backend at all.

So let's dive into Relay!

Prerequisites
-------------

We assume you already know JavaScript, including its modern ES6 form,
and know the basics of React.

It's also useful to know some of the basics of GraphQL, though we'll
discuss it a bit here too. Find out more about GraphQL We also assume
you already know the basics of GraphQL. The [GraphQL
README](https://github.com/facebook/graphql/blob/master/README.md) is
a good introduction to GraphQL. A GraphQL tutorial is at
<http://learngraphql.com>

Setting up GraphQL backend
--------------------------

Checking out the sources
------------------------

To run the code in this tutorial, clone a copy of Relay: the
Unofficial Tutorial from
[Github](https://github.com/faassen/relay_unofficial_tutorial/).

Change to its directory with the command-line:

  $ cd relay_unofficial_tutorial

Setting up the backend
----------------------

Once you've checked out the unofficial tutorial you can install the
requirements for the backend using the [npm](http://www.npmjs.com)
package manager:

  $ cd rut-backend

  $ npm install

This installs all the required dependencies listed in its
`package.json`.

The theme of `rut-backend` is that you have a collection of *stories*
that are written by different *authors*. The demo stories are based on
the nonsense poem
[Jabberwocky](https://en.wikipedia.org/wiki/Jabberwocky) by Lewis
Carroll.

The details of how `rut-backend` is implemented are not important for
this tutorial, but we'll describe it briefly: it's an
`express-graphql` server for node that uses the `graphql-js` reference
implementation. The data is just stored in memory for the sake of
simplicity. If you are curious you can read the source code.

Once `npm install` completes, you can start the backend server:

  $ npm start

It exposes a GraphQL HTTP interface on port `8080` of your computer
(`http://localhost:8080`). Don't bother going there with your browser
though: it's not intended for direct human consumption.

Setting up the frontend
-----------------------

Now that the backend is running, we can install the frontend. This is
the HTMl and JavaScript code that will run in your web browser.

The procedure is very similar to how you install and start the
backend. Starting in the `relay_unofficial_tutorial` directory you
go to `rut-frontend`:

  $ cd rut-frontend

And install its requirements:

  $ npm install rut-frontend

While the frontend code runs in your web browser, we still need a server
so you can load it. So the frontend installs *another* web server. You can
start it using:

  $ npm start

After a little while it becomes available at `http://localhost:3000`.

The web server does three things:

* Make sure that the tutorial frontend code is accessible through the
  web. You can see it when you go to `http://localhost:3000`.

* Provide a GraphiQL UI at `http://localhost:3000/graphiql`. Note
  the `i` that makes all the difference! The GraphiQL UI a very nice
  web UI that lets you do queries against an arbitrary GraphQL server
  and explore its schema.

* Proxy the GraphQL HTTP server on port `http://localhost:8080` to
  `http://localhost:3000/graphql`. We merely do this to avoid
  cross-domain access as the browser typically forbids this. If both
  the GraphQL server and the Relay-based client code are hosted on the
  same port number (typically the default port `80`) you wouldn't need
  a proxy like this.

The frontend server bundles JavaScript using
[Webpack](https://webpack.github.io/), but you can use whatever
technology you want to get the correct JavaScript served.

Explore the backend using GraphiQL
----------------------------------

You can easily explore the backend using the GraphiQL UI. Just go to
`http://localhost:3000/graphiql`.

The GraphiQL UI lets you explore a GraphQL server. You can type
GraphQL queries on the left. For instance, you can type:

    {viewer { stories(first: 1) { edges { node { text }}}}}

The query editor automatically validates your query and helps you
auto-complete queries.

You can then execute the query by pressing the arrow in the top bar. On
the right you will see the result of the Query, in this case:

    {
      "data": {
        "viewer": {
          "stories": {
            "edges": [
              {
                "node": {
                  "text": "This is the story of how I saw the frumious Bandersnatch and lived."
                }
              }
            ]
          }
        }
      }
    }

So what did we just do? We wrote a query in the GraphQL language and
sent it to the backend. The backend then responded with the answer. We
asked for the first story available on the backend, and specifically
its text.

GraphQL is a language that lets the frontend author express precisely
what data they want from a backend. It's important to realize that
GraphQL is not a general query language like SQL. Instead it is a very
specific and limited query language that lets you ask only those
questions that the server reports it understands in its *schema*. The
result of a GraphQL query is in JSON and follows the structure of the
query.

GraphQL does not only lets you read data from the server but also
supports mutating that data. We'll get to that later.

When you're in the GraphiQL UI, be sure to click on the `Docs` link
on the top right. It brings up a sidebar that lets you explore the
backend GraphQL schema. This way you can see exactly what fields it
exposes.

Try changing the `1` to the query to a larger number to request more
stories. Also try this query to ask for author names for stories instead:

    {viewer { stories(first: 1) { edges { node { author { name }}}}}}

The frontend app
----------------

The frontend app is at `http://localhost:3000`. It shows first few
stories on the server, with a *more* button at the bottom to load
additional ones.
