from src.FileWalker import FileWalker
from local.constant_var import paths

class Do_filter():
    def __init__(self, keyword):
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

