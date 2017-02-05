import os
import re

list = [1,2,2,3,3,3,4,5,5,6,7,7,8,8,9,10,10]
result = []
total = len(list)

for k,v in enumerate(list):
    if k < total - 1 and v == list[k+1]:
        result.append(v)

print result