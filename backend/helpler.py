#!/usr/bin/env python

import re
def filterPid(res):
    res_pid = []
    pids = re.findall(r'(?<=\<).+?(?=\>)', res)
    for pid in pids:
        res_pid.append(pid)

    return res_pid


class Eval:
    def __init__(self, pred_right_num=0., pred_num=0., gold_num=0.):
        self.pred_right_num = pred_right_num
        self.pred_num = pred_num
        self.gold_num = gold_num
        if self.pred_num != 0:
            self.P = self.pred_right_num / self.pred_num
        else:
            self.P = 0
        if self.gold_num != 0:
            self.R = self.pred_right_num / self.gold_num
        else:
            self.R = 0
        if self.P + self.R != 0:
            self.F1 = 2*self.P*self.R / (self.P + self.R)
        else:
            self.F1 = 0
        self.P = "%.4f" % self.P
        self.R = "%.4f" % self.R
        self.F1 = "%.4f" % self.F1
        self.P_R_F1 = [float(self.P), float(self.R), float(self.F1)]







