# 5w Logger

## How to use

```javascript

...

import * as logger from "5w-logger";

const requestId = req.requestId
const event = getMadeUpEvent()
const context = getMadeUpContext()

const logger = new logger.LogSpan(requestId)

logger.info(`lambda.handler.start`, `Calling Lambda callback.`, `request`, 'SYSTEM', { event, context })
logger.info(`lambda.handler`, `Logs have been parsed and transformed. Ready to push into separate destinations.`, `debug`)
logger.info(`lambda.handler.firehose`, `Pushing logs to Firehose.`, `debug`)
logger.error(`lambda.handler.firehose.catch`, `Could not push logs to Firehose.`, `debug`, system, { error })

// Uh at this point I'm pretty sure you know how to use this... Try it out.

...

```

## Target

Use logging to ease debugging problems, improve security auditing, improve identifying problems in security, make logging compliant to ISO 27002 standard.

Snippet from the Finnish Standards Association SFS's ISO 27002 description:

    "Event logs recording user activities, exceptions, faults and information security events should be produced, kept and regularly reviewed."

Logs should answer to 5W or When (was the activity performed), Whence (the activity originated), Who (or what performed the activity), What (activity was performed), Where (in the system the activity got handled). Each activity should have its own unique identifier to ease the audit trail.

5w Logger is inspired by checkout-logger TypeScript library (https://github.com/CheckoutFinland/checkout-logger)

## Structure


```
{
    "timestamp": "2017-11-08T07:27:04+00:00",
    "level": "info" | "debug" | "error" | "warning",
    "rid": "1232131",
    "type": "person.viewed",
    "message": "the actual content that was logged for magic crap",
    "group": "audit" | "request" | "response" | "debug" | "session" | "security" | "technical",
    "user": "SYSTEM",
    "meta": {
        "some": "info"
    }
}
```

### Timestamp

Well formatted timestamp. Generated automatically.

### Levels

Supported log leves are `info`, `debug`, `error` and `warning`.

* Error: Use when the system has run into a fatal exception that we cannot automatically recover from and require attention from developers.
* Warning: Use for 90% of catch cases and error handling.
* Info: Normal information type logging.
* Debug: General developer friendly spam that is wanted in the logs for common "what the hell just happened" type of solving.

### Request ID

Request ID from headers or request when it's available. Otherwise leave it empty and the Logger will generate a valid UUID-V4 for it.

### Message


Freeform message that should be unique and link you instantly to the case at hand. Requires the use of higher brain functionality to get in place properly. Think of it like well formatted Git commit messages.

### Type

Links the case into a specific place in the system. For example `lambda.image_processing`, `chat_api`, and so on. Again, higher brain functionality should be used when naming this. Does not need to be as unique as RID or Message. It can be a function name from a specific piece of the software or a component name or something similar.

### Group

* There supported log groups are
  * "audit"
  * "request"
  * "response"
  * "debug"
  * "session"
  * "security"
  * "technical"

#### Audit

Used for specific auditing trail purposes. Everything that might require somewhat reasonable auditing trail.

#### Request

Can contain any linking information from the client sent Request. Aims to make the request debugging and observing easier. Make sure to strip out any sensitive inputs or mask them properly.

#### Response

Can contain any linking information from the information sent as Response to the client sent Request. Aims to make the response debugging and observing easier. Make sure to strip out any sensitive inputs or mask them properly.

#### User

This can be a named user or "SYSTEM" to indicate the log row was written by the system and not directly caused by a user doing something.

#### Meta

Meta object. Can be any JSON document that is considered helpful in debugging and needed to maintain sensible logs. Make sure to strip out any sensitive inputs or mask them properly.

