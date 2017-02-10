from src.FileWalker import FileWalker
from local.constant_var import paths


def do_filter(keyword):
    walker = FileWalker(paths)
    list = walker.getList()

    result = filter(lambda x: keyword.lower() in x['m'].lower(), list)

    print('================')
    if result:
        for ind, item in enumerate(result):
            print("%s, %s-%s,  %s" % (ind + 1, item['c'], item['i'], item['m']))
    else:
        print('No Match Result.')

    print('================')
