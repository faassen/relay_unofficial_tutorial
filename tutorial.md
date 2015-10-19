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

To get started, you need to install the unofficial relay tutorial
server.

You then need to start it up using:

    $ npm start

It exposes a GraphQL HTTP interface on port 8080. Don't bother going
there with your browser though: it's not intended for direct human
usage.

Instead all the unofficial Relay tutorial client. You can start it up
using:

    $ npm start

in its own directory.

Setting up the GraphQL frontend
-------------------------------

This sets up the code that runs in your web browser: the frontend. It
actually does this by running *another* web server, on
http://localhost:3000.

This server is only there to make the client work: *something* needs to
provide the HTML, CSS and JavaScript that you see in your web
application. It could be using any front-end packaging solution and
server backend you prefer. This one uses Webpack and the Webpack dev
server. This web server does three things:

-   Make sure that the right HTML and JavaScript can be loaded for your
    Relay application. You can see it when you go to
    http://localhost:3000.
-   proxy the GraphQL server on port 8080 to
    http://localhost:3000/graphql. We merely do this to avoid
    cross-domain access. If both the GraphQL server and the Relay-based
    client code are hosted on the same port number (typically the
    default port 80) you don't need to do this.
-   Provide a GraphiQL UI at http://localhost:3000/graphiql. Note the i
    that makes all the difference! The GraphiQL UI a very nice web UI
    that lets you do queries against an arbitrary GraphQL server and
    explore its schema.

Explore the backend using GraphiQL
----------------------------------

You can easily explore the backend using GraphiQL. Just go to
http://localhost:3000/graphiql. You can first explore the schema using
the sidebar on the right. You can also type in queries in the main panel
and execute them. Note that it has auto-completion that helps you write
the correct queries for the backend!

The frontend app
----------------

The frontend app is at http://localhost:3000. It shows first few stories
on the server, with a *more* button at the bottom to load additional
ones.
