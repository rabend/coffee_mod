import getUserConfigFromServer
import makeCoffee


def main():
    while True:
        try:
            tokenHash = raw_input('Scan your token')
            makeCoffee.main(100, 100, tokenHash)
            #getUserConfigFromServer.main(tokenHash)
        except:
            print "wait a moment"

if __name__ == '__main__':
    main()


#0871097668 #1
#3067209429 #2
#3066946645 #3


