import sys
from jobs.do_csv import Do_csv
from jobs.do_dup import Do_dup
from jobs.do_filter import Do_filter
from jobs.do_open import Do_open


job = sys.argv[1]
hasArg = len(sys.argv) > 2

md = eval('Do_' + job)
if hasArg:
    md(sys.argv[2])
else:
    md()
