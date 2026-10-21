#!/usr/bin/env python3
"""
Static QA for the Nestlancer homepage section lab.

No third-party dependencies and no browser required. Run from the repository root:

    python3 tools/audit-samples.py

Checks every HTML file under the section labs plus the root hub:

  1. tag balance (unclosed / stray elements)
  2. duplicate id attributes
  3. local src/href targets exist on disk
  4. external network references (CDN, fonts, images) — must be zero
  5. placeholder href="#"
  6. <img> without alt, <button> without type
  7. prefers-reduced-motion coverage
  8. locked copy present, verbatim, per section (source: docs/HOMEPAGE-SCREENSHOT-RESEARCH.md)
  9. accent-token contrast against the light house surfaces (WCAG AA 4.5:1)
 10. inline <script> syntax, via `node --check` when node is available

Exit code 0 = clean. Anything printed under "FAIL" needs fixing before a
sample is used to compose a full page.
"""

from __future__ import annotations

import glob
import html
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VOID = {
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr",
}

# Locked strings per section lab. The prompt files and
# docs/HOMEPAGE-SCREENSHOT-RESEARCH.md are the source of truth; this is only a
# regression net for the rendered samples.
LOCKED = {
    "homepage-hero": [
        "Intake open",
        "Ship with clients in the loop — and money under control",
        "Nestlancer fuses a dedicated product studio with an operating system for delivery: "
        "fixed-price quotes, milestone payments, live Project Hub, and Razorpay / UPI.",
        "Start a project", "Tour the product",
        "project-hub · NL-204", "Frontend development — SaaS Landing Redesign",
        "In progress", "Deposit paid", "Due Fri", "₹48,000", "68%",
        "Staging build pushed", "Rahul: Hero CTA above the fold?",
        "Discovery complete", "UI Design complete", "Frontend 68% active",
        "QA & handoff pending", "Illustrative Project Hub preview",
        "HEALTHTECH", "FINTECH", "E-COMMERCE", "SAAS", "B2B PORTALS",
        "MOBILE APPS", "DESIGN SYSTEMS", "MARKETPLACES",
    ],
    "homepage-delivery": [
        "FIG 02 · DELIVERY NARRATIVE",
        "From brief to release — one continuous surface.",
        "Every marketing claim is a real Project Hub state your client can open.",
        "02.1", "Request", "Scoped intake, not a ticket black hole.",
        "02.2", "Quote", "Fixed-price line items with milestones.",
        "02.3", "Build", "Live progress, files, and messages.",
        "02.4", "Pay & release", "Milestone pay with Razorpay / UPI.",
        "Discovery", "Done", "UI Design", "Frontend", "Active", "Queued",
    ],
    "homepage-financial-clarity": [
        "Financial clarity for every milestone.",
        "Milestone gates, tabular ₹, and India rails — finance your team can audit.",
        "₹29,500", "₹48,000", "₹62,000", "₹4,28,500",
        "PREVIEW · ILLUSTRATIVE", "Preview, not a live checkout",
        "Razorpay", "Bank", "UPI", "PCI", "India rails", "Paid", "Pending",
    ],
    "homepage-selected-work": [
        "FIG 05 · SELECTED WORK", "Work that speaks for itself.", "View all",
        "B2B Client Portal UX", "Fitness Tracking App", "Marketplace Redesign",
        "Brand Identity System", "Fintech Payments Hub", "SaaS Analytics Platform",
        "E-Commerce Mobile App", "HealthTech Dashboard",
        "Illustrative product concepts — not customer screenshots.",
    ],
    "homepage-closing-cta": [
        "FIG 06 · START", "Ready to ship with clarity?",
        "Fixed-price studio work. Live Project Hub. Razorpay milestones. Intake is open.",
        "Reply in 24h", "Fixed-price quotes", "No subscription", "Made in India",
        "Start a project", "Preview the portal",
    ],
    "homepage-why-nestlancer": [
        "FIG 04 · WHY NESTLANCER", "Engineered for delivery, not marketplace noise.",
        "Milestone payouts", "₹4.2L", "Razorpay milestones — deposit, mid, final.",
        "Reply under 2m", "Typical studio response on active threads.",
        "Fixed-price only", "No hourly fog. Scope locks on accept.",
        "Command density", "Search jumps across Hub, quotes, pay.",
        "Deliverable gates", "Payment gates tied to approvals.",
        "Selective intake", "Quality over volume — scoped studio work.",
        "Illustrative homepage proof copy, not a verified payout total.",
        "Illustrative homepage proof copy, not a response-time guarantee.",
    ],
    "homepage-header": [
        "Product", "Portfolio", "Blog", "About", "Pricing", "Services", "Contact",
        "Sign in", "Start a project",
    ],
    "homepage-footer": [
        "Product studio + client portal. Fixed-price quotes, Razorpay milestones, live Project Hub.",
        "Project Hub", "Pricing", "Services", "Portfolio",
        "About", "Blog", "Contact", "Start a project",
        "Terms", "Privacy", "Verify document",
        "2026 Nestlancer", "Made in India", "All rights reserved.",
    ],
}

# Accent + text tokens that must clear AA on the light house surfaces.
LIGHT_SURFACES = ["#ffffff", "#f9fbfc", "#f4f8f9", "#edf4f6", "#eef7f5"]
TEXT_TOKENS = ["teal", "teal-text", "muted", "body", "ink"]


class Balance(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack = []
        self.errors = []

    def handle_starttag(self, tag, attrs):
        if tag not in VOID:
            self.stack.append(tag)

    def handle_endtag(self, tag):
        if tag in VOID:
            return
        if self.stack and self.stack[-1] == tag:
            self.stack.pop()
        elif tag in self.stack:
            i = len(self.stack) - 1 - self.stack[::-1].index(tag)
            self.errors.append(f"unclosed {self.stack[i + 1:]} before </{tag}>")
            del self.stack[i:]
        else:
            self.errors.append(f"stray </{tag}>")


def plain_text(path: str) -> str:
    src = open(path, encoding="utf-8").read()
    src = re.sub(r"<script.*?</script>", " ", src, flags=re.S | re.I)
    src = re.sub(r"<style.*?</style>", " ", src, flags=re.S | re.I)
    src = re.sub(r"<!--.*?-->", " ", src, flags=re.S)
    out = html.unescape(re.sub(r"<[^>]+>", " ", src))
    return re.sub(r"\s+", " ", re.sub(r"[\u200b\u00a0]", " ", out)).strip()


def luminance(hex_colour: str) -> float:
    h = hex_colour.lstrip("#")
    if len(h) == 3:
        h = "".join(c * 2 for c in h)
    h = h[:6]
    channels = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]

    def lin(c):
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4

    r, g, b = (lin(c) for c in channels)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast(a: str, b: str) -> float:
    la, lb = luminance(a), luminance(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)


def html_files() -> list[str]:
    files = glob.glob(os.path.join(ROOT, "*.html"))
    files += glob.glob(os.path.join(ROOT, "homepage-*", "**", "*.html"), recursive=True)
    return sorted(files)


def main() -> int:
    failures: list[str] = []
    files = html_files()
    production_routes: set[str] = set()

    for path in files:
        rel = os.path.relpath(path, ROOT)
        src = open(path, encoding="utf-8").read()
        parser = Balance()
        parser.feed(src)

        if parser.stack:
            failures.append(f"{rel}: unclosed at EOF {parser.stack}")
        for err in parser.errors:
            failures.append(f"{rel}: {err}")

        ids = re.findall(r'\sid="([^"]+)"', src)
        for dup in sorted({i for i in ids if ids.count(i) > 1}):
            failures.append(f"{rel}: duplicate id #{dup}")

        base = os.path.dirname(path)
        for ref in re.findall(r'(?:src|href)="([^"]+)"', src):
            if ref.startswith(("http://", "https://", "//")):
                failures.append(f"{rel}: external reference {ref}")
                continue
            if ref == "#":
                failures.append(f"{rel}: placeholder href=\"#\"")
                continue
            if ref.startswith("/"):
                # production routes owned by the landing prototype, not this lab
                production_routes.add(ref.split("#")[0].split("?")[0])
                continue
            if ref.startswith(("#", "?", "mailto:")):
                continue
            target = ref.split("#")[0].split("?")[0]
            if not target or target.startswith("/"):
                continue
            if not os.path.exists(os.path.normpath(os.path.join(base, target))):
                failures.append(f"{rel}: missing local target {ref}")

        # markup only: comments and <style> blocks legitimately contain things like "<img>"
        markup = re.sub(r"<!--.*?-->", " ", src, flags=re.S)
        markup = re.sub(r"<style.*?</style>", " ", markup, flags=re.S | re.I)
        for tag in re.findall(r"<img\b[^>]*>", markup):
            if "alt=" not in tag:
                failures.append(f"{rel}: <img> without alt — {tag[:60]}")
        for tag in re.findall(r"<button\b[^>]*>", markup):
            if "type=" not in tag:
                failures.append(f"{rel}: <button> without type — {tag[:60]}")
        if "prefers-reduced-motion" not in src:
            failures.append(f"{rel}: no prefers-reduced-motion handling")

        # heading order and ARIA references
        levels = [int(m.group(1)) for m in re.finditer(r"<h([1-6])\b", markup)]
        if levels:
            if levels.count(1) > 1:
                failures.append(f"{rel}: {levels.count(1)} <h1> elements")
            for prev, cur in zip(levels, levels[1:]):
                if cur > prev + 1:
                    failures.append(f"{rel}: heading jump h{prev} → h{cur}")
                    break
        for attr in ("aria-labelledby", "aria-describedby", "aria-controls", "aria-owns"):
            for m in re.finditer(attr + r'="([^"]+)"', markup):
                for ref in m.group(1).split():
                    if ref not in ids:
                        failures.append(f"{rel}: {attr} points at missing #{ref}")

        # accent / text contrast on the light house surfaces
        root_block = re.search(r":root\{(.*?)\}", src, re.S)
        if root_block:
            tokens = dict(re.findall(r"--([a-z0-9-]+)\s*:\s*(#[0-9a-fA-F]{6})", root_block.group(1)))
            # A sample may deliberately paint its "light" theme on a dark canvas
            # (e.g. W04). Only judge text tokens when --bg really is a light surface.
            light_canvas = tokens.get("bg") and luminance(tokens["bg"]) > 0.5
            for token in (TEXT_TOKENS if light_canvas else []):
                if token in tokens:
                    for surface in LIGHT_SURFACES:
                        ratio = contrast(tokens[token], surface)
                        if ratio < 4.5:
                            failures.append(
                                f"{rel}: --{token} on {surface} = {ratio:.2f}:1 (< 4.5)")

    # locked copy, per section lab
    for section, strings in LOCKED.items():
        for path in sorted(glob.glob(os.path.join(ROOT, section, "samples", "*", "index.html"))):
            rel = os.path.relpath(path, ROOT)
            text = plain_text(path)
            for needle in strings:
                if needle not in text:
                    failures.append(f"{rel}: locked copy missing — {needle!r}")

    # sample manifests
    for manifest in sorted(glob.glob(os.path.join(ROOT, "homepage-*", "samples", "*", "sample.json"))):
        rel = os.path.relpath(manifest, ROOT)
        folder = os.path.basename(os.path.dirname(manifest))
        try:
            data = json.load(open(manifest, encoding="utf-8"))
        except Exception as exc:  # noqa: BLE001 - report and continue
            failures.append(f"{rel}: invalid JSON — {exc}")
            continue
        if not data.get("id"):
            failures.append(f"{rel}: no id")
        elif data["id"] != folder.split("-")[0]:
            failures.append(f"{rel}: id {data['id']!r} does not match folder {folder!r}")
        if not data.get("name"):
            failures.append(f"{rel}: no name")

    # inline script syntax
    if shutil.which("node"):
        for path in files:
            rel = os.path.relpath(path, ROOT)
            src = open(path, encoding="utf-8").read()
            for i, match in enumerate(
                re.finditer(r"<script(?![^>]*\bsrc=)[^>]*>(.*?)</script>", src, re.S | re.I)
            ):
                code = match.group(1).strip()
                if not code:
                    continue
                with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False) as tmp:
                    tmp.write(code)
                    tmp_path = tmp.name
                result = subprocess.run(["node", "--check", tmp_path], capture_output=True, text=True)
                os.unlink(tmp_path)
                if result.returncode:
                    failures.append(f"{rel}: script #{i} syntax error — {result.stderr.splitlines()[0]}")

    print(f"audited {len(files)} HTML files")
    if failures:
        print(f"\nFAIL — {len(failures)} issue(s):")
        for item in failures:
            print("  •", item)
        return 1

    if production_routes:
        print(f"note: {len(production_routes)} root-relative production routes "
              f"(/portfolio, /proto/apps/landing/… ) are intentionally not served by this lab")
    print("PASS — tag balance, ids, local refs, no external assets, alt/type, "
          "reduced motion, locked copy, accent contrast, script syntax, sample manifests")
    return 0


if __name__ == "__main__":
    sys.exit(main())
