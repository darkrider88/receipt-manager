# Receipt-manager
To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

# Overview

This is a small client service which is used to get the Reciept of a user.
Steps:
1. First User enters his info: Id, Password, Receipt id to fetch
2. Using these info, an authentication token is fetched.
3. This authentication token is stored in a in-memory cache.
4. After that, this token is consumed by a Receipt service.
5. This Receipt service fetches the receipt with the corresponding id and return it
6. The data is consumed by the controller, which calls another storage service.
7. Storage service is used to write the Receipt data to a JSON file.

NOTE: Whatever code is written here, is fully working. You can run it, and the APIs are mocked.

# What could have been done better?
Due to time limitations I was not able to implement everything, but below are the few points which I think could improved.

1. Firstly, if it is an enterprise application we should include a good logging mechanism which should be asynchronous e.g. Winston.
2. We could introduce a Retry mechanism to handle failures of API.
3. Tokens can be stored in Redis, to reduce the time and improve efficiency.


## Data transformation

I was not really sure about what other data an API could send, here I am just storing the actual data sent by API as receipt data. But in real world scenario we could get a lot of data which may not be useful to us. 
So we could introduce some type of data parser/extractor, which can find out the relevant data from any amount of nested json.
That data extractor should have some stored knowledge about the probable keys we need and then we can iterate the data fetched and search for those keys and values.
This extractor should also have some regex patterns matching which I think would be faster to pull out the relevant data.


# Phase 1 - Reverse Engineering

I was not that much successful in this phase, the main issue was that I was able to find out all the APIs, its body, and the baseURL, but when I tried to send the api request through postman I was getting 404.

I have attached the link below of what I have tried. More we can discuss on the call what I had tried.

https://www.notion.so/Numerator-Marionnaud-2321d28098a180a9a35ff2797dcce6b7?source=copy_link


