import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// Direct authentic asset imports for the 5 curated projects
import yoloImg from './assets/yolo11_perception.jpg';
import dataflowImg from './assets/dataflow.jpg';
import paperforgeImg from './assets/paperforge.jpg';
import celerpayImg from './assets/celerpay.jpg';
import farmtechImg from './assets/farmtech_guru.jpg';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeWorkbenchTab, setActiveWorkbenchTab] = useState('yolo');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSubject, setModalSubject] = useState(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Theme synchronization
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Scroll reveal and active section tracking via IntersectionObserver
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          if (entry.target.id) {
            setActiveSection(entry.target.id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [activeFilter, activeWorkbenchTab]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleOpenModal = (subject = null) => {
    setModalSubject(subject);
    setIsModalOpen(true);
    setMobileMenuOpen(false);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('disaleaniruddha@gmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleCopyCode = (codeText) => {
    navigator.clipboard.writeText(codeText);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  // Technical Workbench implementations corresponding to the curated projects
  const workbenchDemos = {
    yolo: {
      title: 'YOLO11 Autonomous Driving 3-Model Perception Suite',
      desc: 'Offline deep learning perception suite deploying 3 specialized neural architectures simultaneously: road paint markings, construction hazard scoring, and traffic signal locators.',
      metrics: [
        { label: 'Model Suite', value: '3 Specialized Nets' },
        { label: 'Training Corpus', value: '1,000+ Labeled Frames' },
        { label: 'Inference Latency', value: '14.8 ms / frame' },
        { label: 'Inference Engine', value: 'PyTorch CUDA' }
      ],
      code: `from ultralytics import YOLO
import cv2

# Initialize 3-Model Autonomous Driving Suite
lane_model = YOLO("model1_road_lanes.pt")
hazard_model = YOLO("model2_road_construction.pt")
signal_model = YOLO("model3_traffic_signals.pt")

def analyze_road_scene(frame):
    # Simultaneous multi-model frame inference
    lanes = lane_model(frame, conf=0.45)
    hazards = hazard_model(frame, conf=0.50)
    signals = signal_model(frame, conf=0.55)
    
    return {
        "lane_geometry": lanes[0].boxes,
        "hazard_score": calculate_hazard_risk(hazards[0].boxes),
        "traffic_signals": signals[0].boxes
    }`
    },
    dataflow: {
      title: 'DataFlow — Python ETL Stream Processing (2.8M Records)',
      desc: 'Memory-safe streaming pipeline designed for multi-gigabyte data dumps. Normalizes malformed schemas, repairs invalid dates, and splits across Excel 1.048M row ceilings.',
      metrics: [
        { label: 'Dataset Processed', value: '2.84+ Million Records' },
        { label: 'Excel Limit', value: 'Bypasses 1.048M Max' },
        { label: 'Stream Buffer', value: '100k Rows / Iter' },
        { label: 'RAM Footprint', value: '< 480 MB Peak' }
      ],
      code: `import pandas as pd

def stream_massive_dump(file_path: str, chunk_size: int = 100000):
    """
    Stream-processes 2.8M+ record dumps without memory exhaustion.
    Bypasses Excel's 1,048,576 row hard ceiling with chunk routing.
    """
    processed_chunks = []
    for chunk in pd.read_csv(file_path, chunksize=chunk_size, low_memory=False):
        # Sanitize dates, strip whitespace, isolate #N/A anomalies
        chunk['timestamp'] = pd.to_datetime(chunk['timestamp'], errors='coerce')
        valid = chunk.dropna(subset=['account_id', 'amount'])
        processed_chunks.append(valid)
        
    df_clean = pd.concat(processed_chunks, ignore_index=True)
    return df_clean`
    },
    paperforge: {
      title: 'PaperForge — In-Browser Vector PDF Manipulation Engine',
      desc: 'Client-side vector document manipulation running in WebAssembly and 2D Canvas contexts. Modifies PDF binary structures with zero remote server transmissions.',
      metrics: [
        { label: 'Server Uploads', value: '0 Bytes (100% Private)' },
        { label: 'Raster Latency', value: '< 120 ms' },
        { label: 'Compliance', value: 'GDPR / HIPAA Safe' },
        { label: 'Export Format', value: 'PDF/A Standard' }
      ],
      code: `import { PDFDocument, rgb } from 'pdf-lib';

export async function annotateDocument(pdfBytes: Uint8Array, annotations: any[]) {
  // Load PDF binary structure directly in client memory
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // Draw client-side vector highlights without server roundtrips
  annotations.forEach(item => {
    firstPage.drawRectangle({
      x: item.x, y: item.y, width: item.w, height: item.h,
      color: rgb(0.26, 0.22, 0.79), opacity: 0.25,
    });
  });
  return await pdfDoc.save();
}`
    },
    celerpay: {
      title: 'CelerPay — UPI Transaction State Machine & Clean Architecture',
      desc: 'Deterministic payment workflow using Flutter Provider state management. Manages transaction validation, PIN authorization, real-time balance mutation, and receipt generation.',
      metrics: [
        { label: 'Architecture', value: 'Modular Clean Pattern' },
        { label: 'State Engine', value: 'Flutter Provider Notifier' },
        { label: 'PIN Verification', value: 'Multi-Stage Auth Flow' },
        { label: 'Theme Engine', value: 'Adaptive Material Design' }
      ],
      code: `// UPI Transaction State Machine (Flutter / Dart)
class PaymentNotifier extends ChangeNotifier {
  PaymentStatus _status = PaymentStatus.initial;
  PaymentStatus get status => _status;

  Future<TransactionReceipt> executeUpiTransfer({
    required String upiId,
    required double amount,
    required String securityPin,
  }) async {
    _status = PaymentStatus.authorizing;
    notifyListeners();

    final isAuthorized = await _authService.verifyPin(securityPin);
    if (!isAuthorized) {
      _status = PaymentStatus.authFailed;
      notifyListeners();
      throw SecurityException("Invalid UPI PIN");
    }

    _status = PaymentStatus.processing;
    notifyListeners();

    final receipt = await _paymentService.dispatchTransfer(upiId, amount);
    _walletBalance -= amount;
    _status = PaymentStatus.completed;
    notifyListeners();
    return receipt;
  }
}`
    },
    farmtech: {
      title: 'FarmTech Guru — Mobile Agricultural Advisory Engine',
      desc: 'Agronomic calculation engine computing fertilizer requirements from land geometry, crop phenology, and localized microclimate data with offline Firestore caching.',
      metrics: [
        { label: 'Platform', value: 'Android / Java' },
        { label: 'Database', value: 'Firebase Firestore' },
        { label: 'Offline Sync', value: 'SQLite / Room DB' },
        { label: 'Weather Feed', value: 'OpenWeatherMap API' }
      ],
      code: `// Fertilizer Calculation Engine & Crop Advisory
public class FertilizerEngine {
    public static FertilizerPlan calculate(Crop crop, double landAcres) {
        double recommendedN = crop.getRecommendedNitrogen();
        double recommendedP = crop.getRecommendedPhosphorus();
        
        // Chemical stoichiometric conversion to commercial fertilizer weights
        double totalUreaKg = (recommendedN * landAcres) / 0.46;
        double totalDapKg = (recommendedP * landAcres) / 0.46;
        
        return new FertilizerPlan(totalUreaKg, totalDapKg, crop.getStage());
    }
}`
    }
  };

  // Exactly 5 approved projects
  const projects = [
    {
      id: 'yolo11',
      title: 'YOLO11 Autonomous Driving 3-Model Perception Suite',
      category: ['ai'],
      tags: ['YOLO11', 'PyTorch', 'OpenCV', 'Computer Vision', 'Python'],
      badge: 'AI & Computer Vision',
      image: yoloImg,
      desc: 'Offline deep learning perception suite deploying 3 specialized neural architectures simultaneously: (1) Road paint marking, color & lanes, (2) Road work & construction hazard scoring, and (3) Traffic signal locator.',
      specs: [
        { label: 'Problem', val: 'Autonomous driving perception requires real-time, low-latency road telemetry without cloud dependencies.' },
        { label: 'Architecture', val: 'Custom YOLO11 neural nets trained on 1,000+ labeled road frames with coordinate telemetry overlays.' },
        { label: 'Outcome', val: 'Simultaneous multi-model inference achieving sub-15ms frame latency on NVIDIA hardware.' }
      ],
      github: 'https://github.com/venoumsk'
    },
    {
      id: 'dataflow',
      title: 'DataFlow Enterprise Automation Pipeline',
      category: ['data'],
      tags: ['Python', 'Pandas', 'OpenPyXL', 'Excel Automation', 'ETL'],
      badge: 'Python & Big Data ETL',
      image: dataflowImg,
      desc: 'High-speed Python stream processing pipeline engineered for automated dump file ingestion. Normalizes broken schemas, standardizes dates, and handles 2.8+ Million records with zero memory leaks.',
      specs: [
        { label: 'Problem', val: 'Enterprise operational dump files exceed Microsoft Excel 1,048,576 row hard ceilings and trigger memory exhaustion.' },
        { label: 'Architecture', val: 'Chunked iterator streams (100k rows/chunk) with automated date standardization and schema validation.' },
        { label: 'Outcome', val: 'Processed 2.84M+ records with memory strictly bounded under 480 MB and 100% data fidelity.' }
      ],
      github: 'https://github.com/venoumsk/data-automation-demo'
    },
    {
      id: 'paperforge',
      title: 'PaperForge — Private In-Browser Document Studio',
      category: ['web'],
      tags: ['React', 'Vite', 'Canvas API', 'pdf-lib', 'Client-Side WebAssembly'],
      badge: 'React & Vite Web App',
      image: paperforgeImg,
      desc: 'Full-featured client-side PDF and Word document editor. Annotate with text, freehand canvas drawing, insert vector shapes, and reorder pages with zero remote network requests.',
      specs: [
        { label: 'Problem', val: 'Sensitive documents uploaded to third-party cloud editors risk confidentiality and incur network latency.' },
        { label: 'Architecture', val: '100% in-browser Canvas 2D rasterization and pdf-lib binary reconstruction.' },
        { label: 'Outcome', val: 'Zero server uploads (GDPR/HIPAA safe), sub-120ms vector rendering latency, and standard PDF/A export.' }
      ],
      github: 'https://github.com/venoumsk/paperforge'
    },
    {
      id: 'celerpay',
      title: 'CelerPay — UPI Mobile Payment Platform',
      category: ['mobile'],
      tags: ['Flutter', 'Dart', 'Provider', 'Clean Architecture', 'UPI UI'],
      badge: 'Flutter Mobile App',
      image: celerpayImg,
      desc: 'Modern UPI payment application built with Flutter. Implements modular clean architecture, wallet balance tracking, QR scanning, transaction history, and adaptive material themes.',
      specs: [
        { label: 'Problem', val: 'Payment workflows require deterministic state transitions, secure PIN flows, and zero UI stutter.' },
        { label: 'Architecture', val: 'Feature-first clean architecture with Provider state management and reactive transaction updates.' },
        { label: 'Outcome', val: 'Comprehensive transaction execution, verification sheets, and resilient state handling.' }
      ],
      github: 'https://github.com/venoumsk/celerpay'
    },
    {
      id: 'farmtech',
      title: 'FarmTech Guru — Smart Agriculture Platform',
      category: ['mobile'],
      tags: ['Android', 'Java', 'Firebase Firestore', 'Weather API', 'Mobile Dev'],
      badge: 'Native Android App',
      image: farmtechImg,
      desc: 'Native Android application for agricultural decision-making. Features localized weather telemetry, crop phenological diagnostics, chemical fertilizer dosage calculators, and inventory tracking.',
      specs: [
        { label: 'Problem', val: 'Farmers lack scientific fertilizer conversion models, leading to costly over-application and degraded soil.' },
        { label: 'Architecture', val: 'Native Android Studio architecture with FertilizerEngine dosage algorithms and offline Firestore caching.' },
        { label: 'Outcome', val: 'Accurate agrochemical dosage plans, localized microclimate alerts, and seamless rural offline operation.' }
      ],
      github: 'https://github.com/venoumsk/FarmTech_Guru'
    }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category.includes(activeFilter));

  const currentWorkbench = workbenchDemos[activeWorkbenchTab];

  return (
    <div className="portfolio-app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="container nav-content">
          <a href="#" className="nav-brand">
            <span>venoumsk</span>
            <span className="brand-dot">/dev</span>
          </a>

          <ul className="nav-links">
            <li>
              <a 
                href="#workbench" 
                className={`nav-link ${activeSection === 'workbench' ? 'active' : ''}`}
              >
                Workbench
              </a>
            </li>
            <li>
              <a 
                href="#work" 
                className={`nav-link ${activeSection === 'work' ? 'active' : ''}`}
              >
                Projects
              </a>
            </li>
            <li>
              <a 
                href="#credentials" 
                className={`nav-link ${activeSection === 'credentials' ? 'active' : ''}`}
              >
                Credentials
              </a>
            </li>
            <li>
              <a 
                href="https://github.com/venoumsk" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="nav-link"
              >
                GitHub ↗
              </a>
            </li>
          </ul>

          <div className="nav-actions">
            <button 
              onClick={toggleTheme} 
              className="theme-toggle-btn" 
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? (
                <svg className="theme-icon" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg className="theme-icon" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
            </button>
            <div className="badge badge-status">
              <span className="badge-status-dot"></span>
              <span>Available for Systems &amp; Vision</span>
            </div>
            <button onClick={() => handleOpenModal()} className="btn btn-primary">
              Contact
            </button>
            <button 
              className={`mobile-nav-toggle ${mobileMenuOpen ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Navigation"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-drawer">
            <a 
              href="#workbench" 
              className="nav-link" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Workbench
            </a>
            <a 
              href="#work" 
              className="nav-link" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Projects
            </a>
            <a 
              href="#credentials" 
              className="nav-link" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Credentials
            </a>
            <a 
              href="https://github.com/venoumsk" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              GitHub Profile ↗
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="hero-section section" id="hero">
        <div className="container">
          <div className="hero-badge-wrap">
            <span className="badge">
              Software Developer · Computer Vision, High-Throughput Pipelines &amp; Mobile Systems
            </span>
          </div>

          <h1 className="hero-title">
            Engineering high-throughput data systems, computer vision &amp; modern applications.
          </h1>

          <p className="hero-subtitle">
            Software developer building offline perception suites (YOLO11 PyTorch), high-throughput stream pipelines (2.8M+ records), and reactive client-side applications with zero external server dependencies.
          </p>

          <div className="hero-ctas">
            <a href="#work" className="btn btn-primary">
              View Verified Projects
            </a>
            <a href="#workbench" className="btn btn-secondary">
              Inspect Code &amp; Architecture
            </a>
            <button onClick={() => handleOpenModal()} className="btn btn-secondary">
              Get in Touch
            </button>
          </div>

          <div className="hero-stats-grid">
            <div className="stat-card">
              <div className="stat-value">3 Neural Models</div>
              <div className="stat-label">YOLO11 Autonomous Suite</div>
              <div className="stat-desc">Real-time offline inference across road lanes, construction hazards, and traffic signals.</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">2.8M+ Records</div>
              <div className="stat-label">DataFlow Stream Pipeline</div>
              <div className="stat-desc">High-throughput chunked stream ingestion overcoming Microsoft Excel's 1.048M row ceiling.</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">&lt; 120ms Vector Latency</div>
              <div className="stat-label">PaperForge Document Studio</div>
              <div className="stat-desc">In-browser Canvas PDF manipulation with zero network transmissions and standard PDF/A export.</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">Clean Architecture</div>
              <div className="stat-label">CelerPay &amp; Mobile Systems</div>
              <div className="stat-desc">Modular clean architecture with Provider state management and offline-first data caching.</div>
            </div>
          </div>

          <div className="scroll-indicator-wrap">
            <a href="#workbench" className="scroll-indicator-pill">
              <span className="scroll-indicator-dot"></span>
              <span>SCROLL TO EXPLORE WORKBENCH</span>
            </a>
          </div>
        </div>
      </header>

      {/* Interactive Technical Workbench */}
      <section id="workbench" className="section reveal-on-scroll reveal-init">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Engineered Capabilities</span>
            <h2 className="section-title">Technical Workbench &amp; Architecture</h2>
            <p className="section-subtitle">
              Inspect sample logic, execution latency, and architectural decisions across core software toolchains.
            </p>
          </div>

          <div className="workbench-card">
            <div className="workbench-tabs">
              <button 
                className={`workbench-tab-btn ${activeWorkbenchTab === 'yolo' ? 'active' : ''}`}
                onClick={() => setActiveWorkbenchTab('yolo')}
              >
                YOLO11 AI Perception
              </button>
              <button 
                className={`workbench-tab-btn ${activeWorkbenchTab === 'dataflow' ? 'active' : ''}`}
                onClick={() => setActiveWorkbenchTab('dataflow')}
              >
                DataFlow 2.8M Stream ETL
              </button>
              <button 
                className={`workbench-tab-btn ${activeWorkbenchTab === 'paperforge' ? 'active' : ''}`}
                onClick={() => setActiveWorkbenchTab('paperforge')}
              >
                PaperForge Vector PDF
              </button>
              <button 
                className={`workbench-tab-btn ${activeWorkbenchTab === 'celerpay' ? 'active' : ''}`}
                onClick={() => setActiveWorkbenchTab('celerpay')}
              >
                CelerPay UPI State Flow
              </button>
              <button 
                className={`workbench-tab-btn ${activeWorkbenchTab === 'farmtech' ? 'active' : ''}`}
                onClick={() => setActiveWorkbenchTab('farmtech')}
              >
                FarmTech Mobile Engine
              </button>
            </div>

            <div className="workbench-grid" key={activeWorkbenchTab}>
              <div className="workbench-info-col">
                <div>
                  <h3 className="workbench-title">
                    {currentWorkbench.title}
                  </h3>
                  <p className="workbench-desc">
                    {currentWorkbench.desc}
                  </p>

                  <div className="workbench-metrics">
                    {currentWorkbench.metrics.map((m, idx) => (
                      <div key={idx} className="metric-pill">
                        <div className="metric-pill-label">{m.label}</div>
                        <div className="metric-pill-val">{m.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <button 
                    onClick={() => handleOpenModal(currentWorkbench.title)}
                    className="btn btn-secondary"
                  >
                    Discuss This Implementation ↗
                  </button>
                </div>
              </div>

              <div className="workbench-code-box">
                <div className="code-header">
                  <div className="code-window-dots">
                    <span className="code-window-dot dot-red"></span>
                    <span className="code-window-dot dot-yellow"></span>
                    <span className="code-window-dot dot-green"></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span>Python / Dart / TypeScript / Java</span>
                    <button 
                      onClick={() => handleCopyCode(currentWorkbench.code)} 
                      className="code-copy-btn"
                      title="Copy code snippet"
                    >
                      {codeCopied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
                <pre className="code-body">
                  <code>{currentWorkbench.code}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Projects Showcase */}
      <section id="work" className="section reveal-on-scroll reveal-init">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Curated Showcase</span>
            <h2 className="section-title">Production Systems &amp; Engineering Projects</h2>
            <p className="section-subtitle">
              Offline computer vision perception suites, high-throughput stream pipelines, and client-side applications.
            </p>
          </div>

          <div className="filter-tabs">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Projects ({projects.length})
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'ai' ? 'active' : ''}`}
              onClick={() => setActiveFilter('ai')}
            >
              AI &amp; Vision ({projects.filter((p) => p.category.includes('ai')).length})
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'data' ? 'active' : ''}`}
              onClick={() => setActiveFilter('data')}
            >
              Data Engineering ({projects.filter((p) => p.category.includes('data')).length})
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'mobile' ? 'active' : ''}`}
              onClick={() => setActiveFilter('mobile')}
            >
              Mobile Applications ({projects.filter((p) => p.category.includes('mobile')).length})
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'web' ? 'active' : ''}`}
              onClick={() => setActiveFilter('web')}
            >
              Web Architecture ({projects.filter((p) => p.category.includes('web')).length})
            </button>
          </div>

          <div className="projects-grid" key={activeFilter}>
            {filteredProjects.map((p) => (
              <div key={p.id} className="project-card">
                <div>
                  <div className="project-preview-wrap">
                    <img 
                      src={p.image} 
                      alt={p.title} 
                      className="project-preview-img" 
                      loading="lazy" 
                    />
                    <div className="project-preview-overlay">
                      <span className="preview-badge">{p.badge}</span>
                    </div>
                  </div>

                  <div className="project-tags">
                    {p.tags.map((t) => (
                      <span key={t} className="project-tag">{t}</span>
                    ))}
                  </div>

                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-desc">{p.desc}</p>

                  <div className="project-specs">
                    {p.specs.map((s, idx) => (
                      <div key={idx} className="project-spec-item">
                        <span className="project-spec-label">{s.label}:</span>
                        <span className="project-spec-val">{s.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="project-links">
                  <a 
                    href={p.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-secondary"
                    style={{ fontSize: '0.82rem', padding: '0.5rem 0.9rem' }}
                  >
                    View Source on GitHub ↗
                  </a>
                  <button 
                    onClick={() => handleOpenModal(p.title)}
                    className="btn btn-primary"
                    style={{ fontSize: '0.82rem', padding: '0.5rem 0.9rem' }}
                  >
                    Architecture Inquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verified Credentials & Education */}
      <section id="credentials" className="section reveal-on-scroll reveal-init">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Academic &amp; Professional Background</span>
            <h2 className="section-title">Verified Education &amp; Credentials</h2>
            <p className="section-subtitle">
              Formal academic foundation in Information Technology combined with production systems engineering experience.
            </p>
          </div>

          <div className="credentials-grid">
            <div className="credential-card surface-card">
              <span className="credential-badge">Undergraduate Degree</span>
              <h3 className="credential-title">Bachelor of Science in Information Technology (B.Sc. IT)</h3>
              <div className="credential-inst">Changu Kana Thakur ACS College &bull; University of Mumbai</div>
              <div className="credential-meta">Graduation: 2025 &nbsp;|&nbsp; <strong>CGPA: 8.57 &bull; Final Year SGPA: 9.70</strong></div>
              <p className="credential-desc">
                Rigorous technical curriculum in Advanced Java, Data Structures &amp; Algorithms, Database Management Systems, Distributed Architecture, and Software Engineering.
              </p>
            </div>

            <div className="credential-card surface-card">
              <span className="credential-badge">Higher Secondary</span>
              <h3 className="credential-title">Higher Secondary Certificate (XII - Science PCMB)</h3>
              <div className="credential-inst">Maharashtra State Board of Secondary &amp; Higher Secondary Education</div>
              <div className="credential-meta">Completion: 2022</div>
              <p className="credential-desc">
                Rigorous foundational coursework in Physics, Chemistry, Mathematics, and Biology with focus on analytical problem-solving and mathematical logic.
              </p>
            </div>

            <div className="credential-card surface-card">
              <span className="credential-badge">Certifications</span>
              <h3 className="credential-title">Technical Certifications &amp; Training</h3>
              <div className="credential-inst">Skill Development &amp; Industry Standards</div>
              <p className="credential-desc" style={{ marginBottom: '0.85rem' }}>
                Completed specialized training in high-performance application development and cloud systems:
              </p>
              <div className="credential-tags">
                <span className="project-tag">Advance Technology: Kotlin Programming</span>
                <span className="project-tag">Advance Core Java</span>
                <span className="project-tag">Cloud Computing</span>
                <span className="project-tag">Basics of Information Technology</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)} aria-label="Close Modal">✕</button>
            
            <h3 style={{ fontSize: '1.35rem', fontWeight: 750, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
              Get in Touch
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.35rem', lineHeight: 1.5 }}>
              {modalSubject ? `Inquiring regarding: ${modalSubject}` : 'Open to technical discussions, computer vision pipelines, and software development collaboration.'}
            </p>

            <div style={{ background: 'var(--bg-card-alt)', padding: '1.1rem', borderRadius: '10px', border: '1px solid var(--border-hairline)', marginBottom: '1.35rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                  DIRECT EMAIL
                </span>
                <button 
                  onClick={handleCopyEmail}
                  className="btn btn-secondary" 
                  style={{ padding: '0.2rem 0.55rem', fontSize: '0.74rem' }}
                >
                  {emailCopied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92rem', fontWeight: 600, color: 'var(--accent-indigo)' }}>
                disaleaniruddha@gmail.com
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.85rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-hairline)' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                  PHONE / WHATSAPP
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  +91 9920881239
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.45rem' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                  LOCATION
                </span>
                <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                  Navi Mumbai, Maharashtra, India
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a 
                href={`mailto:disaleaniruddha@gmail.com?subject=${encodeURIComponent(modalSubject ? `Inquiry regarding ${modalSubject}` : 'Connecting with Aniruddha Disale')}&body=Hi Aniruddha,%0D%0A%0D%0AI would like to connect regarding [brief message].%0D%0A%0D%0ABest regards`}
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                Open Email Client ↗
              </a>
              <a 
                href="https://github.com/venoumsk" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                GitHub Profile ↗
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-content">
          <div>
            <span style={{ fontWeight: 750, fontSize: '0.95rem', color: 'var(--text-primary)' }}>venoumsk</span>
            <span style={{ color: 'var(--text-tertiary)', marginLeft: '0.5rem', fontSize: '0.84rem' }}>
              &copy; 2026 Aniruddha Disale &bull; Software Developer
            </span>
          </div>

          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
            <a href="https://github.com/venoumsk" target="_blank" rel="noopener noreferrer" className="nav-link">GitHub</a>
            <a href="https://github.com/venoumsk/FarmTech_Guru" target="_blank" rel="noopener noreferrer" className="nav-link">FarmTech Guru</a>
            <a href="https://github.com/venoumsk/paperforge" target="_blank" rel="noopener noreferrer" className="nav-link">PaperForge</a>
            <a href="https://github.com/venoumsk/data-automation-demo" target="_blank" rel="noopener noreferrer" className="nav-link">Data Pipeline</a>
            <a href="https://github.com/venoumsk/celerpay" target="_blank" rel="noopener noreferrer" className="nav-link">CelerPay</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
