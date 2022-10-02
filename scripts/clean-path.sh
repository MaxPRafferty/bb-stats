#!/usr/bin/env bash

sed -i -e 's/href="/href="\/bb-stats/g' docs/index.html
sed -i -e 's/src="/src="\/bb-stats/g' docs/index.html
sed -i -e 's/<\/head>/<script>window.S4_CONSTANTS={isProd: true};<\/script><\/head>/g' docs/index.html
