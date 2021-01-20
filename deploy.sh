#!/bin/bash

scp /home/y/code/nakama/data/modules/index.js root@sb.2tt.io:/root/sportsbingo/modules

ssh root@sb.2tt.io 'cd /root/sportsbingo && docker-compose restart nakama'
