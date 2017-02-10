from src.FileWalker import FileWalker
from src.CsvWriter import CsvWriter
from local.constant_var import paths

def do_csv():
    walker = FileWalker(paths)
    list = walker.getList()

    print("generating the CSV file ... ")

    wr = CsvWriter()
    wr.start({'company': 'c', 'id': 'i', 'movie': 'm', 'image': 'im'}, list)

    print('================')
    print('Finished!')
    print('================')
