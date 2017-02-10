from src.FileWalker import FileWalker
from local.constant_var import paths

walker = FileWalker(paths)
list = walker.getList()

print("generating the duplication list: ")

result = []
end = len(list) - 1

for oneIndex, oneItem in enumerate(list):
    if oneIndex < end and oneItem['c'] == list[oneIndex + 1]['c'] and oneItem['i'] == list[oneIndex + 1]['i']:
        result.append(oneItem)
        result.append(list[oneIndex + 1])

print('================')
if result:
    for ind, item in enumerate(result):
        print("%s, %s-%s,  %s" % (ind + 1, item['c'], item['i'], item['m']))
else:
    print('No Dup Result.')
print('================')