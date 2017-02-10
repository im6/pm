import sys
from jobs.do_csv import do_csv
from jobs.do_dup import do_dup
from jobs.do_filter import do_filter
from jobs.do_open import do_open


job = sys.argv[1]
hasArg = len(sys.argv) > 2

md = eval('do_' + job)
if hasArg:
    md(sys.argv[2])
else:
    md()
