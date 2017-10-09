#  if not available: pip install bitarray
from bitarray import bitarray
from array import array
import time

test = b'AA:00'

print test

def charToUarts( char ):
  uarts = []

  for i in xrange( 0, 4 ):
    uarts.append( bitarray(8) )
    uarts[i].setall( True )

  outputArray = bitarray()
  outputArray.frombytes( char )

  bitPosition = 2
  iUart = 0
  for index, output in enumerate( outputArray ):
    # print index, iUart, bitPosition # for debugging iteration
    uarts[iUart][bitPosition] = outputArray[index]
    #  iteration increments
    iUart += index%2
    bitPosition = 2 if bitPosition == 5 else 5

  return uarts


def sendCommand(cmd):
  cmd += '\r\f'
  for char in cmd:
    uarts = charToUarts(char)
    for uart in uarts:
      print uart
      time.sleep(8 / 1000)


sendCommand(test)