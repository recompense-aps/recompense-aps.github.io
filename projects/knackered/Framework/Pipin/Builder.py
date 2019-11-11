modules = ["Core", "Geometry", "Loader", "Animation", "Models"]
build = ""
buildNumMinor = 1
buildNumMed = 1
buildnumMajor = 0

pipinHeader = "/*\n*\tPipin.js Build " + str(buildnumMajor) + "." + str(buildNumMed) + "." + str(buildNumMinor) + "\n*\tWritten By Alex Smith\n*/\n\n"
build += pipinHeader

print "Building Pipin..."

for mod in modules:
    f = open("Modules/Pipin." + mod + ".js", "r")
    build += f.read() + "\n\n\n"
    f.close()
    print mod + " Module loaded."


build += "\n\nPipin.Version = " + "\"" + str(buildnumMajor) + "." + str(buildNumMed) + "." + str(buildNumMinor) + "\"";

f = open("Pipin.js","w")
f.write(build)
f.close()

raw_input()
