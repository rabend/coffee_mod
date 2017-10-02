import serial

ser = serial.Serial('/dev/ttyAMA0')
ser.baudrate(9600)
print( ser.read(20) )
ser.close()