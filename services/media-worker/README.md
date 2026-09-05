# Media Worker

Independently deployable media-processing service boundary.

Intended responsibilities:
- transcode/proxy generation
- thumbnail generation
- metadata extraction
- export rendering
- asynchronous media jobs

Authorization decisions remain server-authoritative outside the worker; the worker consumes signed/validated job contracts.
