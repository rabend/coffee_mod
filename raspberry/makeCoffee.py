import sys
import RPi.GPIO as GPIO
import time
import serial
from coffeeCommands import CoffeeCommands as commands

def main(coffeeamount, milkamount, strength):
    # if coffeeamount == 0 or strength == 0:
    #     sys.exit(2)
    # print(coffeeamount)
    # print(milkamount)
    # print(strength)

    # set RaspberryPi pin layout
    GPIO.setmode(GPIO.BCM)  # set pins for output
    GPIO.setup(12, GPIO.OUT)
    GPIO.setup(20, GPIO.OUT)
    GPIO.setup(21, GPIO.OUT)
    GPIO.setup(26, GPIO.OUT)

    print strength
    if strength == "0871097668":
        GPIO.output(12, GPIO.HIGH)
        time.sleep(3)
        GPIO.output(12, GPIO.LOW)
    elif strength == "3067209429":
        GPIO.output(20, GPIO.HIGH)
        time.sleep(3)
        GPIO.output(20, GPIO.LOW)
    elif strength == "3066946645":
        GPIO.output(21, GPIO.HIGH)
        time.sleep(3)
        GPIO.output(21, GPIO.LOW)
    else:
        GPIO.output(26, GPIO.HIGH)
        time.sleep(3)
        GPIO.output(26, GPIO.LOW)
    GPIO.cleanup()
    
if __name__ == '__main__':
    sys.exit(main(sys.argv[1], sys.argv[2], sys.argv[3]))
