import React, { useState, useEffect } from 'react';
import './App.css';

// Direct authentic asset imports bundled by Vite
import yoloImg from './assets/yolo11_perception.jpg';
import cadencexImg from './assets/cadencex.jpg';
import sortyImg from './assets/sorty.jpg';
import dataflowImg from './assets/dataflow.jpg';
import paperforgeImg from './assets/paperforge.jpg';
import celerpayImg from './assets/celerpay.jpg';
import farmtechImg from './assets/farmtech_guru.jpg';
import dinvoiceImg from './assets/dinvoice.jpg';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeWorkbenchTab, setActiveWorkbenchTab] = useState('cadencex');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSubject, setModalSubject] = useState(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleOpenModal = (subject = null) => {
    setModalSubject(subject);
    setIsModalOpen(true);
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

  const workbenchDemos = {
    cadencex: {
      title: 'CadenceX — Spatial Ingestion & Parity Reconciliation Engine',
      desc: 'High-throughput Python pipeline powered by Polars (Rust/C Arrow SIMD) that ingests, normalizes, and reconciles 1.05M spatial records across 8 database partitions in ~74 seconds.',
      metrics: [
        { label: 'Throughput', value: '14,195 rows / sec' },
        { label: 'Tested Dataset', value: '1,053,805 records' },
        { label: 'Execution Time', value: '74.24 seconds' },
        { label: 'Parity Drift', value: 'Exact Zero (Lossless)' }
      ],
      code: `import polars as pl

def reconcile_spatial_cadence(file_path: str) -> dict:
    """
    Vectorized spatial cadence processing using Polars Arrow engine.
    Mathematical parity: Extracted = Eligible + Excluded + Held.
    """
    df = pl.read_csv(file_path, low_memory=False)
    
    # Vectorized categorization rules
    eligible = df.filter(pl.col("status").eq("ACTIVE") & pl.col("qa_score").gt(0.85))
    excluded = df.filter(pl.col("status").ne("ACTIVE") | pl.col("qa_score").le(0.85))
    held = df.filter(pl.col("review_flag").eq(True))
    
    extracted_count = len(df)
    balanced = extracted_count == (len(eligible) + len(excluded) + len(held))
    
    return {
        "extracted": extracted_count,
        "eligible": len(eligible),
        "excluded": len(excluded),
        "held": len(held),
        "parity_verified": balanced
    }`
    },
    sorty: {
      title: 'Sorty — GPU-Accelerated Spatial Partitioning Suite',
      desc: 'Hardware-accelerated partitioning engine leveraging NVIDIA CUDA / CuPy and Polars for dynamic L15 quadkey derivation and coordinate sorting without float precision loss.',
      metrics: [
        { label: 'GPU Engine', value: 'CuPy CUDA Kernels' },
        { label: 'Vector Sort', value: '82,400 rows / sec' },
        { label: 'Coordinate Precision', value: '7-Decimal (FP64)' },
        { label: 'Partition Output', value: 'Dynamic L15 Quadkeys' }
      ],
      code: `import cupy as cp
import numpy as np

def compute_l15_quadkeys_gpu(latitudes: np.ndarray, longitudes: np.ndarray):
    """
    Computes Level-15 Quadkeys on NVIDIA RTX 3050 GPU using CuPy.
    Preserves 7-decimal floating point precision without coordinate truncation.
    """
    d_lat = cp.asarray(latitudes, dtype=cp.float64)
    d_lon = cp.asarray(longitudes, dtype=cp.float64)
    
    # Normalized coordinate space mapping [0, 1]
    norm_x = (d_lon + 180.0) / 360.0
    sin_lat = cp.sin(d_lat * (cp.pi / 180.0))
    norm_y = 0.5 - cp.log((1.0 + sin_lat) / (1.0 - sin_lat)) / (4.0 * cp.pi)
    
    tile_x = cp.floor(norm_x * (1 << 15)).astype(cp.int32)
    tile_y = cp.floor(norm_y * (1 << 15)).astype(cp.int32)
    
    return cp.asnumpy(tile_x), cp.asnumpy(tile_y)`
    },
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
    },
    invoice: {
      title: 'D-Invoice — Standalone Client-Side GST Billing Engine',
      desc: 'Zero-dependency financial billing engine executing itemized GST subtotals, tax splits (CGST + SGST), discounts, and vector print formatting without server calls.',
      metrics: [
        { label: 'Calculation Time', value: '< 1 ms' },
        { label: 'Tax Accuracy', value: 'CGST + SGST Exact' },
        { label: 'Dependencies', value: 'Zero (Vanilla JS)' },
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
      id: 'cadencex',
      title: 'CadenceX — Enterprise Cadence Reporting & Spatial Data Engine',
      category: ['data', 'desktop'],
      tags: ['Python', 'Polars', 'CustomTkinter', 'Spatial Data QA', 'XlsxWriter'],
      badge: 'Spatial Data Engine',
      image: cadencexImg,
      desc: 'Enterprise spatial reporting suite engineered to ingest, filter, and reconcile 1,053,805 records across 8 database partitions in approximately 74 seconds with peak memory under 2.8 GB.',
      specs: [
        { label: 'Problem', val: 'Manual Excel workflows crashed on datasets exceeding 1M rows and lacked verifiable extraction audit parity.' },
        { label: 'Architecture', val: 'Vectorized Polars (Rust/C Arrow engine) with asynchronous CustomTkinter desktop interface.' },
        { label: 'Outcome', val: 'Verified zero parity drift: Extracted (1,053,805) = Eligible (894,120) + Excluded (142,390) + Held (17,295).' }
      ],
      github: 'https://github.com/venoumsk'
    },
    {
      id: 'sorty',
      title: 'Sorty — GPU-Accelerated Spatial & Automotive Partitioning Tool',
      category: ['data', 'desktop'],
      tags: ['Python', 'Polars', 'CUDA / CuPy', 'GPU Acceleration', 'Spatial Partitioning'],
      badge: 'GPU Acceleration & Spatial QA',
      image: sortyImg,
      desc: 'High-performance desktop sorting and partitioning engine for large-scale automotive and spatial engineering datasets, powered by Polars and NVIDIA CUDA/CuPy on an RTX 3050 GPU.',
      specs: [
        { label: 'Problem', val: 'High-resolution geographic datasets freeze conventional processors and lose floating-point decimal precision.' },
        { label: 'Architecture', val: 'Dynamic Level-15 quadkey derivation, GPU bounding-box kernels, and automated column mapping rules.' },
        { label: 'Outcome', val: 'Lossless FP64 7-decimal coordinate fidelity sorted at 82,400 rows/second with zero truncation.' }
      ],
      github: 'https://github.com/venoumsk'
    },
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
        { label: 'Outcome', val: 'Processed 2.84M+ records with memory strictly bounded under 480 MB and 100% lossless output.' }
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
    },
    {
      id: 'dinvoice',
      title: 'D-Invoice — GST-Ready Web Invoicing Engine',
      category: ['web'],
      tags: ['JavaScript', 'HTML5', 'CSS3', 'PDF Engine', 'Financial Logic'],
      badge: 'Web Application',
      image: dinvoiceImg,
      desc: 'Zero-overhead invoice generation engine built for merchants and small businesses. Computes multi-item inventory totals, tax splits (CGST + SGST), discounts, and generates print-ready vector PDFs without server dependencies.',
      specs: [
        { label: 'Problem', val: 'Traditional invoicing software requires recurring subscriptions, database setup, and internet access.' },
        { label: 'Architecture', val: 'Pure vanilla JavaScript financial calculations with embedded print stylesheets and thermal receipt mode.' },
        { label: 'Outcome', val: 'Sub-millisecond calculation latency, zero external API dependencies, and instant client-side PDF export.' }
      ],
      github: 'https://github.com/venoumsk/D-invoice'
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
              <span>Full-Stack &amp; Spatial Systems</span>
            </div>
            <button onClick={() => handleOpenModal()} className="btn btn-primary">
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section section">
        <div className="container">
          <div className="hero-badge-wrap">
            <span className="badge">
              Software Developer · Spatial Data Systems, Computer Vision &amp; High-Throughput Pipelines
            </span>
          </div>

          <h1 className="hero-title">
            Engineering high-throughput data engines, offline computer vision &amp; full-stack systems.
          </h1>

          <p className="hero-subtitle">
            Software developer building resilient backend data pipelines (1M+ records on Polars), offline perception suites (YOLO11 PyTorch), and client-side web applications with zero external server dependencies.
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
              <div className="stat-value">1.05M Records in ~74s</div>
              <div className="stat-label">CadenceX Spatial Engine</div>
              <div className="stat-desc">Rust/Polars SIMD Arrow engine with zero mathematical parity drift across 8 enterprise partitions.</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">3 Perception Models</div>
              <div className="stat-label">YOLO11 Autonomous Suite</div>
              <div className="stat-desc">Offline real-time inference on 1,000+ labeled road frames for lanes, construction hazards, and signals.</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">2.8M+ Records Processed</div>
              <div className="stat-label">DataFlow Stream ETL</div>
              <div className="stat-desc">High-throughput chunked stream ingestion overcoming Microsoft Excel's 1.048M row ceiling.</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">Dynamic L15 Quadkeys</div>
              <div className="stat-label">GPU Spatial QA (Sorty)</div>
              <div className="stat-desc">Hardware-accelerated coordinate sorting (CUDA/CuPy) with lossless 7-decimal float precision.</div>
            </div>
          </div>
        </div>
      </header>

      {/* Interactive Technical Workbench */}
      <section id="workbench" className="section">
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
                className={`workbench-tab-btn ${activeWorkbenchTab === 'cadencex' ? 'active' : ''}`}
                onClick={() => setActiveWorkbenchTab('cadencex')}
              >
                CadenceX Spatial Engine
              </button>
              <button 
                className={`workbench-tab-btn ${activeWorkbenchTab === 'sorty' ? 'active' : ''}`}
                onClick={() => setActiveWorkbenchTab('sorty')}
              >
                Sorty GPU Partitioning
              </button>
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
                className={`workbench-tab-btn ${activeWorkbenchTab === 'farmtech' ? 'active' : ''}`}
                onClick={() => setActiveWorkbenchTab('farmtech')}
              >
                FarmTech Mobile Engine
              </button>
              <button 
                className={`workbench-tab-btn ${activeWorkbenchTab === 'invoice' ? 'active' : ''}`}
                onClick={() => setActiveWorkbenchTab('invoice')}
              >
                D-Invoice GST Engine
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
                    <span>Python / Rust / TypeScript / Java</span>
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

      {/* Verified Projects Section */}
      <section id="work" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Verified Showcase</span>
            <h2 className="section-title">Production Systems &amp; Engineering Projects</h2>
            <p className="section-subtitle">
              High-throughput data engines, offline computer vision perception suites, and client-side web applications.
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
              className={`filter-btn ${activeFilter === 'data' ? 'active' : ''}`}
              onClick={() => setActiveFilter('data')}
            >
              Spatial &amp; Big Data ({projects.filter(p => p.category.includes('data')).length})
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'ai' ? 'active' : ''}`}
              onClick={() => setActiveFilter('ai')}
            >
              AI &amp; Vision ({projects.filter(p => p.category.includes('ai')).length})
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'desktop' ? 'active' : ''}`}
              onClick={() => setActiveFilter('desktop')}
            >
              Desktop Systems ({projects.filter(p => p.category.includes('desktop')).length})
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'mobile' ? 'active' : ''}`}
              onClick={() => setActiveFilter('mobile')}
            >
              Mobile Applications ({projects.filter(p => p.category.includes('mobile')).length})
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'web' ? 'active' : ''}`}
              onClick={() => setActiveFilter('web')}
            >
              Web Architecture ({projects.filter(p => p.category.includes('web')).length})
            </button>
          </div>

          <div className="projects-grid">
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
                    {p.tags.map(t => (
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
      <section id="credentials" className="section">
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

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)} aria-label="Close Modal">✕</button>
            
            <h3 style={{ fontSize: '1.35rem', fontWeight: 750, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
              Get in Touch
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.35rem', lineHeight: 1.5 }}>
              {modalSubject ? `Inquiring regarding: ${modalSubject}` : 'Open to technical discussions, spatial data engineering, and software development collaboration.'}
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
            <a href="https://github.com/venoumsk/D-invoice" target="_blank" rel="noopener noreferrer" className="nav-link">D-Invoice</a>
            <a href="https://github.com/venoumsk/data-automation-demo" target="_blank" rel="noopener noreferrer" className="nav-link">Data Pipeline</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
