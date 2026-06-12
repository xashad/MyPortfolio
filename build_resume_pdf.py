# Generates a clean one/two-page PDF resume for Mohammad Ashad Khan.
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table,
                                TableStyle, HRFlowable, ListFlowable, ListItem)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

BLUE = HexColor("#1f4ed8")
INK = HexColor("#1a1a1a")
MUTED = HexColor("#444444")

styles = getSampleStyleSheet()
def S(name, **kw):
    return ParagraphStyle(name, parent=styles["Normal"], **kw)

name_s = S("name", fontName="Helvetica-Bold", fontSize=22, textColor=BLUE,
           alignment=TA_CENTER, spaceAfter=2, leading=25)
tag_s = S("tag", fontName="Helvetica", fontSize=9.5, textColor=MUTED,
          alignment=TA_CENTER, spaceAfter=2, leading=12)
contact_s = S("contact", fontName="Helvetica", fontSize=9, textColor=MUTED,
              alignment=TA_CENTER, spaceAfter=4, leading=12)
h2_s = S("h2", fontName="Helvetica-Bold", fontSize=11.5, textColor=BLUE,
         spaceBefore=9, spaceAfter=2, leading=13)
body_s = S("body", fontName="Helvetica", fontSize=9.4, textColor=INK, leading=12.5)
muted_i = S("mi", fontName="Helvetica-Oblique", fontSize=9, textColor=MUTED, leading=11.5)
bullet_s = S("bul", fontName="Helvetica", fontSize=9.2, textColor=INK, leading=12.2)

def rule():
    return HRFlowable(width="100%", thickness=1.2, color=BLUE,
                      spaceBefore=2, spaceAfter=4)

def row(left, right):
    t = Table([[Paragraph(left, body_s), Paragraph(right, muted_i)]],
              colWidths=[125*mm, 45*mm])
    t.setStyle(TableStyle([("VALIGN", (0,0), (-1,-1), "TOP"),
                           ("LEFTPADDING",(0,0),(-1,-1),0),
                           ("RIGHTPADDING",(0,0),(-1,-1),0),
                           ("TOPPADDING",(0,0),(-1,-1),1),
                           ("BOTTOMPADDING",(0,0),(-1,-1),0),
                           ("ALIGN",(1,0),(1,0),"RIGHT")]))
    return t

def bullets(items):
    return ListFlowable(
        [ListItem(Paragraph(i, bullet_s), leftIndent=10, value="•") for i in items],
        bulletType="bullet", bulletColor=BLUE, leftIndent=12, spaceBefore=1, spaceAfter=3)

doc = SimpleDocTemplate("Mohammad_Ashad_Khan_Resume.pdf", pagesize=A4,
                        leftMargin=16*mm, rightMargin=16*mm,
                        topMargin=13*mm, bottomMargin=12*mm,
                        title="Mohammad Ashad Khan - Resume",
                        author="Mohammad Ashad Khan")
E = []
E.append(Paragraph("MOHAMMAD ASHAD KHAN", name_s))
E.append(Paragraph("MSc AI for Science &amp; Technology | Computer Vision &amp; Deep Learning | Explainable AI | Full-Stack Developer", tag_s))
E.append(Paragraph('Milan, Italy &nbsp;•&nbsp; ashad.ak786@gmail.com &nbsp;•&nbsp; +39 351 478 8885 &nbsp;•&nbsp; '
                   '<font color="#1f4ed8">linkedin.com/in/xashad</font> &nbsp;•&nbsp; '
                   '<font color="#1f4ed8">ashad.me</font>', contact_s))
E.append(rule())

E.append(Paragraph("EDUCATION", h2_s))
E.append(row("<b>MSc Artificial Intelligence for Science &amp; Technology</b>", "Sep 2024 – Sep 2026 (Expected)"))
E.append(Paragraph("Università degli Studi di Milano-Bicocca, Milan, Italy", muted_i))
E.append(row("<b>B.Tech Computer Science Engineering</b>", "Jul 2019 – Jul 2023"))
E.append(Paragraph("Lovely Professional University, India", muted_i))

E.append(Paragraph("TECHNICAL SKILLS", h2_s))
for line in [
    "<b>Languages:</b> Python, JavaScript, TypeScript, SQL, HTML, CSS",
    "<b>Frameworks:</b> React, Next.js, Node.js, Express.js, Tailwind CSS, Streamlit",
    "<b>AI / ML:</b> Deep Learning, Computer Vision, NLP, PyTorch, CNNs, Vision Transformers (ViT), Transfer Learning, Gradient Boosting, SBERT, 1D CNN, Scikit-learn, MediaPipe, OpenCV",
    "<b>Explainable AI:</b> Grad-CAM, LIME, SHAP, Saliency Maps, t-SNE, Knowledge Graphs (TransE)",
    "<b>Databases:</b> PostgreSQL, MongoDB, Supabase, Neo4j",
    "<b>Tools &amp; Focus:</b> Git, Docker | Depth Estimation, Embeddings, Knowledge Graphs, HCI, Gesture Control",
]:
    E.append(Paragraph(line, body_s))

E.append(Paragraph("EXPERIENCE", h2_s))
E.append(row("<b>Frontend Web Developer</b> @ Securedsoft (Remote)", "May 2022 – Jun 2025"))
E.append(bullets(["Built responsive web interfaces using React, Tailwind CSS, and Supabase APIs; improved performance and cross-browser compatibility."]))
E.append(row("<b>Computer Science Instructor</b> @ Lumbini World School, Nepal", "Apr 2024 – Feb 2025"))
E.append(bullets(["Taught programming fundamentals and mentored K-12 students; delivered Coding ToT curriculum (Nepal STEM Alliance certified)."]))
E.append(row("<b>Management Team Member</b> @ Google Developer Student Club, LPU", "Jan 2020 – May 2023"))
E.append(bullets(["Organized hackathons and workshops; mentored peers in software development."]))

E.append(Paragraph("SELECTED PROJECTS", h2_s))
E.append(row("<b>Lagani</b> — Explainable AI for NEPSE Stock-Risk Analysis &nbsp;<font color='#444444'>| PyTorch, Gradient Boosting, LIME, Neo4j, Streamlit</font>", "2026"))
E.append(bullets([
    "Built a leak-free, symbol-disjoint stock-risk model (gradient boosting + MLP) across 120 NEPSE stocks — <b>80.9% test accuracy, 0.81 macro-F1</b> (5-fold CV validated).",
    "Engineered a multi-model stack: CNN trend predictor, volatility-regime classifier, and a TransE knowledge-graph recommender over a Neo4j market graph.",
    "Delivered transparent risk scoring with LIME &amp; saliency explanations in an interactive Streamlit dashboard.",
]))
E.append(row("<b>FreshGuard</b> — Explainable Fruit-Quality Inspection &nbsp;<font color='#444444'>| Vision Transformer, PyTorch, LIME, t-SNE</font>", ""))
E.append(bullets([
    "Fine-tuned a Vision Transformer (transfer learning) on the FruitNet dataset for fresh-vs-defective classification; validated reasoning with LIME super-pixels and t-SNE embeddings.",
]))
E.append(row("<b>Bloom XAI</b> — Explainable Flower Classification &nbsp;<font color='#444444'>| ViT, PyTorch, LIME, t-SNE</font>", ""))
E.append(bullets(["Transfer-learned a pretrained ViT for multi-class flower recognition with LIME local explanations and t-SNE class-separation analysis."]))
E.append(row("<b>CIFAR-10 Custom CNN + Explainable AI</b> &nbsp;<font color='#444444'>| PyTorch, Grad-CAM, Saliency, LIME</font>", ""))
E.append(bullets(["Designed and trained a custom CNN from scratch on CIFAR-10; compared Grad-CAM, Saliency, and LIME to interpret model attention."]))
E.append(row("<b>CardioNet</b> — Deep-Learning ECG Arrhythmia Detection &nbsp;<font color='#444444'>| PyTorch, Streamlit, Scikit-learn</font>", "Apr – May 2026"))
E.append(bullets([
    "Custom 1D CNN on the MIT-BIH dataset; interactive Streamlit dashboard for ECG visualization &amp; real-time prediction. Evaluated with Accuracy, Precision, Recall, F1 &amp; confusion matrix. (github.com/xashad/CardioNet)",
]))
E.append(row("<b>GestureRun</b> — AI Gesture-Controlled Endless Runner &nbsp;<font color='#444444'>| Python, OpenCV, MediaPipe, Pygame</font>", "May 2026"))
E.append(bullets(["Real-time webcam hand-gesture recognition for lane switching, jumping, and sliding; built for the HCI &amp; Intelligent Consumer Technologies course. (github.com/xashad/GestureRun)"]))
E.append(row("<b>Resume &amp; Job Match Scorer</b> &nbsp;<font color='#444444'>| SBERT, LIME, Neo4j</font>", ""))
E.append(bullets(["Semantic job-matching with explainable AI (LIME) and a Neo4j skills knowledge graph."]))

E.append(Paragraph("CERTIFICATIONS", h2_s))
E.append(Paragraph('ICCS-2023 "KILBY100" Conference Publication (May 2023) &nbsp;•&nbsp; Neo4j Certified Professional (Jun 2025) &nbsp;•&nbsp; '
                   'AI Engineer for Developers Associate — DataCamp (Mar 2026) &nbsp;•&nbsp; AI Fundamentals — DataCamp (Mar 2026) &nbsp;•&nbsp; '
                   'NASA ARSET Fundamentals of Remote Sensing (Nov 2025) &nbsp;•&nbsp; HP LIFE Design Thinking (Nov 2024)', body_s))

E.append(Paragraph("LANGUAGES", h2_s))
E.append(Paragraph("English (Fluent) &nbsp;•&nbsp; Nepali (Native) &nbsp;•&nbsp; Hindi (Fluent) &nbsp;•&nbsp; Urdu (Fluent) &nbsp;•&nbsp; Italian (Basic A1)", body_s))

doc.build(E)
print("PDF built: Mohammad_Ashad_Khan_Resume.pdf")
