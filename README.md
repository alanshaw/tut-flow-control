# Flow control utilities - callbacks, promises, async, events

This live coding session is designed to show the fundamentals of async in node/javascript.

Attack in this order:

## /async

Step by step code showing how to manage multiple parallel async operations that don't depend on each other.

The module is an express style request handler function that must return a JSON object. The handler handles a search request, returning the logged in user profile, a bunch of promotional items and the search results for the given keyword.

Eventually we pull out a generic `async.parallel` clone module that when given a set of tasks will call a callback function when they're all done.

## /promises

Demonstrates from a similar starting point as `/async` how to manage the async operations using the `q` library.
