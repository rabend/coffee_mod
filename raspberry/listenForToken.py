import getUserConfigFromServer as getter 
import makeCoffee as coffeeMaker
from evdev import InputDevice, categorize, ecodes

def main():
    scancodes = {
        0: None, 1: u'ESC', 2: u'1', 3: u'2', 4: u'3', 5: u'4', 6: u'5', 7: u'6', 8: u'7', 9: u'8', 10: u'9', 11: u'0', 12: u'-', 13: u'=',
        14: u'BACKSPACE',
        15: u'TAB', 16: u'Q', 17: u'W', 18: u'E', 19: u'R', 20: u'T', 21: u'Y', 22: u'U', 23: u'I', 24: u'O', 25: u'P', 26: u'(', 27: u')',
        28: u'ENTER',
        29: u'LEFTCTRL', 30: u'A', 31: u'S', 32: u'D', 33: u'F', 34: u'G', 35: u'H', 36: u'J', 37: u'K', 38: u'L', 39: u'SEMICOLON',
        40: u'APOSTROPHE', 41: u'UNKOWN',
        42: u'LEFTSHIFT', 43: u'BACKSLASH', 44: u'Z', 45: u'X', 46: u'C', 47: u'V', 48: u'B', 49: u'N', 50: u'M', 51: u'COMMA', 52: u'DOT',
        53: u'SLASH', 54: u'RIGHTSHIFT'
    }

    device = InputDevice("/dev/input/event0")
    tokenHash = ""

    while True:
        try:
            for event in device.read_loop():
                if event.type == ecodes.EV_KEY:
                    data = categorize(event)
                    if data.keystate == 1:
                        key_lookup = scancodes.get(data.scancode) or u'UNKONWN: {}'.format(data.scancode)
                        if key_lookup == u'ENTER':
                            break
                        else:
                            tokenHash += str(key_lookup)
            coffeeMaker.makeCoffee(100, 100, tokenHash)
            tokenHash = ""
            #getter.getUserConfig(tokenHash)
        except:
            print "wait a moment"

if __name__ == '__main__':
    main()