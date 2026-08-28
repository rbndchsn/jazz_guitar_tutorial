# -*- coding: utf-8 -*-
"""Check the site holds together. Run after adding or editing a sheet:

    python tools/check.py

Verifies, for every page: tags balance, every stylesheet and script it
references exists, every internal link resolves, and every mount point its
data file writes into is actually present in the HTML. Also checks that
every NAV entry points at a real page, and that the JS parses (if node is
on PATH). Exits non-zero on any failure, so it works as a git hook or a
VS Code task.
"""
import io, os, re, subprocess, sys
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VOID = {"meta", "link", "br", "hr", "img", "input", "line", "circle",
        "path", "use", "col", "source"}

fails = []
def fail(msg):
    fails.append(msg)

def read(p):
    return io.open(p, encoding="utf-8").read()

def pages():
    return sorted(f for f in os.listdir(ROOT) if f.endswith(".html"))

def ok(cond, label, detail=""):
    print("  %-38s %s%s" % (label, "ok" if cond else "FAIL", ("  " + detail) if detail and not cond else ""))
    if not cond:
        fail(label)

# ---------------------------------------------------------------- tags
class P(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack, self.err = [], []
    def handle_starttag(self, t, a):
        if t not in VOID:
            self.stack.append((t, self.getpos()))
    def handle_endtag(self, t):
        if t in VOID:
            return
        if self.stack and self.stack[-1][0] == t:
            self.stack.pop()
        else:
            self.err.append((t, self.getpos()))

print("tags balance")
for f in pages():
    p = P(); p.feed(read(os.path.join(ROOT, f)))
    ok(not p.stack and not p.err, f,
       "unclosed %s err %s" % ([x[0] for x in p.stack][:3], p.err[:2]))

# ---------------------------------------------------------------- assets
print("referenced files exist")
for f in pages():
    s = read(os.path.join(ROOT, f))
    refs = re.findall(r'(?:href|src)="((?:assets|data)/[^"]+)"', s)
    bad = [r for r in refs if not os.path.exists(os.path.join(ROOT, r))]
    ok(not bad, "%s (%d refs)" % (f, len(refs)), "missing " + ", ".join(bad))

# ---------------------------------------------------------------- links
print("internal links resolve")
for f in pages():
    s = read(os.path.join(ROOT, f))
    refs = sorted(set(re.findall(r'href="([^":/#]+\.html)"', s)))
    bad = [r for r in refs if not os.path.exists(os.path.join(ROOT, r))]
    ok(not bad, "%s (%d links)" % (f, len(refs)), "broken " + ", ".join(bad))

# ---------------------------------------------------------------- site chrome
# The bar and the colophon are site-wide. A page that forgets one is a bug,
# not a style choice - so this fails the build rather than warning.
print("site chrome on every page")
CHROME = ["assets/sitebar.css", "assets/sitebar.js",
          "assets/sitefooter.css", "assets/sitefooter.js"]
for f in pages():
    s = read(os.path.join(ROOT, f))
    absent = [c for c in CHROME if c not in s]
    ok(not absent, f, "missing " + ", ".join(absent))
t = os.path.join(ROOT, "_template", "sheet.html")
if os.path.exists(t):
    s = read(t)
    absent = [c for c in CHROME if c not in s]
    ok(not absent, "_template/sheet.html", "missing " + ", ".join(absent))

# ---------------------------------------------------------------- nav
print("menu")
sb = read(os.path.join(ROOT, "assets", "sitebar.js"))
nav = re.findall(r'href:\s*"([^"]+)"', sb)
bad = [h for h in nav if not os.path.exists(os.path.join(ROOT, h))]
ok(not bad, "NAV targets exist (%d entries)" % len(nav), "broken " + ", ".join(bad))
unlisted = [f for f in pages() if f not in nav and f != "404.html"]
ok(not unlisted, "every page is in the menu", "not listed: " + ", ".join(unlisted))

# ---------------------------------------------------------------- mounts
print("mount points")
for f in pages():
    s = read(os.path.join(ROOT, f))
    datafiles = re.findall(r'src="(data/[^"]+)"', s)
    for d in datafiles:
        js = read(os.path.join(ROOT, d))
        ids = sorted(set(re.findall(r'getElementById\("([^"]+)"\)', js)))
        ids += sorted(set(re.findall(r'renderBands\(\s*"([^"]+)"', js)))
        absent = [i for i in sorted(set(ids)) if ('id="%s"' % i) not in s]
        ok(not absent, "%s <- %s" % (f, d), "no element with id " + ", ".join(absent))

# ---------------------------------------------------------------- namespace
# assets/ must define exactly one global (JG); data files must pull from it
# rather than relying on bare globals.
print("namespace")
for f in sorted(os.listdir(os.path.join(ROOT, "data"))):
    if f.endswith(".js"):
        s_ = read(os.path.join(ROOT, "data", f))
        ok("JG." in s_, "data/%s uses the JG namespace" % f, "no reference to JG")

# ---------------------------------------------------------------- js parses
print("javascript parses")
import shutil
NODE = (shutil.which("node") or shutil.which("node.exe") or shutil.which("node.cmd"))
if not NODE:
    # some shells expose node without putting it on the PATH this process sees
    for guess in (r"C:\Program Files\nodejs\node.exe",
                  r"C:\Program Files (x86)\nodejs\node.exe",
                  "/usr/bin/node", "/usr/local/bin/node"):
        if os.path.exists(guess):
            NODE = guess
            break
if not NODE:
    print("  node not on PATH - skipped")
else:
    for d in ("assets", "data"):
        for f in sorted(os.listdir(os.path.join(ROOT, d))):
            if not f.endswith(".js"):
                continue
            r = subprocess.run([NODE, "--check", os.path.join(ROOT, d, f)],
                               capture_output=True, text=True)
            ok(r.returncode == 0, "%s/%s" % (d, f), r.stderr.strip().split("\n")[0] if r.stderr else "")

print()
if fails:
    print("FAILED (%d): %s" % (len(fails), "; ".join(fails)))
    sys.exit(1)
print("all checks passed")
