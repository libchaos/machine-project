#!/usr/bin/env python

import re
def filterPid(res):
    res_pid = []
    pids = re.findall(r'(?<=\<).+?(?=\>)', res)
    for pid in pids:
        res_pid.append(pid)

    return res_pid