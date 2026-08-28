# -*- coding: utf-8 -*-
"""Create a new sheet: the page, its data file, and its menu entry.

    python tools/new_sheet.py 5rhythmchanges "Rhythm Changes" --deg "I VI ii V" --chord Bb

Writes <slug>.html and data/<slug>.js from _template/, then adds one line to the
NAV array in assets/sitebar.js so every page in the site links to it.

This is an authoring convenience, not a build step: the site is served exactly
as it sits on disk, and never needs this script to run.
"""
import argparse, io, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def read(p):
    return io.open(p, encoding="utf-8").read()


def write(p, s):
    os.makedirs(os.path.dirname(p), exist_ok=True)
    io.open(p, "w", encoding="utf-8", newline="").write(s)


def main():
    ap = argparse.ArgumentParser(description="Scaffold a new sheet.")
    ap.add_argument("slug", help="file name without extension, e.g. 5rhythmchanges")
    ap.add_argument("title", help="page title, e.g. 'Rhythm Changes'")
    ap.add_argument("--label", help="menu label (default: the title)")
    ap.add_argument("--deg", default="", help="small text beside the menu label, e.g. 'I VI ii V'")
    ap.add_argument("--chord", default="the original chord",
                    help="what the distance pips are measured from, e.g. Dm7")
    ap.add_argument("--eyebrow", default="ii-V-I in C")
    ap.add_argument("--description", default="")
    args = ap.parse_args()

    slug = args.slug
    if not re.match(r"^[A-Za-z0-9][A-Za-z0-9_-]*$", slug):
        sys.exit("slug must be alphanumeric with - or _, no extension")

    page = os.path.join(ROOT, slug + ".html")
    data = os.path.join(ROOT, "data", slug + ".js")
    for p in (page, data):
        if os.path.exists(p):
            sys.exit("refusing to overwrite existing file: " + os.path.relpath(p, ROOT))

    subs = {
        "{{TITLE}}": args.title,
        "{{DESCRIPTION}}": args.description or args.title,
        "{{EYEBROW}}": args.eyebrow,
        "{{HEADING}}": args.title,
        "{{STANDFIRST}}": "What this sheet is for, in a sentence or two.",
        "{{CODA}}": "How to take this off the page and into a tune.",
        "{{SLUG}}": slug,
        "{{CHORD}}": args.chord,
    }

    html = read(os.path.join(ROOT, "_template", "sheet.html"))
    js = read(os.path.join(ROOT, "_template", "sheet.js"))
    for k, v in subs.items():
        html = html.replace(k, v)
        js = js.replace(k, v)
    write(page, html)
    write(data, js)

    # --- one line into NAV, before the closing bracket of the array
    sb_path = os.path.join(ROOT, "assets", "sitebar.js")
    sb = read(sb_path)
    if slug + ".html" in sb:
        print("NAV already lists this page; left alone")
    else:
        m = re.search(r"(  var NAV = \[\n)(.*?)(\n  \];)", sb, re.S)
        if not m:
            sys.exit("could not find the NAV array in assets/sitebar.js — add the line by hand")
        rows = re.findall(r'href: "([^"]+)",(\s*)label: "([^"]+)",', m.group(2))
        hw = max([len(r[0]) for r in rows] + [len(slug) + 5])
        lw = max([len(r[2]) for r in rows] + [len(args.label or args.title)])
        entry = '    { href: "%s.html",%s label: "%s",%s deg: "%s" }' % (
            slug, " " * (hw - len(slug) - 5 + 1),
            args.label or args.title, " " * (lw - len(args.label or args.title) + 1),
            args.deg)
        sb = sb[:m.end(2)] + ",\n" + entry + sb[m.end(2):]
        write(sb_path, sb)

    rel = lambda p: os.path.relpath(p, ROOT).replace("\\", "/")
    print("created  " + rel(page))
    print("created  " + rel(data))
    print("updated  assets/sitebar.js  (menu now links it from every page)")
    print()
    print("Next: write the chords in " + rel(data) + ", then run")
    print("      python tools/check.py")


if __name__ == "__main__":
    main()
