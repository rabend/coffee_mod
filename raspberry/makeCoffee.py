import sys
import RPi.GPIO as GPIO
import time

def main(coffeeamount, milkamount, strength):
    if coffeeamount == 0 or strength == 0:
        sys.exit(2)
    print coffeeamount
    print milkamount
    print strength

    scancodes = {

    }
    # set RaspberryPi pin layout
    GPIO.setmode(GPIO.BOARD)

    # set pins for output
    # GPIO.setup(PIN_NUMBER, GPIO.OUT)

    if strength == 0871097668:
        GPIO.output(12, GPIO.HIGH)
        time.sleep(3)
        GPIO.output(12, GPIO.LOW)
    elif strength == 3067209429:
        GPIO.output(20, GPIO.HIGH)
        time.sleep(3)
        GPIO.output(12, GPIO.LOW)
    elif strength == 3066946645:
        GPIO.output(21, GPIO.HIGH)
        time.sleep(3)
        GPIO.output(12, GPIO.LOW)
    else:
        print "token not recognized"
    # map coffeeAmount, milkAmount and strength to a time duration
    # since we have only the option of turning the machine's parts on and off
    # we have to find a time of coffee grinding that resolves to strength 1 and then can multiply
    # same goes for amount of coffee and milk chosen

    # the actual making of the coffee then should look something like this:
    # GPIO.output(MACHINE_ON, GPIO.HIGH)
    # time.sleep(100)
    # GPIO.output(MACHINE_ON, GPIO.LOW)

    # GPIO.output(BREWING_GROUP_INIT, GPIO.HIGH)
    # GPIO.output(GRINDER_ON, GPIO.HIGH)
    # time.sleep(strengthToSecondsMapped)
    # GPIO.output(GRINDER_ON, GPIO.LOW)

if __name__ == '__main__':
    sys.exit(main(sys.argv[1], sys.argv[2], sys.argv[3]))