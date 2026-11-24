import React, { useState, useEffect } from 'react';
import './App.css';

// Direct asset imports — bundled by Vite with 100% path safety on GitHub Pages
import yoloImg from './assets/yolo11_perception.jpg';
import farmtechImg from './assets/farmtech_guru.jpg';
import paperforgeImg from './assets/paperforge.jpg';
import dataflowImg from './assets/dataflow.jpg';
import dinvoiceImg from './assets/dinvoice.jpg';
import celerpayImg from './assets/celerpay.jpg';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeWorkbenchTab, setActiveWorkbenchTab] = useState('yolo');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [copied, setCopied] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleOpenModal = (service = null) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('disaleaniruddha@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCode = (codeText) => {
    navigator.clipboard.writeText(codeText);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const workbenchDemos = {
    yolo: {
      title: 'YOLO11 Autonomous Driving Multi-Model Inference',
      desc: 'Offline deep learning perception suite deploying 3 neural architectures: road lanes, construction hazard scoring, and traffic signals.',
      metrics: [
        { label: 'Model Suite', value: '3 Specialized Nets' },
        { label: 'Training Set', value: '1,000+ Labeled Frames' },
        { label: 'Telemetry', value: 'Real-Time Hazard Scoring' },
        { label: 'Inference Engine', value: 'PyTorch / YOLO11' }
      ],
      code: `from ultralytics import YOLO
import cv2

# Initialize 3-Model Autonomous Driving Suite
lane_model = YOLO("model1_road_lanes.pt")
hazard_model = YOLO("model2_road_construction.pt")
signal_model = YOLO("model3_traffic_signals.pt")

def analyze_road_scene(frame):
    # Simultaneous real-time frame inference
    lanes = lane_model(frame, conf=0.45)
    hazards = hazard_model(frame, conf=0.50)
    signals = signal_model(frame, conf=0.55)
    
    return {
        "lane_geometry": lanes[0].boxes,
        "hazard_score": calculate_hazard_risk(hazards[0].boxes),
        "traffic_signals": signals[0].boxes
    }`
    },
    csv: {
      title: 'Python Pandas ETL & 2.8M Record Dump Processing',
      desc: 'High-throughput stream processing that filters, cleans, and standardizes multi-gigabyte dump files with zero memory exhaustion.',
      metrics: [
        { label: 'Tested Dataset', value: '2.8+ Million Records' },
        { label: 'Excel Limit', value: 'Bypasses 1.04M Max' },
        { label: 'Chunk Ingestion', value: 'Memory-Safe Iter' },
        { label: 'Data Fidelity', value: '100% Lossless' }
      ],
      code: `import pandas as pd

def process_massive_dump(file_path: str, chunk_size: int = 100000):
    """
    Stream-processes 2.8M+ record dumps without exceeding RAM limits.
    Surpasses Excel's 1,048,576 row hard ceiling.
    """
    processed_chunks = []
    for chunk in pd.read_csv(file_path, chunksize=chunk_size, low_memory=False):
        # Sanitize dates, strip whitespace, isolate #N/A anomalies
        chunk['date'] = pd.to_datetime(chunk['date'], errors='coerce')
        valid = chunk.dropna(subset=['account_id', 'amount'])
        processed_chunks.append(valid)
        
    df_clean = pd.concat(processed_chunks, ignore_index=True)
    return df_clean`
    },
    farmtech: {
      title: 'FarmTech Guru — Mobile Agro-Engine & Cloud Sync',
      desc: 'Native Android application logic computing crop nutrient requirements, weather diagnostics, and offline-first Firestore synchronization.',
      metrics: [
        { label: 'Platform', value: 'Android / Java' },
        { label: 'Database', value: 'Firebase Firestore' },
        { label: 'Offline Mode', value: '100% Cache Sync' },
        { label: 'Weather Feed', value: 'OpenWeatherMap API' }
      ],
      code: `// Fertilizer Calculation Engine & Crop Advisory
public class FertilizerEngine {
    public static FertilizerPlan calculate(Crop crop, double landAcres) {
        double nitrogenPerAcre = crop.getRecommendedNitrogen();
        double phosphorusPerAcre = crop.getRecommendedPhosphorus();
        
        // Exact chemical conversion to commercial fertilizer weights
        double totalUreaKg = (nitrogenPerAcre * landAcres) / 0.46;
        double totalDapKg = (phosphorusPerAcre * landAcres) / 0.46;
        
        return new FertilizerPlan(totalUreaKg, totalDapKg, crop.getStage());
    }
}`
    },
    pdf: {
      title: 'Client-Side PDF Vector Manipulation',
      desc: 'In-browser canvas rendering with zero server uploads and zero data latency (PaperForge Core).',
      metrics: [
        { label: 'Server Uploads', value: '0 bytes (100% Private)' },
        { label: 'Render Latency', value: '< 120 ms' },
        { label: 'Vector Accuracy', value: 'Pixel-Perfect' },
        { label: 'Compliance', value: 'GDPR / HIPAA Safe' }
      ],
      code: `import { PDFDocument, rgb } from 'pdf-lib';

export async function annotateDocument(pdfBytes: Uint8Array, annotations: any[]) {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // Draw client-side vector highlights without server roundtrips
  annotations.forEach(item => {
    firstPage.drawRectangle({
      x: item.x, y: item.y, width: item.w, height: item.h,
      color: rgb(0.2, 0.7, 1.0), opacity: 0.35,
    });
  });
  return await pdfDoc.save();
}`
    },
    invoice: {
      title: 'GST-Ready Financial Billing Engine',
      desc: 'Lightweight client-side billing calculations with multi-item tax breakdown and instant print export (D-Invoice).',
      metrics: [
        { label: 'Calculation Latency', value: '< 1 ms' },
        { label: 'Tax Accuracy', value: 'CGST + SGST Exact' },
        { label: 'Backend Dependency', value: 'None (Standalone)' },
        { label: 'Print Output', value: 'Vector PDF / Thermal' }
      ],
      code: `function computeInvoiceTotals(items, gstRate = 0.18) {
  const subtotal = items.reduce((acc, it) => acc + (it.qty * it.rate), 0);
  const cgst = subtotal * (gstRate / 2);
  const sgst = subtotal * (gstRate / 2);
  const grandTotal = subtotal + cgst + sgst;

  return {
    subtotal: subtotal.toFixed(2),
    cgst: cgst.toFixed(2),
    sgst: sgst.toFixed(2),
    grandTotal: grandTotal.toFixed(2)
  };
}`
    }
  };

  const projects = [
    {
      id: 'yolo11',
      title: 'YOLO11 Autonomous Driving 3-Model Perception Suite',
      category: ['ai', 'python'],
      tags: ['YOLO11', 'PyTorch', 'OpenCV', 'Computer Vision', 'Python'],
      image: yoloImg,
      badge: 'AI & Computer Vision',
      desc: 'Offline deep learning perception suite deploying 3 neural models: (1) Road lanes & paint markings, (2) Construction zones & safety hazard scoring, and (3) Traffic signals state & spatial locator.',
      highlights: [
        'Custom YOLO11 architectures trained on 1,000+ labeled road frames',
        'Geospatial coordinate mapping with interactive inspection viewer',
        'Automated batch runners & real-time frame inference'
      ],
      github: 'https://github.com/venoumsk'
    },
    {
      id: 'dataflow',
      title: 'DataFlow Enterprise Automation Pipeline',
      category: ['python'],
      tags: ['Python', 'Pandas', 'OpenPyXL', 'Excel Automation', 'ETL'],
      image: dataflowImg,
      badge: 'Python & Big Data ETL',
      desc: 'High-speed Python pipeline engineered for automated dump file ingestion. Repairs irregular dates, standardizes broken schemas, isolates anomalies, and processes 2.8+ Million records with memory-efficient chunking and zero data loss.',
      highlights: [
        'High-throughput engine benchmarked on 2.8+ Million records',
        'Surpasses Microsoft Excel 1.04M row ceiling with chunked streams',
        'Auto-generates multi-tab executive KPI dashboard & native charts'
      ],
      github: 'https://github.com/venoumsk/data-automation-demo'
    },
    {
      id: 'paperforge',
      title: 'PaperForge — Private In-Browser Document Studio',
      category: ['web'],
      tags: ['React', 'Vite', 'Canvas API', 'pdf-lib', 'Word DOCX'],
      image: paperforgeImg,
      badge: 'React & Vite',
      desc: 'Full-featured client-side PDF & Word document editor. Annotate with text, freehand canvas drawing, insert geometric shapes/images, and reorder pages with zero server latency or data leakage.',
      highlights: [
        'Zero server uploads — 100% confidential & private',
        'Real-time vector canvas rendering & layer ordering',
        'Exports standard-compliant PDFs in < 150ms'
      ],
      github: 'https://github.com/venoumsk/paperforge'
    },
    {
      id: 'farmtech',
      title: 'FarmTech Guru — Smart Agriculture Mobile App',
      category: ['apps'],
      tags: ['Android', 'Java', 'Firebase Firestore', 'Weather API', 'App Dev'],
      image: farmtechImg,
      badge: 'Mobile Application',
      desc: 'Comprehensive mobile application built for agricultural decision-making. Features real-time weather forecasting, crop stage diagnostics, fertilizer dosage calculators, profitability modeling, and farm produce inventory tracking.',
      highlights: [
        'Native Android Studio architecture with offline Firestore cache',
        'Multi-stage crop disease identification & advisory guides',
        'Accurate agrochemical dosage & farm profit calculators'
      ],
      github: 'https://github.com/venoumsk/FarmTech_Guru'
    },
    {
      id: 'dinvoice',
      title: 'D-Invoice — GST-Ready Web Invoicing App',
      category: ['web'],
      tags: ['JavaScript', 'HTML5', 'CSS3', 'PDF Engine'],
      image: dinvoiceImg,
      badge: 'Web App & PDF',
      desc: 'Zero-overhead invoice generator built for small shops and merchants. Handles multi-item inventory calculation, automatic tax and discount computation, and instant print-ready branded PDF generation without server dependencies.',
      highlights: [
        'No login, database, or server configuration needed',
        'Automatic tax calculation & item subtotaling',
        'Instant client-side PDF download & thermal print mode'
      ],
      github: 'https://github.com/venoumsk/D-invoice'
    },
    {
      id: 'cadencex',
      title: 'CadenceX — Enterprise Cadence Reporting & Spatial Data Engine',
      category: ['python', 'apps'],
      tags: ['Python', 'Polars', 'CustomTkinter', 'Spatial Data QA', 'XlsxWriter'],
      image: dataflowImg,
      badge: 'Desktop System & Spatial Data',
      desc: 'High-performance reporting and data processing suite engineered for spatial cadence operations across 8 enterprise database partitions. Ingests, normalizes, and reconciles 1,053,805 records in ~74 seconds with peak memory under 2.8 GB.',
      highlights: [
        'Polars (Rust/C Arrow engine) vectorized SIMD throughput',
        'Mathematical row parity: Extracted = Eligible + Excluded + Held',
        'Zero-freeze asynchronous CustomTkinter desktop interface'
      ],
      github: 'https://github.com/venoumsk'
    },
    {
      id: 'sorty',
      title: 'Sorty — GPU-Accelerated Spatial & Automotive Partitioning Tool',
      category: ['python', 'apps'],
      tags: ['Python', 'Polars', 'CUDA / CuPy', 'GPU Acceleration', 'Spatial Partitioning'],
      image: dataflowImg,
      badge: 'GPU Acceleration & Spatial QA',
      desc: 'High-performance desktop sorting and partitioning engine for large-scale automotive and spatial engineering datasets. Leverages Polars and NVIDIA GPU acceleration (CuPy / GeForce RTX 3050) for dynamic L15 partition derivation, custom column mapping, and native Excel number formatting with zero coordinate precision loss.',
      highlights: [
        'Hardware acceleration via NVIDIA CUDA / CuPy and Polars SIMD',
        'Dynamic L15 spatial partition extraction and automated column rules',
        'Preserves high-precision decimal coordinates without truncation'
      ],
      github: 'https://github.com/venoumsk'
    },
    {
      id: 'celerpay',
      title: 'CelerPay — UPI Mobile Payment Application',
      category: ['apps'],
      tags: ['Flutter', 'Dart', 'Provider', 'Clean Architecture', 'UPI UI'],
      image: celerpayImg,
      badge: 'Flutter Mobile App',
      desc: 'PhonePe-inspired UPI payment application built with Flutter and Provider state management. Features modular clean architecture, balance updates, transaction history, QR/profile workflows, and adaptive themes.',
      highlights: [
        'Modular clean architecture with Provider state management',
        'Full payment transaction, confirmation, and receipt flows',
        'Adaptive light and dark material themes'
      ],
      github: 'https://github.com/venoumsk/celerpay'
    }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category.includes(activeFilter));

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
            <li><a href="#workbench" className="nav-link">Workbench</a></li>
            <li><a href="#work" className="nav-link">Projects</a></li>
            <li><a href="#credentials" className="nav-link">Credentials</a></li>
            <li><a href="https://github.com/venoumsk" target="_blank" rel="noopener noreferrer" className="nav-link">GitHub ↗</a></li>
          </ul>

          <div className="nav-actions">
            <button 
              onClick={toggleTheme} 
              className="theme-toggle-btn" 
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Studio'}
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <div className="badge badge-status">
              <span className="badge-status-dot"></span>
              <span>HERE Technologies</span>
            </div>
            <button onClick={() => handleOpenModal()} className="btn btn-primary">
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section section">
        <div className="hero-orb"></div>
        <div className="container">
          <div className="hero-badge-wrap animate-reveal">
            <span className="badge">
              Spatial Data Analyst Apprentice @ HERE Technologies · Software &amp; Data Systems
            </span>
          </div>

          <h1 className="hero-title animate-reveal-delay-1">
            Engineering high-speed AI vision, robust apps &amp;{' '}
            <span className="hero-title-gradient">automated pipelines.</span>
          </h1>

          <p className="hero-subtitle animate-reveal-delay-2">
            Spatial Data Analyst Apprentice at HERE Technologies. Engineering high-throughput data pipelines (1M+ records on Polars), offline Computer Vision (YOLO11), and client-side web architectures.
          </p>

          <div className="hero-ctas animate-reveal-delay-3">
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

          <div className="hero-stats-grid animate-reveal-delay-4">
            <div className="stat-card">
              <div className="stat-value">CadenceX</div>
              <div className="stat-label">1.05M Records in ~74s</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">YOLO11 Suite</div>
              <div className="stat-label">3 Autonomous Driving Models</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">2.8M+ Records</div>
              <div className="stat-label">Python High-Speed Data Pipelines</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">HERE Tech</div>
              <div className="stat-label">Spatial Data &amp; Map QA</div>
            </div>
          </div>
        </div>
      </header>

      {/* Interactive Technical Workbench */}
      <section id="workbench" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Engineered Capabilities</span>
            <h2 className="section-title">Technical Precision &amp; Code Craft</h2>
            <p className="section-subtitle">
              Inspect sample logic, execution latency, and architectural decisions across my core toolchains.
            </p>
          </div>

          <div className="workbench-card surface-card">
            <div className="workbench-tabs">
              <button 
                className={`workbench-tab-btn ${activeWorkbenchTab === 'yolo' ? 'active' : ''}`}
                onClick={() => setActiveWorkbenchTab('yolo')}
              >
                AI Vision (YOLO11 Suite)
              </button>
              <button 
                className={`workbench-tab-btn ${activeWorkbenchTab === 'csv' ? 'active' : ''}`}
                onClick={() => setActiveWorkbenchTab('csv')}
              >
                Python ETL &amp; 2.8M Data
              </button>
              <button 
                className={`workbench-tab-btn ${activeWorkbenchTab === 'farmtech' ? 'active' : ''}`}
                onClick={() => setActiveWorkbenchTab('farmtech')}
              >
                Mobile App Engine (FarmTech Guru)
              </button>
              <button 
                className={`workbench-tab-btn ${activeWorkbenchTab === 'pdf' ? 'active' : ''}`}
                onClick={() => setActiveWorkbenchTab('pdf')}
              >
                In-Browser Vector PDF (PaperForge)
              </button>
              <button 
                className={`workbench-tab-btn ${activeWorkbenchTab === 'invoice' ? 'active' : ''}`}
                onClick={() => setActiveWorkbenchTab('invoice')}
              >
                GST Financial Engine (D-Invoice)
              </button>
            </div>

            <div className="workbench-grid" key={activeWorkbenchTab}>
              <div className="workbench-info-col animate-fade-in">
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

                <div style={{ marginTop: '2rem' }}>
                  <button 
                    onClick={() => handleOpenModal(currentWorkbench.title)}
                    className="btn btn-secondary"
                  >
                    Discuss This Implementation →
                  </button>
                </div>
              </div>

              <div className="workbench-code-box animate-fade-in">
                <div className="code-header">
                  <div className="code-window-dots">
                    <span className="code-window-dot dot-red"></span>
                    <span className="code-window-dot dot-yellow"></span>
                    <span className="code-window-dot dot-green"></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span>Java / Python / TypeScript</span>
                    <button 
                      onClick={() => handleCopyCode(currentWorkbench.code)} 
                      className="code-copy-btn"
                      title="Copy code snippet"
                    >
                      {codeCopied ? '✓ Copied' : 'Copy'}
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

      {/* Verified Projects */}
      <section id="work" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Featured Work</span>
            <h2 className="section-title">Verified Software &amp; Applications</h2>
            <p className="section-subtitle">
              Native mobile apps, client-side web tools, and enterprise automation pipelines.
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
              AI &amp; Computer Vision
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'python' ? 'active' : ''}`}
              onClick={() => setActiveFilter('python')}
            >
              Python &amp; Big Data ETL
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'apps' ? 'active' : ''}`}
              onClick={() => setActiveFilter('apps')}
            >
              Mobile &amp; Desktop Apps
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'web' ? 'active' : ''}`}
              onClick={() => setActiveFilter('web')}
            >
              Web Applications
            </button>
          </div>

          <div className="projects-grid">
            {filteredProjects.map((p) => (
              <div key={p.id} className="project-card surface-card">
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
                    {p.tags.map(t => (
                      <span key={t} className="project-tag">{t}</span>
                    ))}
                  </div>

                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-desc">{p.desc}</p>

                  <ul className="project-highlights">
                    {p.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>

                <div className="project-links">
                  <a 
                    href={p.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-secondary"
                    style={{ fontSize: '0.84rem', padding: '0.55rem 1rem' }}
                  >
                    View Source on GitHub ↗
                  </a>
                  <button 
                    onClick={() => handleOpenModal(p.title)}
                    className="btn btn-primary"
                    style={{ fontSize: '0.84rem', padding: '0.55rem 1rem' }}
                  >
                    Inquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verified Credentials & Education */}
      <section id="credentials" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Academic &amp; Professional Background</span>
            <h2 className="section-title">Verified Education &amp; Credentials</h2>
            <p className="section-subtitle">
              Formal academic foundation in Information Technology combined with production software development experience.
            </p>
          </div>

          <div className="credentials-grid">
            <div className="credential-card surface-card">
              <span className="credential-badge">Undergraduate Degree</span>
              <h3 className="credential-title">Bachelor of Science in Information Technology (B.Sc. IT)</h3>
              <div className="credential-inst">Changu Kana Thakur ACS College &bull; University of Mumbai</div>
              <div className="credential-meta">Graduation: 2025 &nbsp;|&nbsp; <strong>CGPA: 8.57 &bull; SGPA: 9.70</strong></div>
              <p className="credential-desc">
                Extensive technical coursework across Advanced Java, Data Structures, Database Management Systems, Cloud Architecture, and Software Engineering methodologies.
              </p>
            </div>

            <div className="credential-card surface-card">
              <span className="credential-badge">Higher Secondary</span>
              <h3 className="credential-title">Higher Secondary Certificate (XII - Science PCMB)</h3>
              <div className="credential-inst">Maharashtra State Board of Secondary &amp; Higher Secondary Education</div>
              <div className="credential-meta">Completion: 2022</div>
              <p className="credential-desc">
                Intensive analytical coursework in Physics, Chemistry, Mathematics, and Biology with emphasis on algorithmic thinking and mathematical problem-solving.
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

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>✕</button>
            
            <h3 style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
              Get in Touch
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              Open to technical discussions, spatial data engineering, and software collaboration.
            </p>

            <div style={{ background: 'var(--bg-subtle)', padding: '1.1rem', borderRadius: '12px', border: '1px solid var(--border-hairline)', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                  DIRECT EMAIL
                </span>
                <button 
                  onClick={handleCopyEmail}
                  className="btn btn-secondary" 
                  style={{ padding: '0.25rem 0.65rem', fontSize: '0.78rem' }}
                >
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 600, color: 'var(--accent-indigo)' }}>
                disaleaniruddha@gmail.com
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.85rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-hairline)' }}>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                  PHONE / WHATSAPP
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  +91 9920881239
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.45rem' }}>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                  LOCATION
                </span>
                <span style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                  Navi Mumbai, Maharashtra, India
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a 
                href="mailto:disaleaniruddha@gmail.com?subject=Connecting with Aniruddha Disale&body=Hi Aniruddha,%0D%0A%0D%0AI would like to connect regarding [brief message].%0D%0A%0D%0ABest regards"
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

            <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Feel free to connect directly via email or GitHub.
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-content">
          <div>
            <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>venoumsk</span>
            <span style={{ color: 'var(--text-tertiary)', marginLeft: '0.5rem', fontSize: '0.86rem' }}>
              © 2026 Aniruddha Disale
            </span>
          </div>

          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
            <a href="https://github.com/venoumsk" target="_blank" rel="noopener noreferrer" className="nav-link">GitHub</a>
            <a href="https://github.com/venoumsk/FarmTech_Guru" target="_blank" rel="noopener noreferrer" className="nav-link">FarmTech Guru</a>
            <a href="https://github.com/venoumsk/paperforge" target="_blank" rel="noopener noreferrer" className="nav-link">PaperForge</a>
            <a href="https://github.com/venoumsk/D-invoice" target="_blank" rel="noopener noreferrer" className="nav-link">D-Invoice</a>
            <a href="https://github.com/venoumsk/data-automation-demo" target="_blank" rel="noopener noreferrer" className="nav-link">Data Pipeline</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
