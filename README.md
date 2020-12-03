An example node.js app for fast compilation as part of an OCP demo

Usage:

You can build this repo directly using the S2I Builder Images in OpenShift, tested with Node 12.

The app static serves files from images, scripts and styles

/dbcreate is an example DB creation endpoint, requires a MYSQL Pod in the same namespace and ENV setup accordingly

/env is a single env variable lookup, i.e. (route)/env?name=THEENV)

/envs returns an HTML component with all the ENVs visible

/nasa does a JSON call to the NASA site to get the image of the day plus text; the root page provides this as a JQuery async lookup