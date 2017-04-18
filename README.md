// to avoid self signed certificate issue
export NODE_TLS_REJECT_UNAUTHORIZED=0

export PATH=$PATH:mongodb/bin

mongod --dbpath mongodb/data


Load and Display Data
---------------------

node --max-old-space-size=4096 clear-all.js

node --max-old-space-size=4096 collect.js

node --max-old-space-size=4096 pick.js

node --max-old-space-size=4096 tohtml.js

