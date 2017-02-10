
import sys
import subprocess
from src.FileWalker import FileWalker
from local.constant_var import paths

walker = FileWalker(paths)
list = walker.getList()

keyword = sys.argv[1]
elem = keyword.split('-')

result = filter(lambda x: elem[0] == x['c'] and elem[1] == x['i'], list)

print('================')
if result:
    for ind, item in enumerate(result):
        print("%s, %s-%s,  %s" % (ind + 1, item['c'], item['i'], item['m']))
    subprocess.call(["open", result[0]['m']])
else:
    print('No Match Result.')

print('================')