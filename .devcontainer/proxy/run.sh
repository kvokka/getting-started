#!/bin/bash

# #mitmproxy
mitmdump \
  --showhost \
  --set confdir=mitmproxy \
  --set flow_detail=3 \
  --verbose \
  --listen-host 0.0.0.0 \
  --listen-port 8888 \
  -s mitm_statsig.py \
  --save-stream-file ../../log/traffic.log
