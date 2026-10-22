"""Build assets/resume/Anakpong-Achotipong-Resume.pdf.

Usage (from repo root):  python3 tools/build_resume.py
Requires: pip install reportlab

Privacy: do not add phone number, ZIP code or graduation year (see CLAUDE.md).
"""
from reportlab.lib.colors import HexColor, black, white
from reportlab.lib.pagesizes import letter
from reportlab.lib.utils import simpleSplit
from reportlab.pdfgen import canvas

OUT = "assets/resume/Anakpong-Achotipong-Resume.pdf"
CONTACT = "West Palm Beach, FL  |  chinyaandy@gmail.com"
SUMMARY = (
    "Dynamic Sushi Chef with extensive experience at Peppermint Thai and Sushi, "
    "specializing in sushi preparation and quality control. Proven ability to enhance "
    "menu offerings and maintain food safety compliance. Adept in inventory management "
    "and fostering collaboration within kitchen teams to elevate service efficiency and "
    "customer satisfaction."
)
SKILLS = [
    ("Sushi preparation", "Knife skills"),
    ("Food safety compliance", "Inventory management"),
    ("Quality control", "Menu development"),
]
JOBS = [
    ("Sushi Chef", "10/2023 to 06/2024", "Tideline Resort", " – Lake Worth, FL", []),
    ("Sushi Chef", "10/2022 to 08/2023", "Thai 2 Express", " – Lake Worth, FL", []),
    ("Sushi Chef", "01/2020 to 09/2022", "Peppermint Thai and Sushi", " – Royal Palm Beach, FL", [
        "Prepared high-quality sushi using traditional techniques and fresh ingredients.",
        "Maintained cleanliness and organization of workstations to ensure compliance with health standards.",
        "Collaborated with kitchen staff to streamline food preparation processes and improve service efficiency.",
        "Monitored inventory levels, ensuring timely replenishment of essential sushi ingredients and supplies.",
    ]),
]

W, H = letter
M = 50
RED = HexColor("#9e1b1f")
c = canvas.Canvas(OUT, pagesize=letter)
c.setTitle("Anakpong Achotipong - Resume")
c.setAuthor("Anakpong Achotipong")
y = H - 75


def section(title):
    global y
    c.setFillColor(black)
    c.setFont("Helvetica", 15)
    c.drawString(M, y, title)
    y -= 7
    c.setStrokeColor(RED)
    c.setLineWidth(1)
    c.line(M, y, W - M, y)
    y -= 17


def para(text, size=10.5, lead=15, indent=0, font="Helvetica"):
    global y
    for line in simpleSplit(text, font, size, W - 2 * M - indent):
        c.setFont(font, size)
        c.setFillColor(black)
        c.drawString(M + indent, y, line)
        y -= lead


# Header
c.setFont("Helvetica-Bold", 34)
c.setFillColor(black)
c.drawString(M, y, "ANAKPONG ")
c.setFillColor(RED)
c.drawString(M + c.stringWidth("ANAKPONG ", "Helvetica-Bold", 34), y, "ACHOTIPONG")
y -= 38
c.setFillColor(black)
c.rect(M, y - 8, W - 2 * M, 28, fill=1, stroke=0)
c.setFillColor(white)
c.setFont("Helvetica-Bold", 10.5)
c.drawString(M + 10, y + 2, CONTACT)
y -= 40

section("Professional Summary")
para(SUMMARY)

y -= 10
section("Skills")
for a, b in SKILLS:
    c.setFont("Helvetica", 10.5)
    c.drawString(M + 8, y, "•  " + a)
    c.drawString(W / 2 + 8, y, "•  " + b)
    y -= 15

y -= 10
section("Work History")
for title, dates, place, loc, bullets in JOBS:
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(M, y, title)
    c.setFont("Helvetica", 10.5)
    c.drawRightString(W - M, y, dates)
    y -= 15
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(M, y, place)
    pw = c.stringWidth(place, "Helvetica-Bold", 10.5)
    c.setFont("Helvetica", 10.5)
    c.drawString(M + pw, y, loc)
    y -= 15
    for b in bullets:
        c.drawString(M + 10, y, "•")
        para(b, indent=22)
    y -= 8

section("Education")
c.setFont("Helvetica-Bold", 10.5)
c.drawString(M, y, "Bachelor of Arts: ")
w = c.stringWidth("Bachelor of Arts: ", "Helvetica-Bold", 10.5)
c.setFont("Helvetica", 10.5)
c.drawString(M + w, y, "School of Humanities")
y -= 15
uni = "University of the Thai Chamber of Commerce"
c.setFont("Helvetica-Bold", 10.5)
c.drawString(M, y, uni)
w = c.stringWidth(uni, "Helvetica-Bold", 10.5)
c.setFont("Helvetica", 10.5)
c.drawString(M + w, y, " – Bangkok, Thailand")
c.setPageCompression(0)
c.save()
print("Wrote", OUT)
