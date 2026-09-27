import { useState, useEffect, useRef, useCallback } from "react";
import imgLabCoat from "../imports/708f458d-58c0-401e-8559-f4cf746dc98d.JPG";
import imgBCVS from "../imports/e2478266-1fb9-450b-90d4-5ee3064dc7d9.jpg";
import imgCCBCGroup from "../imports/CCBC_Fresh_Faces_Oct_2024-435.JPG";
import imgCCBCPromo from "../imports/IMG_1380.JPG";
import imgSuit from "../imports/tempImagegr9OTW.png";
import imgCertCoCurricular from "../imports/ceda8661-725e-486e-8e79-86dd17d862b0.jpg";
import imgCertHonors from "../imports/ceda8661-725e-486e-8e79-86dd17d862b0_2.jpg";
import imgBCVSFrontPage from "../imports/e2478266-1fb9-450b-90d4-5ee3064dc7d9-1.jpg";
import imgScholarshipBadge from "../imports/F366B16E-CE4E-4ECB-B0C3-8330F04F07B8.JPG";
import imgStanfordCert from "../imports/IMG_0008.jpg";
import imgStudentSpotlight from "../imports/IMG_2869.jpg";
import imgMITHacking from "../imports/tempImagek4kABP.png";
import imgCCBCBrochure from "../imports/tempImage6zGv99.png";
import imgMitsunobuPoster from "../imports/tempImagePXwxsG.png";
import imgMitsunobuPoster2 from "../imports/tempImageP1fQbd.png";
import imgCCBCWebsite from "../imports/IMG_2776.PNG";
import imgChesapeakePoster from "../imports/tempImageNPvghQ.png";
import imgPanelGroup from "../imports/tempImage6gONLL.png";
import imgSGATeam from "../imports/IMG_5862.JPG";
import imgCCBCEvent from "../imports/IMG_5863.JPG";
import imgPAHPoster from "../imports/tempImage894MbE.png";
import imgStanfordRadCert from "../imports/IMG_8679.jpg";
import imgGraduation from "../imports/IMG_8755.jpg";
import {
  Menu, X, Download, ExternalLink, ChevronDown, Sun, Moon,
  Mail, Linkedin, MapPin, ArrowRight, Microscope, FlaskConical,
  HeartPulse, Lightbulb, Users, Award, BookOpen, GraduationCap,
  ChevronRight, Globe, Code2, Dna, Building2, Presentation,
  CheckCircle, Clock, FileText, Star, TrendingUp, Landmark,
  Rocket, Heart, ZoomIn, ChevronLeft, Activity, Hospital,
  Telescope, BarChart3, Shield
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "2,000+", label: "Research Hours",              color: "#42A5FF" },
  { value: "500+",   label: "STEM Tutoring Hours",         color: "#30C5D2" },
  { value: "150+",   label: "Cardiology Shadowing Hours",  color: "#D6A94A" },
  { value: "6",      label: "Dean's List Semesters",       color: "#42A5FF" },
  { value: "5+",     label: "Healthcare Projects",         color: "#30C5D2" },
  { value: "20+",    label: "Lab & Analytical Techniques", color: "#D6A94A" },
];

const EDUCATION = [
  {
    school: "Merrimack College",
    degree: "Bachelor of Science in Biochemistry, Honors",
    extras: [
      "Minor: Artificial Intelligence and Data Science",
      "Psychology Certificate (In Progress)",
    ],
    period: "2025 – May 2027 (Expected)",
    location: "North Andover, Massachusetts",
    honors: ["Honors Program", "Merrimack Honors Scholarship", "Outstanding Future Warrior Scholarship"],
    courses: ["Cellular Biochemistry", "Genetics", "Organic Chemistry", "Analytical Chemistry",
              "Inorganic Chemistry", "Biophysical Chemistry", "Directed Research", "Physics", "Java Programming"],
    color: "#42A5FF",
  },
  {
    school: "Community College of Baltimore County",
    degree: "Associate of Science in Biology, Honors",
    extras: ["Global Studies Certificate", "Psychology Certificate"],
    period: "August 2023 – May 2025",
    location: "Baltimore, Maryland",
    honors: ["Magna Cum Laude", "Top 4% of Program", "Phi Theta Kappa Honor Society", "Dean's List × 6"],
    courses: ["Biology", "Anatomy & Physiology", "Microbiology", "General Chemistry",
              "Organic & Biochemistry", "Physics", "Calculus", "Statistics"],
    color: "#30C5D2",
  },
];

const RESEARCH_TIMELINE = [
  { year: "2023–2024", role: "Peer Tutor & Research Student", institution: "CCBC", summary: "Built foundational STEM knowledge while accumulating 500+ tutoring hours across biology, chemistry, and calculus.", color: "#8291A6" },
  { year: "2024", role: "Cardiology Shadowing", institution: "Dr. Hassan Kassam Ali, MD · Baltimore", summary: "150+ hours observing ECG interpretation, echocardiography, stress testing, and cardiovascular diagnostics.", color: "#30C5D2" },
  { year: "Summer 2024", role: "Undergraduate Research Intern", institution: "Fralin Biomedical Research Institute · CardioSURF", summary: "Investigated BMP3 signaling in pulmonary arterial hypertension using mammalian vascular cell models.", color: "#1455D9" },
  { year: "2024", role: "Editorial Intern", institution: "Berkeley Pharma Tech", summary: "Pharmaceutical science editorial and bibliometric research on emerging drug-discovery topics.", color: "#42A5FF" },
  { year: "2024", role: "Bibliometrics Research Intern", institution: "ThinkNeuro", summary: "Systematic literature and bibliometric analysis of neuroscience research trends.", color: "#8291A6" },
  { year: "2024–2025", role: "Molecular Imaging Mini-Fellowship", institution: "Stanford University", summary: "Immersive molecular imaging training and technology-in-healthcare curriculum.", color: "#D6A94A" },
  { year: "2025", role: "Research Assistant", institution: "Boston University · Dr. Richard A. Currie", summary: "Qualitative coding, thematic analysis, and survey-dataset organization for organizational psychology research.", color: "#30C5D2" },
  { year: "2025", role: "Undergraduate Research Assistant", institution: "Merrimack College · SIRF", summary: "Developing greener Mitsunobu methodologies for deuterium-labeled therapeutics under Prof. Santhanaraman.", color: "#1455D9" },
  { year: "Summer 2025", role: "Summer Undergraduate Research Experience", institution: "Keck Graduate Institute (KGI)", summary: "Drug discovery, therapeutic candidate evaluation, translational analysis, and biotech commercialization.", color: "#D6A94A" },
];

const RESEARCH_PROJECTS = [
  {
    id: "cardiosurf",
    title: "BMP3 Signaling in Pulmonary Arterial Hypertension",
    institution: "Fralin Biomedical Research Institute at Virginia Tech",
    program: "CardioSURF",
    role: "Undergraduate Research Intern",
    status: "Completed", statusColor: "#30C5D2",
    summary: "Investigated BMP3 signaling and pulmonary vascular remodeling using vascular cell models from rat, mouse, pig, and human origins.",
    methods: ["Mammalian Cell Culture", "RNA Extraction", "qPCR", "Western Blotting", "ELISA", "Immunofluorescence", "Cryosectioning", "Gene Expression Analysis"],
    presentations: ["American Heart Association BCVS Scientific Sessions", "Virginia Tech Research Symposium", "Fralin Biomedical Research Institute Research Symposium"],
    note: "Work involved animal and human-derived vascular cell models — not a clinical therapy or treatment.",
    icon: HeartPulse, accentColor: "#1455D9",
    whyItMatters: "Pulmonary arterial hypertension is a progressive, life-threatening disease. Understanding BMP signaling pathways opens potential avenues for targeted therapies.",
    whatILearned: "Gained hands-on mastery of cardiovascular cell biology, strengthened scientific communication, and deepened my commitment to translational cardiovascular medicine.",
  },
  {
    id: "mitsunobu",
    title: "Green Mitsunobu Chemistry & Deuterium-Labeled Therapeutics",
    institution: "Merrimack College",
    program: "SIRF — Summer Intensive Research Fellowship",
    role: "Undergraduate Research Assistant",
    mentor: "Prof. Manikandan Santhanaraman",
    status: "In Progress", statusColor: "#D6A94A",
    summary: "Developing greener Mitsunobu methodologies using bio-renewable solvents for synthesis of methyl isotopologues and deuterium-labeled pharmaceutical analogs including deutetrabenazine.",
    methods: ["Organic Synthesis", "NMR Spectroscopy", "HPLC", "TLC", "Preparative TLC", "Flash Chromatography", "Mechanochemical Methods", "Medicinal Chemistry"],
    presentations: ["Northeast Student Chemistry Research Conference · Simmons University", "Merrimack Annual Research and Creative Achievement Conference"],
    note: "Research in progress. Manuscript in preparation. Does not claim clinical validation.",
    icon: FlaskConical, accentColor: "#30C5D2",
    whyItMatters: "Deuterium-labeled drugs can improve metabolic stability and therapeutic windows. Greener synthesis methods reduce environmental impact in pharmaceutical manufacturing.",
    whatILearned: "Developed proficiency in synthetic organic chemistry, green chemistry principles, and the drug discovery pipeline from concept to candidate.",
  },
  {
    id: "bu-psych",
    title: "Organizational Psychology Research",
    institution: "Boston University",
    program: "Research Assistantship",
    role: "Undergraduate Research Assistant",
    mentor: "Richard A. Currie, Ph.D.",
    status: "Completed", statusColor: "#30C5D2",
    summary: "Qualitative analysis of workplace behavior datasets examining boundary expansion, employee experiences, and organizational dynamics.",
    methods: ["Qualitative Coding", "Thematic Analysis", "Survey Dataset Organization", "Participant-Response Analysis"],
    presentations: [],
    note: "Research assistant role. All data anonymized per IRB protocol.",
    icon: Users, accentColor: "#8291A6",
    whyItMatters: "Understanding human behavior in organizations informs how healthcare institutions can create better environments for clinicians, researchers, and patients.",
    whatILearned: "Strengthened qualitative research skills and gained insight into applied behavioral science relevant to organizational health systems.",
  },
  {
    id: "kgi",
    title: "Drug Discovery & Translational Development",
    institution: "Keck Graduate Institute",
    program: "Summer Undergraduate Research Experience (SURE)",
    role: "Research Fellow",
    status: "Completed", statusColor: "#30C5D2",
    summary: "Evaluated therapeutic candidates across scientific, clinical, regulatory, market, and commercialization dimensions for drug-discovery pipelines.",
    methods: ["Therapeutic Candidate Evaluation", "Translational Analysis", "Regulatory Assessment", "Market Research", "Scientific Communication"],
    presentations: [],
    note: "Proprietary project details are confidential. Outcomes updated as documentation is cleared.",
    icon: Dna, accentColor: "#D6A94A",
    whyItMatters: "Understanding the full drug-discovery pipeline — from molecule to market — is essential for translating scientific discoveries into treatments that reach patients.",
    whatILearned: "Gained a comprehensive view of translational medicine, regulatory strategy, and the commercial dimensions of therapeutic development.",
  },
];

const PUBLICATIONS = [
  { id: "mit", title: "A Mechanochemical Mitsunobu Strategy for the Greener Synthesis of Methyl Isotopologues", authors: "Santhanaraman M., Naqvi S.M.A., et al.", year: "2025", type: "Research Manuscript", status: "In Preparation", statusColor: "#D6A94A", venue: "Merrimack College / SIRF", abstract: "Mechanochemical and bio-renewable-solvent approaches to the Mitsunobu reaction for deuterium-labeled pharmaceutical analogs.", category: "Chemistry" },
  { id: "bmp3", title: "Regulation of Bone Morphogenetic Protein 3 in Pulmonary Arterial Hypertension", authors: "Naqvi S.M.A., et al.", year: "2024", type: "Research Abstract / Poster", status: "Poster Presented", statusColor: "#30C5D2", venue: "AHA BCVS Scientific Sessions · Virginia Tech Symposia", abstract: "Characterizes BMP3 expression and regulation in pulmonary vascular cell models, exploring its role in PAH pathogenesis.", category: "Cardiovascular Science" },
  { id: "crypto", title: "Cryptocurrency and Bitcoin: Technical Foundations, Historical Emergence, and Moral Significance", authors: "Naqvi S.M.A.", year: "2024", type: "Manuscript", status: "Manuscript", statusColor: "#8291A6", venue: "Independent Research", abstract: "An interdisciplinary examination of blockchain technology through technical, historical, and ethical frameworks.", category: "Interdisciplinary" },
  { id: "bay", title: "Investigating the Chesapeake Bay: A Comprehensive Research on Environmental and Human Health Impacts", authors: "Naqvi S.M.A.", year: "2024", type: "Research Report", status: "Completed", statusColor: "#30C5D2", venue: "CCBC Research Program", abstract: "Environmental and public-health analysis of Chesapeake Bay water quality, pollution dynamics, and community health outcomes.", category: "Environmental Health" },
];

const STARTUPS = [
  { id: "velyra", name: "Velyra Health", tagline: "Passive, zero-contact physiological monitoring.", role: "Founder", status: "Early Development", statusColor: "#D6A94A", problem: "Continuous vital-sign monitoring requires wearable sensors, creating barriers for vulnerable patients.", solution: "Exploring how computer vision and environmental sensor arrays could enable continuous monitoring of heart rate, respiratory rate, SpO₂, temperature, sleep, and movement — with no device attached.", tech: ["Computer Vision", "AI / ML", "Sensor Fusion", "Edge Computing"], demoLink: "https://velyra-health.lovable.app", disclaimer: "Concept / Early Prototype. Not FDA-cleared. No clinical validation claimed.", accent: "#1455D9" },
  { id: "tidal", name: "Tidal Health", tagline: "Congenital heart disease screening, reimagined.", role: "Contributor", status: "Early Development", statusColor: "#D6A94A", problem: "CHD is under-detected in resource-limited settings where specialized cardiology access is scarce.", solution: "A digital platform supporting CHD screening workflows, monitoring, and clinical decision support.", tech: ["Clinical Workflow Design", "Health Informatics", "Data Analytics"], demoLink: "https://tidal-health-insight.lovable.app", disclaimer: "Concept / Early Development. Not FDA-cleared.", accent: "#30C5D2" },
  { id: "harmona", name: "Harmona Health", tagline: "Personalized mental-health assessment through multimodal biosignals.", role: "Team Contributor", status: "Concept", statusColor: "#8291A6", problem: "Mental-health assessment relies on subjective self-report, limiting objectivity.", solution: "AI-enabled platform integrating EEG, ECG, and large language models to support personalized mental-health evaluation.", tech: ["EEG Analysis", "ECG Analysis", "LLMs", "Clinical AI"], demoLink: "", disclaimer: "Developed during MIT Hacking Medicine. Concept stage. Privacy-first design.", accent: "#D6A94A" },
  { id: "pah", name: "PAH Insight", tagline: "Understanding pulmonary arterial hypertension — research and education.", role: "Creator", status: "Live", statusColor: "#30C5D2", problem: "PAH is a rare cardiovascular disease with limited accessible educational resources.", solution: "Interactive platform presenting PAH research summaries, clinical context, and scientific content accessibly.", tech: ["Science Communication", "Web Application", "Research Synthesis"], demoLink: "https://pah-insight.lovable.app", disclaimer: "Educational only. Does not provide medical advice.", accent: "#1455D9" },
];

const CONFERENCES = [
  { name: "American Heart Association BCVS Scientific Sessions", date: "2024", location: "Chicago, IL", title: "Regulation of BMP3 in Pulmonary Arterial Hypertension", type: "Poster Presentation" },
  { name: "Virginia Tech Research Symposium", date: "2024", location: "Roanoke, VA", title: "BMP3 Signaling and Pulmonary Vascular Remodeling", type: "Poster Presentation" },
  { name: "Fralin Biomedical Research Institute Symposium", date: "2024", location: "Roanoke, VA", title: "BMP3 in PAH — Vascular Cell Model Findings", type: "Poster Presentation" },
  { name: "Northeast Student Chemistry Research Conference", date: "2025", location: "Simmons University, Boston, MA", title: "Green Mitsunobu Strategy for Deuterium-Labeled Therapeutics", type: "Poster / Oral Presentation" },
  { name: "Merrimack Annual Research and Creative Achievement Conference", date: "2025", location: "North Andover, MA", title: "Greener Synthesis of Methyl Isotopologues via Mechanochemical Mitsunobu", type: "Poster Presentation" },
];

const FELLOWSHIPS = [
  { name: "CardioSURF", org: "Fralin Biomedical Research Institute / Virginia Tech", year: "2024", type: "Research Program" },
  { name: "Stanford Molecular Imaging Mini-Fellowship", org: "Stanford University", year: "2024", type: "Fellowship" },
  { name: "Stanford Technology in Healthcare", org: "Stanford University", year: "2024", type: "Program" },
  { name: "SIRF Research Fellowship", org: "Merrimack College", year: "2025", type: "Research Fellowship" },
  { name: "ThinkNeuro Bibliometrics Internship", org: "ThinkNeuro", year: "2024", type: "Research Internship" },
  { name: "Berkeley Pharma Tech Editorial Internship", org: "Berkeley Pharma Tech", year: "2024", type: "Editorial Internship" },
  { name: "Summer Undergraduate Research Experience (SURE)", org: "Keck Graduate Institute", year: "2025", type: "Research Program" },
  { name: "Mayo Clinic Undergraduate Plummer Scholars", org: "Mayo Clinic", year: "2025", type: "Scholars Program" },
  { name: "NYU Rising Docs Scholar", org: "New York University", year: "2025", type: "Scholars Program" },
];

const AWARDS = [
  { name: "Dean's List", org: "CCBC & Merrimack College", detail: "Six consecutive semesters", gold: true },
  { name: "Magna Cum Laude", org: "Community College of Baltimore County", detail: "Top 4% of program", gold: true },
  { name: "Merrimack Honors Scholarship", org: "Merrimack College", detail: "Merit-based academic scholarship", gold: false },
  { name: "Outstanding Future Warrior Scholarship", org: "Merrimack College", detail: "Awarded at matriculation", gold: false },
  { name: "Phi Theta Kappa Scholarship", org: "Phi Theta Kappa Honor Society", detail: "Academic excellence honor", gold: true },
  { name: "Presidential Honors Scholarship", org: "CCBC", detail: "Presidential recognition award", gold: false },
  { name: "Alex and Coppinger Scholarship", org: "CCBC Foundation", detail: "Foundation merit scholarship", gold: false },
  { name: "AJ Guckert Memorial Scholarship", org: "CCBC Foundation", detail: "Foundation memorial scholarship", gold: false },
  { name: "L. Isennock Phi Theta Kappa Scholarship", org: "Phi Theta Kappa", detail: "Chapter scholarship award", gold: false },
];

const LEADERSHIP = [
  { role: "Student Government Association President", org: "Community College of Baltimore County", period: "2024–2025", icon: Users },
  { role: "Student Honors Council Vice President", org: "CCBC", period: "2024–2025", icon: Award },
  { role: "International Student Association President", org: "CCBC", period: "2024–2025", icon: Globe },
  { role: "Resident Advisor", org: "Merrimack College", period: "2025–Present", icon: Building2 },
  { role: "Global Ambassador", org: "CCBC", period: "2024–2025", icon: Globe },
  { role: "Student Ambassador", org: "CCBC", period: "2023–2025", icon: Star },
  { role: "Phi Theta Kappa Honor Society", org: "CCBC Chapter", period: "2024–2025", icon: Award },
  { role: "Administrative Support Assistant", org: "Student Engagement Office, CCBC", period: "2023–2025", icon: Users },
];

const SKILLS_CATS = [
  { cat: "Molecular & Cell Biology", icon: Microscope, color: "#1455D9", skills: ["Mammalian Cell Culture", "RNA Extraction", "qPCR", "Western Blotting", "ELISA", "Immunofluorescence", "Immunostaining", "Cryosectioning", "Micropipetting"] },
  { cat: "Analytical & Synthetic Chemistry", icon: FlaskConical, color: "#30C5D2", skills: ["HPLC", "NMR Spectroscopy", "TLC", "Preparative TLC", "Flash Chromatography", "UV-Vis Spectroscopy", "Gas Chromatography", "Organic Synthesis", "Medicinal Chemistry"] },
  { cat: "Research & Scientific Writing", icon: BookOpen, color: "#D6A94A", skills: ["Experimental Design", "Literature Review", "Scientific Writing", "Manuscript Preparation", "Poster Development", "Statistical Analysis", "Qualitative Coding", "Bibliometric Analysis"] },
  { cat: "Programming & Data Science", icon: Code2, color: "#42A5FF", skills: ["Python", "R", "Java", "Excel", "Data Visualization", "Machine Learning Fundamentals", "Predictive Modeling", "Computational Analysis"] },
  { cat: "Strategy, Finance & Innovation", icon: TrendingUp, color: "#D6A94A", skills: ["Healthcare Strategy", "Market Research", "Company Valuation Fundamentals", "Translational Analysis", "Clinical Needs Assessment", "Product Strategy", "Healthcare Workflow Design"] },
];

// ─── VISION DATA ─────────────────────────────────────────────────────────────

const ECOSYSTEM_NODES = [
  { label: "Medicine",         desc: "Understanding disease through direct patient care and clinical responsibility.", color: "#42A5FF", ring: 1, angle: 0 },
  { label: "Research",         desc: "Studying biological mechanisms and generating evidence that leads to new therapies.", color: "#42A5FF", ring: 1, angle: 90 },
  { label: "Technology",       desc: "Transforming scientific and clinical insight into scalable tools and platforms.", color: "#42A5FF", ring: 1, angle: 180 },
  { label: "Entrepreneurship", desc: "Building organizations that bring new healthcare solutions to patients at scale.", color: "#42A5FF", ring: 1, angle: 270 },
  { label: "Consulting",       desc: "Learning how healthcare organizations solve complex strategic and operational challenges.", color: "#30C5D2", ring: 2, angle: 0 },
  { label: "Inv. Banking",     desc: "Understanding transactions, capital formation, mergers, acquisitions, and growth financing.", color: "#30C5D2", ring: 2, angle: 51 },
  { label: "Venture Capital",  desc: "Supporting early-stage founders and technologies with potential to transform healthcare.", color: "#30C5D2", ring: 2, angle: 102 },
  { label: "HC Investing",     desc: "Deploying capital into healthcare innovation across private and public markets.", color: "#30C5D2", ring: 2, angle: 153 },
  { label: "Public Markets",   desc: "Studying companies, industries, risk, valuation, and capital allocation at scale.", color: "#30C5D2", ring: 2, angle: 204 },
  { label: "Hedge Funds",      desc: "Developing expertise in market analysis, risk management, and complex investment strategies.", color: "#30C5D2", ring: 2, angle: 255 },
  { label: "Trading",          desc: "Building discipline in decision-making under uncertainty, probability, and market dynamics.", color: "#30C5D2", ring: 2, angle: 306 },
  { label: "Hospitals",        desc: "Building institutions that combine patient care, research, education, and community access.", color: "#D6A94A", ring: 3, angle: 0 },
  { label: "Research Centers", desc: "Creating environments where scientists, clinicians, and entrepreneurs collaborate.", color: "#D6A94A", ring: 3, angle: 45 },
  { label: "Universities",     desc: "Developing institutions that expand education, research, and scientific opportunity.", color: "#D6A94A", ring: 3, angle: 90 },
  { label: "HC Systems",       desc: "Designing systems that improve access, outcomes, and efficiency at population level.", color: "#D6A94A", ring: 3, angle: 135 },
  { label: "Real Estate",      desc: "Building a durable financial foundation for institution development and independence.", color: "#D6A94A", ring: 3, angle: 180 },
  { label: "Public Service",   desc: "Contributing to systems that shape healthcare access, research funding, and education.", color: "#D6A94A", ring: 3, angle: 225 },
  { label: "Health Policy",    desc: "Shaping evidence-based policy where healthcare, research, and economics intersect.", color: "#D6A94A", ring: 3, angle: 270 },
  { label: "Philanthropy",     desc: "Using success to create opportunities for future researchers, physicians, and builders.", color: "#D6A94A", ring: 3, angle: 315 },
];

const PILLARS = [
  {
    n: "01", title: "Medicine & Science", icon: HeartPulse, color: "#42A5FF",
    desc: "My primary professional goal is to pursue physician-scientist training and contribute to cardiovascular medicine, translational research, and the development of therapies that move from scientific discovery to patient care.",
    tags: ["MD–PhD Training", "Physician-Scientist", "Cardiovascular Medicine", "Translational Research", "Drug Discovery", "Molecular Biology", "Medicinal Chemistry", "Biomedical Innovation"],
    note: null,
  },
  {
    n: "02", title: "Healthcare Technology & Entrepreneurship", icon: Rocket, color: "#30C5D2",
    desc: "I am interested in building healthcare technologies and companies that transform scientific insight into practical, scalable solutions for patients and healthcare systems.",
    tags: ["AI in Healthcare", "Digital Health", "Remote Monitoring", "Medical Devices", "Biotechnology", "Startup Development", "Product Development", "Healthcare Accessibility"],
    note: "Projects: Velyra Health · Tidal Health · Harmona Health · PressSure · PAH Insight",
  },
  {
    n: "03", title: "Strategy, Finance & Investment", icon: TrendingUp, color: "#D6A94A",
    desc: "I want to understand how strategy and capital determine which scientific and healthcare ideas receive support, how companies grow, and how innovations ultimately reach patients.",
    tags: ["Management Consulting", "Investment Banking", "Venture Capital", "Healthcare PE", "Hedge Funds", "Public Markets", "Trading", "Company Valuation", "Capital Allocation", "Healthcare Economics"],
    note: null,
  },
  {
    n: "04", title: "Institution Building & Public Impact", icon: Landmark, color: "#D6A94A",
    desc: "My long-term ambition is to build hospitals, research centers, educational institutions, companies, and investment platforms that create lasting scientific, economic, and social impact.",
    tags: ["Hospital Development", "Research Centers", "Universities", "Healthcare Real Estate", "Asset Ownership", "Investment Platforms", "Public Service", "Health Policy", "Philanthropy"],
    note: null,
  },
];

const ROADMAP_PHASES = [
  { phase: "Phase I", title: "Foundation", status: "Current", color: "#42A5FF", items: ["Complete undergraduate education", "Continue biomedical research", "Expand laboratory expertise", "Develop computational and AI skills", "Publish and present research", "Build clinical exposure", "Develop healthcare projects", "Study finance, economics, and strategy", "Prepare for advanced training"] },
  { phase: "Phase II", title: "Advanced Training", status: "Upcoming", color: "#30C5D2", items: ["MD–PhD or physician-scientist training", "Cardiovascular research", "Clinical education", "Translational medicine", "Business and management education", "Healthcare entrepreneurship", "Consulting or finance exposure"] },
  { phase: "Phase III", title: "Building & Investing", status: "Long-Term", color: "#D6A94A", items: ["Lead research programs", "Practice medicine or contribute clinically", "Build healthcare and biotechnology companies", "Invest in healthcare innovation", "Gain expertise in venture capital and public markets", "Form strategic partnerships", "Develop scalable institutions"] },
  { phase: "Phase IV", title: "Institutional Impact", status: "Vision", color: "#8291A6", items: ["Build or own hospitals", "Establish research centers", "Create educational institutions", "Build investment organizations", "Develop healthcare real estate", "Support philanthropy", "Participate in public service", "Contribute to health and education policy"] },
];

const FUTURE_BUILDS = [
  { name: "Cardiovascular Research Center", icon: Microscope, color: "#1455D9", desc: "A dedicated institution where scientists, clinicians, and engineers work together on heart disease from molecular to clinical scale." },
  { name: "Integrated Hospital System", icon: Hospital, color: "#30C5D2", desc: "Healthcare institutions combining patient care, research, medical education, and community access." },
  { name: "Biotechnology Companies", icon: FlaskConical, color: "#42A5FF", desc: "Organizations translating scientific discoveries into therapies, diagnostics, and technologies that reach patients." },
  { name: "Healthcare Innovation Fund", icon: TrendingUp, color: "#D6A94A", desc: "A venture and investment platform supporting early-stage founders working on transformative healthcare technologies." },
  { name: "Educational Institution", icon: GraduationCap, color: "#30C5D2", desc: "A university or research training program that expands access to rigorous scientific and medical education." },
  { name: "Philanthropic Foundation", icon: Heart, color: "#D6A94A", desc: "A foundation creating opportunities for the next generation of researchers, physicians, builders, and public servants." },
];

const CURRENTLY_EXPLORING = [
  "Drug Discovery & Commercialization", "AI-Enabled Healthcare Monitoring",
  "Cardiovascular Research", "Healthcare Consulting",
  "Biotechnology Investing", "Venture Capital Fundamentals",
  "Financial Markets & Valuation", "Healthcare Strategy",
];

// ─── GALLERY DATA ─────────────────────────────────────────────────────────────

const GALLERY_CATS = [
  "All", "Research & Lab", "Conferences", "Leadership", "Teaching",
  "Healthcare Innovation", "Awards & Recognition", "Campus Life",
  "Clinical Training", "Professional Portraits",
];

const GALLERY_ITEMS = [
  // ── Research & Lab ──────────────────────────────────────────────────────────
  { id: 10, label: "Upload CardioSURF lab photograph", caption: "Conducting cardiovascular research at the Fralin Biomedical Research Institute.",                      cat: "Research & Lab",        h: 220, album: "Virginia Tech CardioSURF" },
  { id: 15, label: "Upload KGI research photograph",   caption: "Participating in drug discovery and translational research at Keck Graduate Institute.",               cat: "Research & Lab",        h: 200, album: "KGI SURE" },
  // ── Conferences ─────────────────────────────────────────────────────────────
  { id: 2,  img: imgBCVSFrontPage,   caption: "Featured on the AHA Basic Cardiovascular Sciences 2025 conference page — Baltimore, Maryland, July 23–26, 2025.",       cat: "Conferences",           h: 360, album: "American Heart Association BCVS" },
  { id: 20, img: imgBCVS,            caption: "Networking at the American Heart Association BCVS Scientific Sessions with fellow cardiovascular scientists.",            cat: "Conferences",           h: 260, album: "American Heart Association BCVS" },
  { id: 3,  img: imgMitsunobuPoster, caption: "Presenting green Mitsunobu chemistry research at the Merrimack College Annual Research and Creative Achievement Conference.", cat: "Conferences",        h: 320, album: "Simmons Chemistry Conference" },
  { id: 21, img: imgMitsunobuPoster2,caption: "Poster presentation on mechanochemical Mitsunobu methodology for deuterium-labeled pharmaceutical analogs.",             cat: "Conferences",           h: 340, album: "Simmons Chemistry Conference" },
  { id: 11, label: "Upload Virginia Tech symposium photograph", caption: "Presenting at the Virginia Tech Research Symposium.",                                          cat: "Conferences",           h: 240, album: "Virginia Tech CardioSURF" },
  // ── Healthcare Innovation ───────────────────────────────────────────────────
  { id: 8,  img: imgMITHacking,      caption: "Team at MIT Hacking Medicine — developing Harmona Health, a multimodal mental-health assessment platform.",              cat: "Healthcare Innovation",  h: 300, album: "Healthcare Hackathons" },
  // ── Awards & Recognition ────────────────────────────────────────────────────
  { id: 7,  img: imgCertCoCurricular,caption: "Outstanding Co-Curricular Involvement Award — CCBC Student Engagement Awards Banquet, 2024–2025.",                       cat: "Awards & Recognition",  h: 280, album: "CCBC Graduation" },
  { id: 16, img: imgCertHonors,      caption: "CCBC Honors College Certificate of Completion — recognized for completing all Honors College program requirements.",     cat: "Awards & Recognition",  h: 260, album: "CCBC Graduation" },
  { id: 17, img: imgStanfordCert,    caption: "Stanford Medicine Certificate of Achievement — Technology in Healthcare Fall 2025 Internship Program.",                  cat: "Awards & Recognition",  h: 300, album: "CCBC Graduation" },
  { id: 18, img: imgScholarshipBadge,caption: "CCBC Scholarship Recipient & Speaker ribbons — AJ Guckert, Alex & Coppinger, and Isennock Memorial Scholarships.",      cat: "Awards & Recognition",  h: 220, album: "CCBC Graduation" },
  // ── Campus Life ─────────────────────────────────────────────────────────────
  { id: 12, img: imgCCBCGroup,       caption: "Part of the vibrant student community at the Community College of Baltimore County, October 2024.",                      cat: "Campus Life",           h: 260, album: "Campus Leadership" },
  { id: 19, img: imgStudentSpotlight,caption: "Featured in the CCBC Honors College Student Spotlight as a pre-med biology student and Honors Council VP.",              cat: "Campus Life",           h: 320, album: "Campus Leadership" },
  { id: 22, img: imgCCBCBrochure,    caption: "Featured on the cover of the CCBC Health Career Options brochure.",                                                      cat: "Campus Life",           h: 240, album: "Campus Leadership" },
  // ── Professional Portraits ──────────────────────────────────────────────────
  // ── Leadership ──────────────────────────────────────────────────────────────
  { id: 5,  label: "Upload SGA leadership photograph", caption: "Serving as Student Government Association President at the Community College of Baltimore County.",    cat: "Leadership",            h: 340, album: "Student Government" },
  // ── Clinical Training ───────────────────────────────────────────────────────
  { id: 14, label: "Upload EMT training photograph", caption: "EMT-Basic training — National EMS Institute.",                                                           cat: "Clinical Training",     h: 220, album: "Campus Leadership" },
  // ── Teaching ────────────────────────────────────────────────────────────────
  { id: 6,  label: "Upload tutoring photograph", caption: "Supporting students through more than 500 hours of STEM tutoring.",                                          cat: "Teaching",              h: 200, album: "Campus Leadership" },
  // ── Batch 3 ─────────────────────────────────────────────────────────────────
  { id: 23, img: imgPAHPoster,        caption: "Presenting BMP3 signaling research in pulmonary arterial hypertension at the Fralin Biomedical Research Institute, Virginia Tech — CardioSURF 2024.", cat: "Conferences",           h: 300, album: "Virginia Tech CardioSURF" },
  { id: 24, img: imgChesapeakePoster, caption: "Chesapeake Bay environmental and human health impacts research — poster presentation, CCBC 2024.",                       cat: "Research & Lab",        h: 260, album: "Environmental Field Research" },
  { id: 25, img: imgGraduation,       caption: "Graduating from the Community College of Baltimore County — receiving diploma on stage, May 2025.",                     cat: "Awards & Recognition",  h: 380, album: "CCBC Graduation" },
  { id: 26, img: imgStanfordRadCert,  caption: "Stanford Medicine Radiology — Summer 2025 Mini-Fellowship on Molecular Imaging Techniques, June–August 2025.",          cat: "Awards & Recognition",  h: 280, album: "CCBC Graduation" },
  { id: 27, img: imgSGATeam,          caption: "With the CCBC Student Ambassador team — building community and supporting student engagement across campus.",            cat: "Leadership",            h: 300, album: "Student Government" },
  { id: 28, img: imgPanelGroup,       caption: "Representing CCBC at a formal academic leadership panel event.",                                                        cat: "Leadership",            h: 240, album: "Student Government" },
  { id: 29, img: imgCCBCEvent,        caption: "Part of a large CCBC student community gathering — connecting students across campus programs and backgrounds.",        cat: "Campus Life",           h: 260, album: "Campus Leadership" },
  { id: 30, img: imgCCBCWebsite,      caption: "Featured on the CCBC homepage — \"Skills. Knowledge. Opportunity.\"",                                                  cat: "Campus Life",           h: 320, album: "Campus Leadership" },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return { ref, v };
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, v } = useInView();
  return (
    <div ref={ref} className={className}
      style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(24px)", transition: `opacity .65s ease ${delay}ms, transform .65s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

function Label({ children, color = "#42A5FF" }: { children: React.ReactNode; color?: string }) {
  return <p className="text-[10px] font-black tracking-[0.22em] uppercase mb-4" style={{ color }}>{children}</p>;
}

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full"
      style={{ background: `${color}1A`, color, border: `1px solid ${color}3A` }}>
      <span className="size-1.5 rounded-full flex-shrink-0" style={{ background: color }} />{label}
    </span>
  );
}

function SectionDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className="flex items-center gap-4 max-w-7xl mx-auto px-6 py-2 opacity-30" style={{ transform: flip ? "scaleX(-1)" : "none" }}>
      <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg,#1455D9,transparent)" }} />
      <Activity size={12} style={{ color: "#42A5FF" }} />
      <div className="w-16 h-px" style={{ background: "#42A5FF40" }} />
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────

function Nav({ theme, setTheme }: { theme: string; setTheme: (v: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [prog, setProg] = useState(0);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 50);
      const max = document.body.scrollHeight - window.innerHeight;
      setProg(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };

  const links = [
    { l: "Story", id: "story" }, { l: "Research", id: "research" },
    { l: "Innovation", id: "innovation" }, { l: "Vision", id: "vision" },
    { l: "Leadership", id: "leadership" }, { l: "Gallery", id: "gallery" },
    { l: "Contact", id: "contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        style={{ background: scrolled ? "rgba(4,9,15,.95)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,.07)" : "none" }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3 group">
            <div className="size-9 rounded-lg flex items-center justify-center font-black text-sm"
              style={{ background: "linear-gradient(135deg,#1455D9,#42A5FF)", color: "#fff", fontFamily: "DM Serif Display,serif", letterSpacing: ".05em" }}>MAN</div>
            <span className="hidden sm:block text-sm font-semibold text-white/60 group-hover:text-white transition-colors">Muhammad Ali Naqvi</span>
          </button>
          <div className="hidden xl:flex items-center gap-7">
            {links.map(({ l, id }) => (
              <button key={id} onClick={() => go(id)}
                className="text-[11px] font-bold tracking-[.12em] uppercase text-white/50 hover:text-white transition-colors">{l}</button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="size-9 rounded-lg flex items-center justify-center text-white/50 hover:text-white transition-colors"
              style={{ background: "rgba(255,255,255,.06)" }}>
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <a href="#" className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg,#1455D9,#2563eb)", color: "#fff" }}>
              <Download size={12} /> CV
            </a>
            <button onClick={() => setOpen(true)} className="xl:hidden size-9 rounded-lg flex items-center justify-center text-white/50"
              style={{ background: "rgba(255,255,255,.06)" }}>
              <Menu size={17} />
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 h-[2px] transition-all duration-100"
          style={{ width: `${prog}%`, background: "linear-gradient(90deg,#1455D9,#42A5FF,#30C5D2)" }} />
      </nav>

      {/* Mobile menu */}
      <div className="fixed inset-0 z-[100] xl:hidden flex flex-col transition-all duration-300"
        style={{ background: "#07111F", opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}>
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
          <span className="font-semibold text-white" style={{ fontFamily: "DM Serif Display,serif" }}>Muhammad Ali Naqvi</span>
          <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white"><X size={21} /></button>
        </div>
        <div className="flex-1 flex flex-col justify-center px-10 gap-1">
          {links.map(({ l, id }) => (
            <button key={id} onClick={() => go(id)}
              className="text-left text-3xl py-3 border-b border-white/[.06] text-white/60 hover:text-white transition-colors"
              style={{ fontFamily: "DM Serif Display,serif" }}>{l}</button>
          ))}
          <a href="#" className="mt-8 flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold w-fit"
            style={{ background: "#1455D9", color: "#fff" }}><Download size={14} /> Download CV</a>
        </div>
      </div>
    </>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function Hero() {
  const roles = ["Biomedical Researcher", "Healthcare Entrepreneur", "Aspiring Physician-Scientist", "Biochemistry Honors Student"];
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const iv = setInterval(() => {
      setFade(false);
      setTimeout(() => { setIdx(i => (i + 1) % roles.length); setFade(true); }, 350);
    }, 3000);
    return () => clearInterval(iv);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "linear-gradient(155deg,#030810 0%,#07111F 45%,#0b1a2e 100%)" }}>
      <div className="absolute inset-0 opacity-[.022]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />
      <div className="absolute top-1/3 left-1/4 size-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(20,85,217,.14) 0%,transparent 65%)", filter: "blur(50px)" }} />
      <div className="absolute bottom-1/3 right-1/4 size-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(48,197,210,.09) 0%,transparent 65%)", filter: "blur(60px)" }} />
      <div className="absolute top-0 inset-x-0 h-[2px]"
        style={{ background: "linear-gradient(90deg,transparent,#1455D9 25%,#42A5FF 60%,transparent)" }} />

      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-[1fr_360px] gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8" style={{ background: "#42A5FF" }} />
              <span className="text-[10px] font-black tracking-[.25em] uppercase" style={{ color: "#42A5FF" }}>Merrimack College · North Andover, MA</span>
            </div>
            <h1 className="text-5xl sm:text-6xl xl:text-[72px] font-normal leading-[1.04] text-white mb-5">
              Muhammad<br />
              <span style={{ backgroundImage: "linear-gradient(135deg,#42A5FF,#30C5D2)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Ali Naqvi</span>
            </h1>
            <div className="h-9 flex items-center mb-5">
              <span className="text-xl font-semibold"
                style={{ color: "#30C5D2", opacity: fade ? 1 : 0, transform: fade ? "none" : "translateY(6px)", transition: "opacity .35s,transform .35s", display: "block" }}>
                {roles[idx]}
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-lg mb-2" style={{ color: "#8291A6" }}>
              I work at the intersection of biomedical research, cardiovascular medicine, artificial intelligence, and entrepreneurship to build solutions that improve human health.
            </p>
            <p className="text-sm font-semibold max-w-lg mb-10" style={{ color: "#42A5FF" }}>
              Exploring how science, technology, entrepreneurship, strategy, and capital can improve healthcare at scale.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <button onClick={() => document.getElementById("research")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90 hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg,#1455D9,#2563eb)", color: "#fff" }}>
                Explore Research <ArrowRight size={14} />
              </button>
              <button onClick={() => document.getElementById("vision")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5"
                style={{ background: "rgba(214,169,74,.1)", color: "#D6A94A", border: "1px solid rgba(214,169,74,.35)" }}>
                <Telescope size={14} /> Explore My Vision
              </button>
              <button onClick={() => document.getElementById("innovation")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all hover:bg-white/10"
                style={{ border: "1px solid rgba(255,255,255,.15)", color: "#F4F8FC" }}>
                View Projects
              </button>
            </div>
            <div className="flex items-center gap-6">
              <a href="mailto:naqvis@merrimack.edu" className="flex items-center gap-1.5 text-xs transition-colors hover:text-white" style={{ color: "#8291A6" }}>
                <Mail size={12} /> naqvis@merrimack.edu
              </a>
              <a href="https://www.linkedin.com/in/muhammad-ali-naqvi-b78902323" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs transition-colors hover:text-white" style={{ color: "#8291A6" }}>
                <Linkedin size={12} /> LinkedIn
              </a>
            </div>
          </div>

          {/* Portrait card */}
          <div className="relative">
            <div className="relative mx-auto aspect-[3/4] rounded-3xl overflow-hidden"
              style={{ border: "1px solid rgba(66,165,255,.15)" }}>
              <img src={imgLabCoat} alt="Muhammad Ali Naqvi in the anatomy lab holding a heart model"
                className="w-full h-full object-cover object-center" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,transparent 55%,#07111F 100%)" }} />
              <div className="absolute bottom-0 inset-x-0 h-[3px]" style={{ background: "linear-gradient(90deg,#1455D9,#42A5FF,#30C5D2)" }} />
            </div>
            <div className="absolute -bottom-4 -left-4 px-4 py-2.5 rounded-xl backdrop-blur-sm"
              style={{ background: "rgba(13,26,42,.97)", border: "1px solid rgba(66,165,255,.2)" }}>
              <p className="text-[9px] font-black uppercase tracking-widest mb-0.5" style={{ color: "#42A5FF" }}>Currently</p>
              <p className="text-xs font-bold text-white">Biochemistry Honors · Merrimack</p>
            </div>
            <div className="absolute -top-4 -right-4 px-4 py-2.5 rounded-xl backdrop-blur-sm"
              style={{ background: "rgba(13,26,42,.97)", border: "1px solid rgba(214,169,74,.2)" }}>
              <p className="text-[9px] font-black uppercase tracking-widest mb-0.5" style={{ color: "#D6A94A" }}>2,000+</p>
              <p className="text-xs font-bold text-white">Research Hours</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
        <span className="text-[9px] uppercase tracking-[.2em]" style={{ color: "#8291A6" }}>Scroll</span>
        <ChevronDown size={14} style={{ color: "#8291A6" }} />
      </div>
    </section>
  );
}

// ─── STATS ───────────────────────────────────────────────────────────────────

function Stats() {
  return (
    <section style={{ background: "#050E1A", borderBottom: "1px solid rgba(255,255,255,.05)" }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px" style={{ background: "rgba(255,255,255,.04)" }}>
          {STATS.map((s, i) => (
            <FadeUp key={s.label} delay={i * 60} className="p-7 text-center" style={{ background: "#050E1A" } as React.CSSProperties}>
              <div className="text-2xl xl:text-3xl font-black mb-1" style={{ color: s.color, fontFamily: "DM Serif Display,serif" }}>{s.value}</div>
              <div className="text-[9px] font-black uppercase tracking-widest" style={{ color: "#8291A6" }}>{s.label}</div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── STORY ───────────────────────────────────────────────────────────────────

function Story() {
  return (
    <section id="story" style={{ background: "#F7F9FC" }}>
      <div className="max-w-7xl mx-auto px-6 py-28">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <FadeUp>
            <div className="grid grid-cols-2 gap-4 h-full">
              {/* Main portrait */}
              <div className="col-span-2 rounded-3xl overflow-hidden relative" style={{ height: 340, border: "1px solid #DCE5EF" }}>
                <img src={imgCCBCPromo} alt="Muhammad Ali Naqvi — CCBC featured student"
                  className="w-full h-full object-cover object-top" />
                <div className="absolute top-0 left-0 w-1.5 h-28 rounded-r" style={{ background: "linear-gradient(to bottom,#1455D9,#42A5FF)" }} />
              </div>
              {/* Professional portrait — suit photo, natural landscape */}
              <div className="rounded-2xl overflow-hidden relative" style={{ height: 220, border: "1px solid #DCE5EF", gridColumn: "1" }}>
                <img src={imgSuit} alt="Muhammad Ali Naqvi — professional portrait"
                  className="w-full h-full object-cover object-center" />
              </div>
              {/* CCBC campus */}
              <div className="rounded-2xl overflow-hidden relative" style={{ height: 220, border: "1px solid #DCE5EF" }}>
                <img src={imgCCBCGroup} alt="CCBC campus community"
                  className="w-full h-full object-cover object-center" />
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={150}>
            <Label color="#1455D9">My Journey</Label>
            <h2 className="text-4xl xl:text-5xl leading-[1.08] mb-8" style={{ color: "#102033" }}>
              Driven by Purpose,<br /><em>Grounded in Science</em>
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "#5A6B7E", maxWidth: "52ch" }}>
              My path has been shaped by curiosity, responsibility, and a belief that science should improve real lives. From beginning my undergraduate journey at a community college to contributing to cardiovascular and medicinal chemistry research, each opportunity has strengthened my commitment to becoming a physician-scientist.
            </p>
            <blockquote className="pl-6 py-4 mb-8 rounded-r-xl"
              style={{ borderLeft: "3px solid #D6A94A", background: "rgba(214,169,74,.06)" }}>
              <p className="text-lg italic leading-relaxed" style={{ color: "#102033", fontFamily: "DM Serif Display,serif" }}>
                &ldquo;Every experience — in the lab, the clinic, or the classroom — has only deepened my commitment to medicine, research, and service.&rdquo;
              </p>
            </blockquote>
            <div className="grid grid-cols-2 gap-3">
              {["2,000+ research hours","500+ tutoring hours","4+ research settings","Multiple conference presentations","Healthcare startup development","Dean's List × 6 semesters"].map(item => (
                <div key={item} className="flex items-center gap-2 text-sm" style={{ color: "#5A6B7E" }}>
                  <CheckCircle size={13} style={{ color: "#30C5D2", flexShrink: 0 }} /> {item}
                </div>
              ))}
            </div>
          </FadeUp>
        </div>

        {/* Why I care */}
        <FadeUp delay={100} className="mt-20">
          <div className="p-8 lg:p-12 rounded-2xl" style={{ background: "#102033" }}>
            <div className="grid lg:grid-cols-[1fr_2fr] gap-10 items-center">
              <div>
                <Label color="#42A5FF">Why Healthcare</Label>
                <h3 className="text-3xl text-white leading-snug">Why I care about improving health at scale</h3>
              </div>
              <div className="space-y-4 text-sm leading-relaxed" style={{ color: "#8291A6" }}>
                <p>Healthcare sits at the intersection of every domain I care about — science, technology, economics, institutions, and human dignity. My clinical exposure during cardiology shadowing showed me how much disease costs patients and families. My research experience showed me how much remains unknown at the molecular level.</p>
                <p>This gap between scientific potential and patient reality is what drives me. I want to understand it from every angle — the laboratory, the clinic, the startup, the boardroom, the capital markets, the institution, and the policy level — so that one day I can contribute to closing it.</p>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── EDUCATION ───────────────────────────────────────────────────────────────

function Education() {
  const [exp, setExp] = useState<number | null>(null);
  return (
    <section id="education" style={{ background: "#07111F" }}>
      <div className="max-w-7xl mx-auto px-6 py-28">
        <FadeUp className="text-center mb-20">
          <Label>Academic Foundation</Label>
          <h2 className="text-4xl xl:text-5xl text-white">Education</h2>
        </FadeUp>
        <div className="grid md:grid-cols-2 gap-8">
          {EDUCATION.map((edu, i) => (
            <FadeUp key={edu.school} delay={i * 120}>
              <div className="rounded-2xl overflow-hidden h-full" style={{ background: "#0D1A2A", border: "1px solid rgba(255,255,255,.08)" }}>
                <div className="h-[3px]" style={{ background: `linear-gradient(90deg,${edu.color},transparent)` }} />
                <div className="p-8">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div>
                      <h3 className="text-xl text-white mb-1">{edu.school}</h3>
                      <p className="text-sm font-bold mb-1" style={{ color: edu.color }}>{edu.degree}</p>
                      {edu.extras.map(e => (
                        <p key={e} className="text-xs mb-0.5" style={{ color: "#8291A6" }}>{e}</p>
                      ))}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-[11px] font-semibold" style={{ color: "#8291A6" }}>{edu.period}</p>
                      <div className="flex items-center gap-1 mt-1 justify-end">
                        <MapPin size={10} style={{ color: "#8291A6" }} />
                        <p className="text-[11px]" style={{ color: "#8291A6" }}>{edu.location}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {edu.honors.map(h => (
                      <span key={h} className="text-[11px] px-2.5 py-1 rounded-full font-bold"
                        style={{ background: `${edu.color}1A`, color: edu.color }}>{h}</span>
                    ))}
                  </div>
                  <button onClick={() => setExp(exp === i ? null : i)}
                    className="flex items-center gap-2 text-xs font-bold transition-colors hover:text-white" style={{ color: "#8291A6" }}>
                    <ChevronDown size={13} style={{ transform: exp === i ? "rotate(180deg)" : "none", transition: "transform .3s" }} />
                    {exp === i ? "Hide" : "View"} Coursework
                  </button>
                  {exp === i && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {edu.courses.map(c => (
                        <span key={c} className="text-[11px] px-2.5 py-1.5 rounded-lg"
                          style={{ background: "rgba(255,255,255,.04)", color: "#8291A6", border: "1px solid rgba(255,255,255,.07)" }}>{c}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── RESEARCH TIMELINE ───────────────────────────────────────────────────────

function ResearchTimeline() {
  return (
    <section style={{ background: "#F7F9FC" }}>
      <div className="max-w-5xl mx-auto px-6 py-28">
        <FadeUp className="mb-20">
          <Label color="#1455D9">The Research Journey</Label>
          <h2 className="text-4xl xl:text-5xl leading-[1.08]" style={{ color: "#102033" }}>
            From the classroom<br /><em>to the frontlines of science</em>
          </h2>
        </FadeUp>
        <div className="relative">
          <div className="absolute left-[88px] top-0 bottom-0 w-px opacity-30"
            style={{ background: "linear-gradient(to bottom,#1455D9,#30C5D2 50%,#D6A94A)" }} />
          <div className="space-y-10">
            {RESEARCH_TIMELINE.map((item, i) => (
              <FadeUp key={i} delay={i * 50}>
                <div className="flex gap-8 items-start">
                  <div className="w-[72px] flex-shrink-0 text-right">
                    <span className="text-[9px] font-black uppercase tracking-wider" style={{ color: item.color }}>{item.year}</span>
                  </div>
                  <div className="relative flex-shrink-0 mt-1.5">
                    <div className="size-2.5 rounded-full" style={{ background: item.color, boxShadow: `0 0 0 3px #F7F9FC,0 0 0 5px ${item.color}40` }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-black mb-0.5" style={{ color: "#102033" }}>{item.role}</p>
                    <p className="text-xs font-bold mb-2" style={{ color: item.color }}>{item.institution}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "#5A6B7E" }}>{item.summary}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── RESEARCH ────────────────────────────────────────────────────────────────

function Research() {
  const [active, setActive] = useState(0);
  const [showMethods, setShowMethods] = useState(false);
  const p = RESEARCH_PROJECTS[active];
  return (
    <section id="research" style={{ background: "#07111F" }}>
      <div className="max-w-7xl mx-auto px-6 py-28">
        <FadeUp className="mb-16">
          <Label>Featured Research</Label>
          <h2 className="text-4xl xl:text-5xl text-white">Research Projects</h2>
        </FadeUp>
        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          <div className="flex lg:flex-col gap-3">
            {RESEARCH_PROJECTS.map((proj, i) => {
              const Icon = proj.icon;
              return (
                <button key={proj.id} onClick={() => { setActive(i); setShowMethods(false); }}
                  className="flex items-start gap-3 p-4 rounded-xl text-left transition-all"
                  style={{ background: active === i ? "rgba(20,85,217,.14)" : "rgba(255,255,255,.03)", border: `1px solid ${active === i ? "rgba(66,165,255,.35)" : "rgba(255,255,255,.06)"}` }}>
                  <Icon size={14} className="mt-0.5 flex-shrink-0" style={{ color: active === i ? "#42A5FF" : "#8291A6" }} />
                  <div>
                    <p className="text-xs font-bold leading-snug" style={{ color: active === i ? "#F4F8FC" : "#8291A6" }}>{proj.title}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: "#8291A6" }}>{proj.program}</p>
                  </div>
                </button>
              );
            })}
          </div>
          <FadeUp key={active}>
            <div className="rounded-2xl overflow-hidden" style={{ background: "#0D1A2A", border: "1px solid rgba(255,255,255,.08)" }}>
              <div className="h-[3px]" style={{ background: `linear-gradient(90deg,${p.accentColor},transparent)` }} />
              <div className="p-8 lg:p-10">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl text-white mb-2">{p.title}</h3>
                    <p className="text-sm font-bold" style={{ color: p.accentColor }}>{p.institution}</p>
                    {"mentor" in p && p.mentor && <p className="text-sm mt-1" style={{ color: "#8291A6" }}>Mentor: {p.mentor}</p>}
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <Badge label={p.status} color={p.statusColor} />
                    <span className="text-[11px] px-2.5 py-1 rounded-full" style={{ background: "rgba(255,255,255,.05)", color: "#8291A6" }}>{p.role}</span>
                  </div>
                </div>
                <p className="text-base leading-relaxed mb-6" style={{ color: "#8291A6", maxWidth: "65ch" }}>{p.summary}</p>

                {/* Why it matters */}
                <div className="p-4 rounded-xl mb-6" style={{ background: "rgba(66,165,255,.06)", border: "1px solid rgba(66,165,255,.15)" }}>
                  <p className="text-[9px] font-black uppercase tracking-widest mb-2" style={{ color: "#42A5FF" }}>Why This Matters</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#8291A6" }}>{p.whyItMatters}</p>
                </div>

                {/* What I learned */}
                <div className="p-4 rounded-xl mb-6" style={{ background: "rgba(48,197,210,.06)", border: "1px solid rgba(48,197,210,.15)" }}>
                  <p className="text-[9px] font-black uppercase tracking-widest mb-2" style={{ color: "#30C5D2" }}>What I Learned</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#8291A6" }}>{p.whatILearned}</p>
                </div>

                {/* Expandable methods */}
                <button onClick={() => setShowMethods(s => !s)}
                  className="flex items-center gap-2 text-xs font-bold mb-4 transition-colors hover:text-white" style={{ color: "#8291A6" }}>
                  <ChevronDown size={13} style={{ transform: showMethods ? "rotate(180deg)" : "none", transition: "transform .3s" }} />
                  {showMethods ? "Hide" : "View"} Methods & Techniques
                </button>
                {showMethods && (
                  <div className="mb-6 flex flex-wrap gap-2">
                    {p.methods.map(m => (
                      <span key={m} className="text-xs px-3 py-1.5 rounded-lg"
                        style={{ background: "rgba(255,255,255,.05)", color: "#F4F8FC", border: "1px solid rgba(255,255,255,.09)" }}>{m}</span>
                    ))}
                  </div>
                )}

                {p.presentations.length > 0 && (
                  <div className="mb-6">
                    <p className="text-[9px] font-black uppercase tracking-widest mb-3" style={{ color: "#30C5D2" }}>Presentations</p>
                    {p.presentations.map(pr => (
                      <div key={pr} className="flex items-center gap-2 text-sm mb-2" style={{ color: "#8291A6" }}>
                        <Presentation size={12} style={{ color: "#30C5D2", flexShrink: 0 }} /> {pr}
                      </div>
                    ))}
                  </div>
                )}

                <div className="p-4 rounded-xl mb-6" style={{ background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.06)" }}>
                  <p className="text-xs leading-relaxed" style={{ color: "#8291A6" }}>
                    <span className="font-black text-white/40">Note: </span>{p.note}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all hover:opacity-80"
                    style={{ background: p.accentColor, color: "#fff" }}>
                    View Research <ArrowRight size={13} />
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
                    style={{ border: "1px solid rgba(255,255,255,.14)", color: "#F4F8FC" }}>
                    View Poster <FileText size={13} />
                  </button>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── PUBLICATIONS ────────────────────────────────────────────────────────────

function Publications() {
  const [filter, setFilter] = useState("All");
  const cats = ["All", "Cardiovascular Science", "Chemistry", "Environmental Health", "Interdisciplinary"];
  const shown = filter === "All" ? PUBLICATIONS : PUBLICATIONS.filter(p => p.category === filter);
  return (
    <section id="publications" style={{ background: "#F7F9FC" }}>
      <div className="max-w-7xl mx-auto px-6 py-28">
        <FadeUp className="mb-12">
          <Label color="#1455D9">Scholarly Work</Label>
          <h2 className="text-4xl xl:text-5xl leading-[1.08]" style={{ color: "#102033" }}>Publications & Manuscripts</h2>
        </FadeUp>
        <div className="flex flex-wrap gap-2 mb-10">
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              className="px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-wider transition-all"
              style={{ background: filter === c ? "#1455D9" : "rgba(0,0,0,.05)", color: filter === c ? "#fff" : "#5A6B7E", border: filter === c ? "1px solid #1455D9" : "1px solid #DCE5EF" }}>
              {c}
            </button>
          ))}
        </div>
        <div className="space-y-4">
          {shown.map((pub, i) => (
            <FadeUp key={pub.id} delay={i * 65}>
              <div className="p-6 lg:p-8 rounded-2xl transition-all hover:-translate-y-0.5"
                style={{ background: "#fff", border: "1px solid #DCE5EF", boxShadow: "0 2px 16px rgba(0,0,0,.04)" }}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge label={pub.status} color={pub.statusColor} />
                      <span className="text-[11px] px-2.5 py-1 rounded-full" style={{ background: "#EDF2F7", color: "#5A6B7E" }}>{pub.type}</span>
                      <span className="text-[11px] px-2.5 py-1 rounded-full" style={{ background: "#EDF2F7", color: "#5A6B7E" }}>{pub.category}</span>
                    </div>
                    <h3 className="text-sm font-black mb-2 leading-snug" style={{ color: "#102033" }}>{pub.title}</h3>
                    <p className="text-xs mb-2" style={{ color: "#5A6B7E" }}>{pub.authors} · {pub.year} · {pub.venue}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "#8291A6" }}>{pub.abstract}</p>
                  </div>
                  <button className="flex items-center gap-1.5 text-[11px] font-bold px-3 py-2 rounded-lg flex-shrink-0 transition-all hover:bg-blue-50"
                    style={{ color: "#1455D9", border: "1px solid rgba(20,85,217,.2)" }}>
                    <FileText size={11} /> View
                  </button>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONFERENCES ─────────────────────────────────────────────────────────────

function Conferences() {
  return (
    <section style={{ background: "#0D1A2A" }}>
      <div className="max-w-7xl mx-auto px-6 py-24">
        <FadeUp className="mb-14">
          <Label>Scientific Presentations</Label>
          <h2 className="text-4xl text-white">Conferences & Presentations</h2>
        </FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CONFERENCES.map((c, i) => (
            <FadeUp key={i} delay={i * 55}>
              <div className="p-6 rounded-2xl h-full transition-all hover:-translate-y-1"
                style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <Presentation size={12} style={{ color: "#42A5FF" }} />
                  <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: "#42A5FF" }}>{c.type}</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-2 leading-snug">{c.title}</h4>
                <p className="text-xs font-bold mb-3" style={{ color: "#30C5D2" }}>{c.name}</p>
                <div className="flex items-center gap-2 text-xs" style={{ color: "#8291A6" }}>
                  <span>{c.date}</span><span>·</span><span>{c.location}</span>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── INNOVATION ──────────────────────────────────────────────────────────────

function Innovation() {
  const [active, setActive] = useState(0);
  const s = STARTUPS[active];
  return (
    <section id="innovation" style={{ background: "#07111F" }}>
      <div className="max-w-7xl mx-auto px-6 py-28">
        <FadeUp className="mb-6">
          <Label>Healthcare Innovation</Label>
          <h2 className="text-4xl xl:text-5xl text-white leading-[1.08]">
            From Research to<br /><em style={{ color: "#42A5FF" }}>Real-World Solutions</em>
          </h2>
        </FadeUp>
        <FadeUp delay={100} className="mb-14">
          <p className="text-base max-w-2xl" style={{ color: "#8291A6" }}>
            Translating scientific insight into technology concepts at the intersection of cardiovascular medicine, AI, and accessible healthcare.
          </p>
        </FadeUp>
        <div className="flex flex-wrap gap-3 mb-10">
          {STARTUPS.map((st, i) => (
            <button key={st.id} onClick={() => setActive(i)}
              className="px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-wider transition-all"
              style={{ background: active === i ? st.accent : "rgba(255,255,255,.05)", color: active === i ? "#fff" : "#8291A6", border: `1px solid ${active === i ? st.accent : "rgba(255,255,255,.08)"}` }}>
              {st.name}
            </button>
          ))}
        </div>
        <FadeUp key={active}>
          <div className="rounded-2xl overflow-hidden" style={{ background: "#0D1A2A", border: "1px solid rgba(255,255,255,.08)" }}>
            <div className="h-[3px]" style={{ background: `linear-gradient(90deg,${s.accent},transparent)` }} />
            <div className="grid lg:grid-cols-2">
              <div className="p-8 lg:p-10 border-r border-white/[.05]">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl text-white mb-1">{s.name}</h3>
                    <p className="text-sm italic" style={{ color: s.accent }}>{s.tagline}</p>
                  </div>
                  <Badge label={s.status} color={s.statusColor} />
                </div>
                <div className="space-y-5">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest mb-2" style={{ color: "#8291A6" }}>The Problem</p>
                    <p className="text-sm leading-relaxed" style={{ color: "#8291A6" }}>{s.problem}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest mb-2" style={{ color: "#42A5FF" }}>The Approach</p>
                    <p className="text-sm leading-relaxed" style={{ color: "#8291A6" }}>{s.solution}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest mb-2" style={{ color: "#30C5D2" }}>Technology</p>
                    <div className="flex flex-wrap gap-2">
                      {s.tech.map(t => (
                        <span key={t} className="text-xs px-2.5 py-1.5 rounded-lg"
                          style={{ background: "rgba(255,255,255,.05)", color: "#F4F8FC", border: "1px solid rgba(255,255,255,.08)" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 lg:p-10 flex flex-col">
                <div className="flex-1 rounded-xl flex flex-col items-center justify-center mb-5"
                  style={{ background: "rgba(255,255,255,.02)", border: "1px dashed rgba(255,255,255,.09)", minHeight: 170 }}>
                  <Lightbulb size={24} className="mb-3" style={{ color: s.accent, opacity: .4 }} />
                  <p className="text-xs text-center" style={{ color: "#8291A6" }}>Upload {s.name} screenshot</p>
                </div>
                <div className="p-3 rounded-lg mb-4" style={{ background: "rgba(214,169,74,.07)", border: "1px solid rgba(214,169,74,.18)" }}>
                  <p className="text-xs leading-relaxed" style={{ color: "#D6A94A" }}>
                    <span className="font-black">Disclaimer: </span>{s.disclaimer}
                  </p>
                </div>
                <div className="flex gap-3">
                  {s.demoLink && (
                    <a href={s.demoLink} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all hover:opacity-80"
                      style={{ background: s.accent, color: "#fff" }}>
                      Open Demo <ExternalLink size={11} />
                    </a>
                  )}
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold"
                    style={{ border: "1px solid rgba(255,255,255,.14)", color: "#F4F8FC" }}>Case Study</button>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── ECOSYSTEM DIAGRAM ───────────────────────────────────────────────────────

function EcosystemDiagram() {
  const [tip, setTip] = useState<{ label: string; desc: string; color: string } | null>(null);
  const radii = [0, 17, 31, 44];
  const ringBgs   = ["", "rgba(66,165,255,.13)", "rgba(48,197,210,.11)", "rgba(214,169,74,.1)"];
  const ringBords = ["", "rgba(66,165,255,.32)", "rgba(48,197,210,.27)", "rgba(214,169,74,.24)"];

  const nodes = ECOSYSTEM_NODES.map(n => {
    const r = radii[n.ring];
    const a = (n.angle - 90) * (Math.PI / 180);
    return { ...n, x: 50 + r * Math.cos(a), y: 50 + r * Math.sin(a) };
  });

  return (
    <div className="relative w-full select-none" style={{ maxWidth: 540, margin: "0 auto" }}>
      <div className="relative" style={{ paddingBottom: "100%" }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" style={{ overflow: "visible" }}>
          {[17, 31, 44].map(r => (
            <circle key={r} cx="50" cy="50" r={r} fill="none" strokeDasharray="1.2 1.2"
              stroke={r === 17 ? "rgba(66,165,255,.2)" : r === 31 ? "rgba(48,197,210,.15)" : "rgba(214,169,74,.15)"} strokeWidth=".25" />
          ))}
          {nodes.filter(n => n.ring === 1).map((n, i) => (
            <line key={i} x1="50" y1="50" x2={n.x} y2={n.y} stroke="rgba(66,165,255,.12)" strokeWidth=".2" />
          ))}
          {nodes.filter(n => n.ring === 2).map((n, i) => {
            const r1s = nodes.filter(x => x.ring === 1);
            return <line key={i} x1={r1s[i % r1s.length].x} y1={r1s[i % r1s.length].y} x2={n.x} y2={n.y} stroke="rgba(48,197,210,.08)" strokeWidth=".15" />;
          })}
          {nodes.filter(n => n.ring === 3).map((n, i) => {
            const r2s = nodes.filter(x => x.ring === 2);
            return <line key={i} x1={r2s[i % r2s.length].x} y1={r2s[i % r2s.length].y} x2={n.x} y2={n.y} stroke="rgba(214,169,74,.07)" strokeWidth=".12" />;
          })}
        </svg>

        {/* Center */}
        <div className="absolute" style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%)", zIndex: 10 }}>
          <button onMouseEnter={() => setTip({ label: "Mission", desc: "Improving Human Health at Scale — the unifying purpose behind every discipline, investment, and institution.", color: "#42A5FF" })}
            onMouseLeave={() => setTip(null)}
            className="rounded-full flex flex-col items-center justify-center text-center transition-all hover:scale-105"
            style={{ width: 80, height: 80, background: "radial-gradient(circle,rgba(20,85,217,.35),rgba(20,85,217,.1))", border: "1.5px solid rgba(66,165,255,.5)" }}>
            <Activity size={14} style={{ color: "#42A5FF", marginBottom: 3 }} />
            <span style={{ fontSize: 7.5, color: "#fff", fontFamily: "DM Serif Display,serif", lineHeight: 1.15 }}>Human Health<br />at Scale</span>
          </button>
        </div>

        {nodes.map((n, i) => (
          <div key={i} className="absolute transition-all hover:scale-110 cursor-pointer"
            style={{ left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%,-50%)", zIndex: 5 }}
            onMouseEnter={() => setTip({ label: n.label, desc: n.desc, color: n.color })}
            onMouseLeave={() => setTip(null)}>
            <div className="px-2 py-1 rounded-md whitespace-nowrap"
              style={{ background: ringBgs[n.ring], border: `1px solid ${ringBords[n.ring]}` }}>
              <span style={{ fontSize: n.ring === 3 ? 6.5 : n.ring === 2 ? 7 : 7.5, color: n.color, fontWeight: 800, lineHeight: 1 }}>
                {n.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 rounded-xl min-h-[72px] transition-all"
        style={{ background: "rgba(13,26,42,.97)", border: `1px solid ${tip ? tip.color + "40" : "rgba(255,255,255,.06)"}` }}>
        {tip ? (
          <>
            <p className="text-xs font-black mb-1" style={{ color: tip.color }}>{tip.label}</p>
            <p className="text-xs leading-relaxed" style={{ color: "#8291A6" }}>{tip.desc}</p>
          </>
        ) : (
          <p className="text-xs" style={{ color: "#8291A6" }}>Hover any node to explore how it connects to the central mission.</p>
        )}
      </div>
    </div>
  );
}

// ─── VISION ──────────────────────────────────────────────────────────────────

function Vision() {

  return (
    <section id="vision">

      {/* Ecosystem */}
      <div style={{ background: "linear-gradient(160deg,#060F1C,#07111F)" }}>
        <div className="max-w-7xl mx-auto px-6 py-28">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <FadeUp>
              <Label color="#D6A94A">Long-Term Vision</Label>
              <h2 className="text-4xl xl:text-5xl text-white leading-[1.05] mb-6">
                Improving Human<br />
                <em style={{ backgroundImage: "linear-gradient(135deg,#D6A94A,#f0c060)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Health at Scale
                </em>
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#8291A6" }}>
                My long-term goal is to work across medicine, science, technology, entrepreneurship, strategy, and investment to improve healthcare at scale. These are not disconnected ambitions — they are connected tools for one central mission.
              </p>
              <blockquote className="p-6 rounded-2xl mb-8"
                style={{ background: "rgba(214,169,74,.07)", border: "1px solid rgba(214,169,74,.2)" }}>
                <p className="text-lg italic leading-relaxed" style={{ color: "#F4F8FC", fontFamily: "DM Serif Display,serif" }}>
                  &ldquo;I do not see medicine, business, investing, and public service as separate ambitions. I see them as connected tools for building better systems for human health.&rdquo;
                </p>
              </blockquote>
              <div className="space-y-3">
                {[
                  { t: "Core disciplines", l: "Medicine · Research · Technology · Entrepreneurship", c: "#42A5FF" },
                  { t: "Strategy & Capital", l: "Consulting · Investment Banking · VC · Public Markets · Trading · Hedge Funds", c: "#30C5D2" },
                  { t: "Institutions & Impact", l: "Hospitals · Universities · Policy · Philanthropy", c: "#D6A94A" },
                ].map(row => (
                  <div key={row.t} className="flex items-start gap-3">
                    <div className="size-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: row.c }} />
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: row.c }}>{row.t}</span>
                      <p className="text-xs mt-0.5" style={{ color: "#8291A6" }}>{row.l}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
            <FadeUp delay={200}><EcosystemDiagram /></FadeUp>
          </div>
        </div>
      </div>

      {/* Four Pillars */}
      <div style={{ background: "#F7F9FC" }}>
        <div className="max-w-7xl mx-auto px-6 py-28">
          <FadeUp className="text-center mb-16">
            <Label color="#1455D9">Four Pillars</Label>
            <h2 className="text-4xl xl:text-5xl leading-[1.08]" style={{ color: "#102033" }}>
              One Mission,<br /><em>Multiple Disciplines</em>
            </h2>
          </FadeUp>
          <div className="grid sm:grid-cols-2 gap-6">
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <FadeUp key={p.n} delay={i * 80}>
                  <div className="p-8 rounded-2xl h-full" style={{ background: "#fff", border: "1px solid #DCE5EF", boxShadow: "0 2px 24px rgba(0,0,0,.05)" }}>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="size-10 rounded-xl flex items-center justify-center" style={{ background: `${p.color}15` }}>
                        <Icon size={18} style={{ color: p.color }} />
                      </div>
                      <div>
                        <span className="text-[9px] font-black tracking-widest uppercase" style={{ color: p.color }}>{p.n}</span>
                        <h3 className="text-sm font-black" style={{ color: "#102033", fontFamily: "Manrope,sans-serif" }}>{p.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: "#5A6B7E" }}>{p.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {p.tags.map(t => (
                        <span key={t} className="text-[11px] px-2.5 py-1 rounded-full" style={{ background: `${p.color}10`, color: p.color }}>{t}</span>
                      ))}
                    </div>
                    {p.note && (
                      <p className="text-[11px] font-semibold pt-3 border-t border-gray-100" style={{ color: "#1455D9" }}>{p.note}</p>
                    )}
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </div>

      {/* Currently Exploring */}
      <div style={{ background: "#0D1A2A", borderTop: "1px solid rgba(255,255,255,.05)" }}>
        <div className="max-w-7xl mx-auto px-6 py-20">
          <FadeUp className="mb-10">
            <Label>Active Learning</Label>
            <h2 className="text-3xl text-white">Currently Exploring</h2>
          </FadeUp>
          <div className="flex flex-wrap gap-3">
            {CURRENTLY_EXPLORING.map((item, i) => (
              <FadeUp key={item} delay={i * 35}>
                <div className="flex items-center gap-2 px-5 py-3 rounded-full"
                  style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.09)" }}>
                  <div className="size-1.5 rounded-full" style={{ background: "#42A5FF" }} />
                  <span className="text-sm font-semibold" style={{ color: "#F4F8FC" }}>{item}</span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      {/* What I Hope to Build */}
      <div style={{ background: "#07111F" }}>
        <div className="max-w-7xl mx-auto px-6 py-28">
          <FadeUp className="mb-6">
            <Label color="#D6A94A">Long-Term Vision</Label>
            <h2 className="text-4xl xl:text-5xl text-white">What I Hope to Build</h2>
          </FadeUp>
          <FadeUp delay={100} className="mb-14">
            <p className="text-base max-w-2xl" style={{ color: "#8291A6" }}>
              Every item below is clearly aspirational. None currently exists. These represent the long-term institutions and organizations I hope to build or contribute to over time.
            </p>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FUTURE_BUILDS.map((fb, i) => {
              const Icon = fb.icon;
              return (
                <FadeUp key={fb.name} delay={i * 60}>
                  <div className="p-6 rounded-2xl h-full relative overflow-hidden transition-all hover:-translate-y-1"
                    style={{ background: "#0D1A2A", border: "1px solid rgba(255,255,255,.08)" }}>
                    <div className="absolute top-3 right-3">
                      <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(214,169,74,.12)", color: "#D6A94A" }}>Long-Term Vision</span>
                    </div>
                    <div className="size-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${fb.color}15` }}>
                      <Icon size={17} style={{ color: fb.color }} />
                    </div>
                    <h4 className="text-sm font-black text-white mb-3">{fb.name}</h4>
                    <p className="text-xs leading-relaxed" style={{ color: "#8291A6" }}>{fb.desc}</p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </div>

      {/* Full vision statement */}
      <div style={{ background: "#050E1A" }}>
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <FadeUp>
            <Label color="#42A5FF">The Full Vision</Label>
            <blockquote className="text-xl xl:text-2xl italic leading-relaxed mb-10"
              style={{ color: "#F4F8FC", fontFamily: "DM Serif Display,serif" }}>
              &ldquo;My ambition extends beyond one profession. I want to understand healthcare from the laboratory, clinic, startup, boardroom, capital markets, institution, and policy perspectives — and ultimately use that experience to build systems that improve lives.&rdquo;
            </blockquote>
            <div className="space-y-4 text-left max-w-3xl mx-auto text-sm leading-relaxed" style={{ color: "#8291A6" }}>
              <p>I am particularly interested in MD–PhD training, cardiovascular medicine, biomedical research, drug discovery, healthcare technologies, and building companies that translate scientific ideas into practical solutions.</p>
              <p>I also want to understand the financial and strategic systems that shape healthcare innovation — consulting, investment banking, venture capital, public markets, hedge funds, trading, valuation, and capital allocation.</p>
              <p>Over time, I hope to use this combined experience to build hospitals, research centers, healthcare systems, educational institutions, companies, and investment platforms. I am also interested in public service and evidence-based health, research, and education policy.</p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── CLINICAL ────────────────────────────────────────────────────────────────

function Clinical() {
  return (
    <section style={{ background: "#F7F9FC" }}>
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <Label color="#1455D9">Clinical Preparation</Label>
            <h2 className="text-4xl xl:text-5xl leading-[1.08] mb-8" style={{ color: "#102033" }}>The Clinical<br /><em>Foundation</em></h2>
            <div className="space-y-5">
              {[
                { title: "Cardiology Shadowing", detail: "150+ hours · Dr. Hassan Kassam Ali, MD · Baltimore, MD · 2024", items: ["Patient Evaluations", "ECG Interpretation", "Stress Testing", "Echocardiography", "Cardiovascular Diagnostics", "Clinical Decision-Making"], color: "#1455D9" },
                { title: "EMT-Basic Training", detail: "National EMS Institute · 2026", items: ["Patient Assessment", "Emergency Response", "Trauma Management", "CPR/BLS", "Airway Management", "Prehospital Care"], color: "#30C5D2" },
              ].map(item => (
                <div key={item.title} className="p-6 rounded-2xl" style={{ background: "#fff", border: "1px solid #DCE5EF" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="size-2 rounded-full" style={{ background: item.color }} />
                    <h4 className="text-sm font-black" style={{ color: "#102033" }}>{item.title}</h4>
                  </div>
                  <p className="text-xs mb-3" style={{ color: "#8291A6" }}>{item.detail}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.items.map(s => <span key={s} className="text-xs px-2 py-1 rounded" style={{ background: `${item.color}12`, color: item.color }}>{s}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={150}>
            <div className="rounded-3xl overflow-hidden relative" style={{ border: "1px solid rgba(20,85,217,.2)" }}>
              <img src={imgLabCoat} alt="Muhammad Ali Naqvi in anatomy lab"
                className="w-full object-cover object-center" style={{ maxHeight: 480 }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,transparent 40%,rgba(7,17,31,.97) 100%)" }} />
              <div className="absolute bottom-0 inset-x-0 p-7">
                <HeartPulse size={20} className="mb-3" style={{ color: "#30C5D2" }} />
                <h3 className="text-xl text-white mb-2">Commitment to Cardiovascular Medicine</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#8291A6" }}>
                  "My exposure to cardiovascular research and cardiology has strengthened my commitment to understanding heart disease from the molecular, clinical, and translational perspectives."
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Pulmonary Hypertension", "Vascular Biology", "Translational Cardiology", "Drug Discovery"].map(f => (
                    <span key={f} className="text-xs px-2.5 py-1 rounded-full" style={{ background: "rgba(20,85,217,.3)", color: "#42A5FF" }}>{f}</span>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── TEACHING ────────────────────────────────────────────────────────────────

function Teaching() {
  return (
    <section style={{ background: "#0D1A2A" }}>
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
          <FadeUp>
            <Label>Teaching & Mentorship</Label>
            <div className="text-8xl font-black leading-none mb-3" style={{ fontFamily: "DM Serif Display,serif", color: "#42A5FF" }}>500+</div>
            <p className="text-xl text-white mb-1">Tutoring Hours</p>
            <p className="text-sm" style={{ color: "#8291A6" }}>Peer Tutor · CCBC</p>
          </FadeUp>
          <FadeUp delay={100}>
            <p className="text-base leading-relaxed mb-7" style={{ color: "#8291A6", maxWidth: "55ch" }}>
              "Teaching strengthened my ability to communicate complex ideas clearly, adapt to different learning styles, and support students through academic challenges."
            </p>
            <p className="text-[9px] font-black uppercase tracking-widest mb-4" style={{ color: "#42A5FF" }}>Subjects Tutored</p>
            <div className="flex flex-wrap gap-2">
              {["Calculus I & II", "Statistics", "Physics", "General Chemistry", "Biology", "Microbiology", "Genetics"].map(s => (
                <span key={s} className="text-sm px-4 py-2 rounded-full"
                  style={{ background: "rgba(66,165,255,.1)", color: "#42A5FF", border: "1px solid rgba(66,165,255,.2)" }}>{s}</span>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── LEADERSHIP ──────────────────────────────────────────────────────────────

function Leadership() {
  return (
    <section id="leadership" style={{ background: "#07111F" }}>
      <div className="max-w-7xl mx-auto px-6 py-28">
        <FadeUp className="mb-16">
          <Label>Service & Leadership</Label>
          <h2 className="text-4xl xl:text-5xl text-white leading-[1.08]">Leadership as<br /><em style={{ color: "#D6A94A" }}>Service</em></h2>
          <p className="mt-5 text-base max-w-xl" style={{ color: "#8291A6" }}>
            "Leadership, to me, means creating systems that help others feel supported, represented, and capable of succeeding."
          </p>
        </FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {LEADERSHIP.map((l, i) => {
            const Icon = l.icon;
            return (
              <FadeUp key={i} delay={i * 50}>
                <div className="p-5 rounded-2xl h-full transition-all hover:-translate-y-1"
                  style={{ background: "#0D1A2A", border: "1px solid rgba(255,255,255,.08)" }}>
                  <Icon size={17} className="mb-4" style={{ color: "#D6A94A" }} />
                  <h4 className="text-sm font-black text-white leading-snug mb-2">{l.role}</h4>
                  <p className="text-xs mb-1" style={{ color: "#42A5FF" }}>{l.org}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Clock size={10} style={{ color: "#8291A6" }} />
                    <p className="text-xs" style={{ color: "#8291A6" }}>{l.period}</p>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── FELLOWSHIPS ─────────────────────────────────────────────────────────────

function Fellowships() {
  return (
    <section style={{ background: "#F7F9FC" }}>
      <div className="max-w-7xl mx-auto px-6 py-24">
        <FadeUp className="mb-14">
          <Label color="#1455D9">Programs & Fellowships</Label>
          <h2 className="text-4xl leading-[1.08]" style={{ color: "#102033" }}>Selected Programs & Fellowships</h2>
        </FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FELLOWSHIPS.map((f, i) => (
            <FadeUp key={i} delay={i * 50}>
              <div className="p-5 rounded-2xl transition-all hover:-translate-y-0.5"
                style={{ background: "#fff", border: "1px solid #DCE5EF", boxShadow: "0 2px 12px rgba(0,0,0,.04)" }}>
                <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full mb-3 inline-block"
                  style={{ background: "rgba(20,85,217,.08)", color: "#1455D9" }}>{f.type}</span>
                <h4 className="text-sm font-black mb-1 leading-snug" style={{ color: "#102033" }}>{f.name}</h4>
                <p className="text-xs mb-1" style={{ color: "#5A6B7E" }}>{f.org}</p>
                <p className="text-xs font-bold" style={{ color: "#8291A6" }}>{f.year}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── AWARDS ──────────────────────────────────────────────────────────────────

function Awards() {
  return (
    <section style={{ background: "#07111F" }}>
      <div className="max-w-7xl mx-auto px-6 py-24">
        <FadeUp className="mb-14">
          <Label>Recognition</Label>
          <h2 className="text-4xl text-white">Awards & Honors</h2>
        </FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {AWARDS.map((a, i) => (
            <FadeUp key={i} delay={i * 45}>
              <div className="p-5 rounded-2xl flex gap-4 transition-all hover:-translate-y-0.5"
                style={{ background: "#0D1A2A", border: `1px solid ${a.gold ? "rgba(214,169,74,.22)" : "rgba(255,255,255,.07)"}` }}>
                <Award size={16} style={{ color: a.gold ? "#D6A94A" : "#8291A6", flexShrink: 0, marginTop: 2 }} />
                <div>
                  <h4 className="text-sm font-black text-white mb-1">{a.name}</h4>
                  <p className="text-xs mb-1" style={{ color: a.gold ? "#D6A94A" : "#42A5FF" }}>{a.org}</p>
                  <p className="text-xs" style={{ color: "#8291A6" }}>{a.detail}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS ──────────────────────────────────────────────────────────────────

function Skills() {
  return (
    <section style={{ background: "#0D1A2A" }}>
      <div className="max-w-7xl mx-auto px-6 py-24">
        <FadeUp className="mb-14">
          <Label>Expertise</Label>
          <h2 className="text-4xl text-white">Skills & Methods</h2>
        </FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILLS_CATS.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <FadeUp key={cat.cat} delay={i * 60}>
                <div className="p-6 rounded-2xl h-full" style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)" }}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="size-9 rounded-lg flex items-center justify-center" style={{ background: `${cat.color}18` }}>
                      <Icon size={16} style={{ color: cat.color }} />
                    </div>
                    <h4 className="text-sm font-black text-white">{cat.cat}</h4>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map(s => (
                      <span key={s} className="text-[11px] px-2.5 py-1.5 rounded-md" style={{ background: `${cat.color}10`, color: cat.color }}>{s}</span>
                    ))}
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── GALLERY ─────────────────────────────────────────────────────────────────

function Gallery() {
  const [activeCat, setActiveCat] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Only items with a real image import — placeholders never render
  const withImages = GALLERY_ITEMS.filter(g => "img" in g && (g as any).img);

  // Derive category list from what's actually available
  const availableCats = ["All", ...Array.from(new Set(withImages.map(g => g.cat)))];

  const filtered = activeCat === "All" ? withImages : withImages.filter(g => g.cat === activeCat);

  const nav = useCallback((dir: number) => {
    setLightbox(prev => prev === null ? null : (prev + dir + filtered.length) % filtered.length);
  }, [filtered.length]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "ArrowRight") nav(1);
      if (e.key === "ArrowLeft") nav(-1);
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [lightbox, nav]);

  const item = lightbox !== null ? filtered[lightbox] : null;

  const col1 = filtered.filter((_, i) => i % 3 === 0);
  const col2 = filtered.filter((_, i) => i % 3 === 1);
  const col3 = filtered.filter((_, i) => i % 3 === 2);

  const Card = ({ g }: { g: typeof GALLERY_ITEMS[0] }) => {
    const idx = filtered.indexOf(g);
    const rotation = "rotate" in g && g.rotate
      ? "rotate(-90deg)"
      : "rotateCW" in g && (g as any).rotateCW
        ? "rotate(90deg)"
        : null;
    return (
      <FadeUp className="mb-4">
        <button onClick={() => setLightbox(idx)}
          className="w-full group relative rounded-2xl overflow-hidden text-left block transition-all hover:-translate-y-1"
          style={{ background: "#0D1A2A", border: "1px solid rgba(255,255,255,.08)" }}>
          <div className="relative overflow-hidden" style={{ height: g.h }}>
            {rotation ? (
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <img src={(g as any).img} alt={g.caption}
                  style={{ height: "140%", width: "140%", objectFit: "cover", transform: rotation }} />
              </div>
            ) : (
              <img src={(g as any).img} alt={g.caption}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />
            )}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "rgba(7,17,31,.35)" }} />
            <div className="absolute top-3 left-3">
              <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
                style={{ background: "rgba(7,17,31,.7)", color: "#42A5FF" }}>{g.cat}</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="size-10 rounded-full flex items-center justify-center" style={{ background: "rgba(7,17,31,.75)" }}>
                <ZoomIn size={16} style={{ color: "#fff" }} />
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-white/[.06]">
            <p className="text-xs leading-relaxed" style={{ color: "#8291A6" }}>{g.caption}</p>
          </div>
        </button>
      </FadeUp>
    );
  };

  return (
    <section id="gallery" style={{ background: "#07111F" }}>
      <div className="max-w-7xl mx-auto px-6 py-28">
        <FadeUp className="text-center mb-16">
          <Label>Visual Story</Label>
          <h2 className="text-4xl xl:text-5xl text-white">The Journey in Pictures</h2>
          <p className="mt-4 text-sm max-w-lg mx-auto" style={{ color: "#8291A6" }}>
            A curated gallery of photographs from research, conferences, leadership, and clinical experiences. All images are manually approved before publishing.
          </p>
        </FadeUp>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12 justify-center">
          {availableCats.map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)}
              className="px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-wider transition-all"
              style={{ background: activeCat === cat ? "#1455D9" : "rgba(255,255,255,.05)", color: activeCat === cat ? "#fff" : "#8291A6", border: `1px solid ${activeCat === cat ? "#1455D9" : "rgba(255,255,255,.08)"}` }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          <div>{col1.map(g => <Card key={g.id} g={g} />)}</div>
          <div className="sm:mt-8">{col2.map(g => <Card key={g.id} g={g} />)}</div>
          <div className="lg:mt-16">{col3.map(g => <Card key={g.id} g={g} />)}</div>
        </div>

        {/* Upload CTA */}
        <FadeUp delay={200} className="mt-12">
          <div className="p-8 rounded-2xl text-center"
            style={{ background: "rgba(255,255,255,.02)", border: "1px dashed rgba(255,255,255,.1)" }}>
            <div className="size-12 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ background: "rgba(20,85,217,.15)", border: "1px dashed rgba(66,165,255,.3)" }}>
              <ZoomIn size={20} style={{ color: "#42A5FF" }} />
            </div>
            <p className="text-base font-black text-white mb-2">Add Your Photographs</p>
            <p className="text-sm mb-5 max-w-md mx-auto" style={{ color: "#8291A6" }}>
              Upload approved photographs to replace placeholders. Each image supports captions, categories, event tags, dates, institution tags, and links to related projects or publications.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button className="px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider"
                style={{ background: "#1455D9", color: "#fff" }}>Upload Photos</button>
              <button className="px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider"
                style={{ border: "1px solid rgba(255,255,255,.15)", color: "#F4F8FC" }}>Manage Gallery</button>
            </div>
          </div>
        </FadeUp>
      </div>

      {/* Lightbox */}
      {item && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: "rgba(2,6,12,.97)" }}
          onClick={() => setLightbox(null)}>
          <div className="relative max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            <div className="relative rounded-2xl overflow-hidden mb-4" style={{ background: "#0D1A2A", minHeight: 320 }}>
              <div className="flex items-center justify-center overflow-hidden" style={{ maxHeight: "70vh", minHeight: 320 }}>
                <img src={(item as any).img} alt={item.caption}
                  style={{ maxHeight: "70vh", maxWidth: "100%", objectFit: "contain",
                    transform: "rotate" in item && item.rotate
                      ? "rotate(-90deg)"
                      : "rotateCW" in item && (item as any).rotateCW
                        ? "rotate(90deg)"
                        : "none" }} />
              </div>
              <button onClick={() => nav(-1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 size-10 rounded-full flex items-center justify-center transition-all hover:bg-white/20"
                style={{ background: "rgba(0,0,0,.6)" }}>
                <ChevronLeft size={17} style={{ color: "#fff" }} />
              </button>
              <button onClick={() => nav(1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 size-10 rounded-full flex items-center justify-center transition-all hover:bg-white/20"
                style={{ background: "rgba(0,0,0,.6)" }}>
                <ChevronRight size={17} style={{ color: "#fff" }} />
              </button>
              <button onClick={() => setLightbox(null)}
                className="absolute top-3 right-3 size-8 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,0,0,.7)" }}>
                <X size={14} style={{ color: "#fff" }} />
              </button>
            </div>
            <div className="px-1">
              <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: "#42A5FF" }}>{item.cat}</span>
              <p className="text-sm mt-1 leading-relaxed" style={{ color: "#F4F8FC" }}>{item.caption}</p>
              <p className="text-xs mt-1" style={{ color: "#8291A6" }}>{(lightbox ?? 0) + 1} / {filtered.length} · Use ← → keys or buttons to navigate · ESC to close</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", org: "", reason: "", message: "", consent: false });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.message.trim()) e.message = "Message is required";
    if (!form.consent) e.consent = "Please confirm consent";
    return e;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
  };

  const reasons = [
    "Research Collaboration", "Internship or Employment",
    "Healthcare Innovation", "Consulting or Strategy",
    "Investment & Finance", "Big Pharma / Biotech",
    "Venture Capital", "Speaking Opportunity",
    "Mentorship", "College Admissions Inquiry",
    "Media Inquiry", "Other",
  ];

  return (
    <section id="contact" style={{ background: "#F7F9FC" }}>
      <div className="max-w-7xl mx-auto px-6 py-28">
        <div className="grid lg:grid-cols-2 gap-20">
          <FadeUp>
            <Label color="#1455D9">Get in Touch</Label>
            <h2 className="text-4xl xl:text-5xl leading-[1.08] mb-8" style={{ color: "#102033" }}>
              {"Let's Build Something"}<br /><em>Meaningful</em>
            </h2>
            <p className="text-base leading-relaxed mb-10" style={{ color: "#5A6B7E" }}>
              Open to research collaborations, big pharma and biotech partnerships, healthcare innovation discussions, consulting conversations, venture capital and investment inquiries, college admissions outreach, and academic opportunities.
            </p>
            <div className="space-y-4 mb-10">
              {[
                { icon: Mail, l: "Email", v: "naqvis@merrimack.edu", h: "mailto:naqvis@merrimack.edu" },
                { icon: Linkedin, l: "LinkedIn", v: "muhammad-ali-naqvi", h: "https://www.linkedin.com/in/muhammad-ali-naqvi-b78902323" },
                { icon: MapPin, l: "Location", v: "North Andover, Massachusetts", h: "" },
              ].map(({ icon: Icon, l, v, h }) => (
                <div key={l} className="flex items-center gap-4 p-4 rounded-xl"
                  style={{ background: "#fff", border: "1px solid #DCE5EF" }}>
                  <div className="size-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(20,85,217,.08)" }}>
                    <Icon size={14} style={{ color: "#1455D9" }} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest mb-0.5" style={{ color: "#8291A6" }}>{l}</p>
                    {h ? (
                      <a href={h} target={h.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                        className="text-sm font-bold hover:underline" style={{ color: "#102033" }}>{v}</a>
                    ) : (
                      <p className="text-sm font-bold" style={{ color: "#102033" }}>{v}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <a href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-wider transition-all hover:opacity-90"
              style={{ background: "#1455D9", color: "#fff" }}>
              <Download size={14} /> Download CV
            </a>
          </FadeUp>

          <FadeUp delay={150}>
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-10 rounded-2xl"
                style={{ background: "#fff", border: "1px solid #DCE5EF" }}>
                <CheckCircle size={44} className="mb-4" style={{ color: "#30C5D2" }} />
                <h3 className="text-2xl mb-3" style={{ color: "#102033" }}>Message Received</h3>
                <p className="text-sm" style={{ color: "#5A6B7E" }}>Thank you for reaching out. I will respond as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="p-8 rounded-2xl space-y-5" style={{ background: "#fff", border: "1px solid #DCE5EF" }}>
                {[
                  { id: "name", label: "Full Name", type: "text", ph: "Your name" },
                  { id: "email", label: "Email Address", type: "email", ph: "you@example.com" },
                  { id: "org", label: "Organization (optional)", type: "text", ph: "Institution, company, firm, or fund" },
                ].map(f => (
                  <div key={f.id}>
                    <label className="block text-[10px] font-black uppercase tracking-widest mb-1.5" style={{ color: "#5A6B7E" }}>{f.label}</label>
                    <input type={f.type} placeholder={f.ph} value={(form as any)[f.id]}
                      onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{ background: "#F7F9FC", border: `1px solid ${errors[f.id] ? "#d4183d" : "#DCE5EF"}`, color: "#102033", fontFamily: "Manrope,sans-serif" }} />
                    {errors[f.id] && <p className="text-xs mt-1" style={{ color: "#d4183d" }}>{errors[f.id]}</p>}
                  </div>
                ))}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-1.5" style={{ color: "#5A6B7E" }}>Reason for Contact</label>
                  <select value={form.reason} onChange={e => setForm(p => ({ ...p, reason: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "#F7F9FC", border: "1px solid #DCE5EF", color: "#102033", fontFamily: "Manrope,sans-serif" }}>
                    <option value="">Select a reason</option>
                    {reasons.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-1.5" style={{ color: "#5A6B7E" }}>Message</label>
                  <textarea rows={4} placeholder="Share your thoughts, ideas, or questions..."
                    value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                    style={{ background: "#F7F9FC", border: `1px solid ${errors.message ? "#d4183d" : "#DCE5EF"}`, color: "#102033", fontFamily: "Manrope,sans-serif" }} />
                  {errors.message && <p className="text-xs mt-1" style={{ color: "#d4183d" }}>{errors.message}</p>}
                </div>
                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={form.consent} onChange={e => setForm(p => ({ ...p, consent: e.target.checked }))} className="mt-0.5 rounded" />
                    <span className="text-xs leading-relaxed" style={{ color: "#5A6B7E" }}>
                      I consent to this message being reviewed and responded to by Muhammad Ali Naqvi. My information will not be shared publicly.
                    </span>
                  </label>
                  {errors.consent && <p className="text-xs mt-1" style={{ color: "#d4183d" }}>{errors.consent}</p>}
                </div>
                <button type="submit"
                  className="w-full py-3 rounded-xl text-sm font-black uppercase tracking-wider transition-all hover:opacity-90"
                  style={{ background: "#1455D9", color: "#fff" }}>
                  Send Message <ArrowRight size={13} className="inline ml-1" />
                </button>
              </form>
            )}
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ background: "#030810", borderTop: "1px solid rgba(255,255,255,.06)" }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-lg flex items-center justify-center font-black text-sm"
              style={{ background: "linear-gradient(135deg,#1455D9,#42A5FF)", color: "#fff", fontFamily: "DM Serif Display,serif" }}>MAN</div>
            <div>
              <p className="text-sm font-black text-white">Muhammad Ali Naqvi</p>
              <p className="text-xs" style={{ color: "#8291A6" }}>Researching disease. Building solutions. Advancing human health.</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <a href="mailto:naqvis@merrimack.edu" className="text-xs hover:text-white transition-colors" style={{ color: "#8291A6" }}>naqvis@merrimack.edu</a>
            <a href="https://www.linkedin.com/in/muhammad-ali-naqvi-b78902323" target="_blank" rel="noopener noreferrer"
              className="hover:text-white transition-colors" style={{ color: "#8291A6" }}>
              <Linkedin size={15} />
            </a>
          </div>
        </div>
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,.05)" }}>
          <p className="text-xs" style={{ color: "#8291A6" }}>© {new Date().getFullYear()} Muhammad Ali Naqvi. All rights reserved.</p>
          <div className="flex gap-5 text-xs" style={{ color: "#8291A6" }}>
            <button className="hover:text-white transition-colors">Privacy Policy</button>
            <button className="hover:text-white transition-colors">Accessibility</button>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-white transition-colors flex items-center gap-1">
              Back to top <ChevronRight size={11} style={{ transform: "rotate(-90deg)" }} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── ROOT ────────────────────────────────────────────────────────────────────

export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only absolute top-4 left-4 z-[200] px-4 py-2 rounded text-sm font-bold"
        style={{ background: "#1455D9", color: "#fff" }}>
        Skip to content
      </a>
      <Nav theme={theme} setTheme={setTheme} />
      <main id="main">
        <Hero />
        <Stats />
        <Story />
        <Education />
        <ResearchTimeline />
        <Research />
        <Publications />
        <Conferences />
        <Innovation />
        <Vision />
        <Clinical />
        <Teaching />
        <Leadership />
        <Fellowships />
        <Awards />
        <Skills />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
