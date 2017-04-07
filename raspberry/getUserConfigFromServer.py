import sys, getopt, requests, os, incrementBeverageCounter

def main(argv):
    username = ""
    try:
        opts, args = getopt.getopt(argv, "hu:")
    except getopt.GetoptError:
        sys.exit(2)
    for opt, arg in opts:
        if opt == "-u":
            username = arg
            if username == "":
                sys.exit(2)
            res = requests.get("http://localhost:3000/api/getUser?userName=" + username)
            userdata = res.json()
            name = userdata["name"]
            incrementBeverageCounter.main(name)
        elif opt == "-h":
            print "Usage: <script> -u <username>"
        else:
            print "Usage only with arguments!"

if __name__ == '__main__':
    main(sys.argv[1:])