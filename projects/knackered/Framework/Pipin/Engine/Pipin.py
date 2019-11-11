import shutil
_tag = "Pipin--> "
_banner = """


_________   _...._      .--._________   _...._      .--.   _..._
\        |.'      '-.   |__|\        |.'      '-.   |__| .'     '.
 \        .'```'.    '. .--. \        .'```'.    '. .--..   .-.   .
  \      |       \     \|  |  \      |       \     \|  ||  '   '  |
   |     |        |    ||  |   |     |        |    ||  ||  |   |  |
   |      \      /    . |  |   |      \      /    . |  ||  |   |  |
   |     |\`'-.-'   .'  |  |   |     |\`'-.-'   .'  |  ||  |   |  |
   |     | '-....-'`    |__|   |     | '-....-'`    |__||  |   |  |
  .'     '.                   .'     '.                 |  |   |  |
'-----------'               '-----------'               |  |   |  |
                                                        '--'   '--'

HTML5 Game Engine
--Alex Smith--

"""
#Commands
def CreateNewProject(path):
    print "Creating New Pipin Project at " + path
    f = open(path + "/index.html", "w")
    f.close()
    shutil.copyfile("Templates/index.html", path + "/index.html")

def CommandLoop():
    while True:
        input = raw_input(_tag)
        command = input.split(" ")[0]
        arg = input.split(" ")[1]
        if command == "new":
            CreateNewProject(arg)

        print input

def Main():
    print _banner
    CommandLoop()

Main()
