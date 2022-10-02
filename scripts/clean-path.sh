#!/usr/bin/env bash

sed -i -e 's/href="/href="\/s4/g' docs/index.html
sed -i -e 's/src="/src="\/s4/g' docs/index.html
sed -i -e 's/<\/head>/<script>window.S4_CONSTANTS={isProd: true};<\/script><\/head>/g' docs/index.html
