import os
import random

filesDir = "files/"
if not os.path.exists(filesDir):
    os.makedirs(filesDir)

size = 1000000
maxNumber = 999999
numFiles = 200
beginNum = 0

random.seed()

for i in range(beginNum,beginNum+numFiles):
    name = "file%02d.txt"%i
    print(name)

    file=open(filesDir+name,"w")
    for l in range(size):
        x = random.randint(0, maxNumber)
        file.write("%06d "%x)
        if l%20==19:
            file.write("\n")
