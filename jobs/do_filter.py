
import sys
from src.FileWalker import FileWalker
from local.constant_var import paths

walker = FileWalker(paths)
list = walker.getList()

keyword = sys.argv[1]

result = filter(lambda x: keyword.lower() in x['m'].lower(), list)

print('================')
if result:
    for ind, item in enumerate(result):
        print("%s, %s-%s,  %s" % (ind + 1, item['c'], item['i'], item['m']))
else:
    print('No Match Result.')

print('================')