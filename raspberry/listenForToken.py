import getUserConfigFromServer

def main():
    while True:
        tokenHash = raw_input('Scan your token')
        print tokenHash
        getUserConfigFromServer.main(tokenHash)
if __name__ == '__main__':
    main()