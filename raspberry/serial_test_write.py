import serial

ser = serial.Serial('/dev/ttyAMA0')
ser.baudrate(9600)
ser.write( '%01#RDD0010000107**\r'.encode() )
ser.close()