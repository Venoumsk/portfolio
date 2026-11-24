import os
import math
from PIL import Image, ImageDraw, ImageFont

ASSETS_DIR = r"d:\free lancing\portfolio\src\assets"
os.makedirs(ASSETS_DIR, exist_ok=True)

# System fonts
FONT_REG = "C:/Windows/Fonts/segoeui.ttf"
FONT_BOLD = "C:/Windows/Fonts/segoeuib.ttf"
FONT_SEMI = "C:/Windows/Fonts/segoeuisl.ttf"
FONT_MONO = "C:/Windows/Fonts/consola.ttf"
FONT_MONO_BOLD = "C:/Windows/Fonts/consolab.ttf"

def get_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()

def draw_window_header(draw, width, title, is_dark=True):
    bg_color = (24, 24, 27) if is_dark else (241, 245, 249)
    border_color = (39, 39, 42) if is_dark else (226, 232, 240)
    text_color = (212, 212, 216) if is_dark else (51, 65, 85)
    
    # Title bar
    draw.rectangle([0, 0, width, 38], fill=bg_color)
    draw.line([0, 38, width, 38], fill=border_color, width=1)
    
    # Window dots
    dots = [(18, 19, (239, 68, 68)), (36, 19, (245, 158, 11)), (54, 19, (16, 185, 129))]
    for x, y, c in dots:
        draw.ellipse([x - 5, y - 5, x + 5, y + 5], fill=c)
        
    font = get_font(FONT_BOLD, 12)
    draw.text((76, 12), title, fill=text_color, font=font)

def create_yolo_asset():
    road_path = r"D:\object detector\test_images\sample_road_test.jpg"
    w, h = 1200, 675
    if os.path.exists(road_path):
        base = Image.open(road_path)
        # Crop center region to 16:9
        bw, bh = base.size
        target_ratio = w / h
        if bw / bh > target_ratio:
            new_bw = int(bh * target_ratio)
            left = (bw - new_bw) // 2
            base = base.crop((left, 0, left + new_bw, bh))
        else:
            new_bh = int(bw / target_ratio)
            top = (bh - new_bh) // 2
            base = base.crop((0, top, bw, top + new_bh))
        base = base.resize((w, h), Image.Resampling.LANCZOS)
    else:
        base = Image.new("RGB", (w, h), (30, 41, 59))
        
    draw = ImageDraw.Draw(base, "RGBA")
    
    # Dark subtle vignette overlay for contrast
    vignette = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    vdraw = ImageDraw.Draw(vignette)
    vdraw.rectangle([0, 0, w, 80], fill=(9, 9, 11, 200))
    vdraw.rectangle([0, h - 60, w, h], fill=(9, 9, 11, 220))
    base.paste(vignette, (0, 0), vignette)
    
    draw = ImageDraw.Draw(base, "RGBA")
    
    # Computer vision HUD header
    font_mono = get_font(FONT_MONO, 13)
    font_mono_bold = get_font(FONT_MONO_BOLD, 14)
    font_mono_sm = get_font(FONT_MONO, 11)
    
    draw.text((24, 20), "YOLO11 AUTONOMOUS PERCEPTION SUITE [CAMERA 01 - FRONT WIDE]", fill=(255, 255, 255), font=font_mono_bold)
    draw.text((24, 44), "INFERENCE: PyTorch CUDA (RTX 3050) | LATENCY: 14.8ms | FPS: 67.5 | STATUS: ACTIVE", fill=(56, 189, 248), font=font_mono)
    
    # Right HUD metrics
    draw.rectangle([w - 320, 16, w - 24, 66], fill=(15, 23, 42, 210), outline=(56, 189, 248, 120))
    draw.text((w - 308, 24), "MODELS LOADED: 3 / 3 SPECIALIZED", fill=(241, 245, 249), font=font_mono_sm)
    draw.text((w - 308, 44), "LANES: 4 | HAZARDS: 0 | SIGNALS: 1", fill=(74, 222, 128), font=font_mono_sm)
    
    # Detection Bounding Boxes & Lane vectors
    # 1. Lane detection polygon / lines
    draw.line([(240, h - 80), (510, 360)], fill=(56, 189, 248, 220), width=4)
    draw.line([(w - 260, h - 80), (690, 360)], fill=(56, 189, 248, 220), width=4)
    # Dashed center lane
    for y in range(370, h - 80, 45):
        draw.line([(595, y), (595, y + 25)], fill=(250, 204, 21, 220), width=3)
        
    # Tag for lanes
    draw.rectangle([480, 335, 620, 355], fill=(56, 189, 248, 220))
    draw.text((486, 338), "lane_marking 0.94", fill=(15, 23, 42), font=font_mono_sm)
    
    # 2. Ahead Vehicle Bounding Box
    box_veh = [540, 330, 680, 450]
    draw.rectangle(box_veh, outline=(34, 197, 94), width=2)
    # Label
    draw.rectangle([540, 310, 680, 330], fill=(34, 197, 94))
    draw.text((546, 314), "vehicle_ahead 0.92 [18m]", fill=(15, 23, 42), font=font_mono_sm)
    
    # Corner brackets for tech feel
    for bx, by, sx, sy in [(box_veh[0], box_veh[1], 1, 1), (box_veh[2], box_veh[1], -1, 1), 
                           (box_veh[0], box_veh[3], 1, -1), (box_veh[2], box_veh[3], -1, -1)]:
        draw.line([(bx, by), (bx + 12 * sx, by)], fill=(255, 255, 255), width=3)
        draw.line([(bx, by), (bx, by + 12 * sy)], fill=(255, 255, 255), width=3)

    # 3. Traffic Signal / Road Sign Box
    box_sign = [780, 220, 850, 310]
    draw.rectangle(box_sign, outline=(249, 115, 22), width=2)
    draw.rectangle([780, 200, 890, 220], fill=(249, 115, 22))
    draw.text((784, 204), "signal_green 0.96", fill=(255, 255, 255), font=font_mono_sm)
    
    # Bottom Telemetry bar
    draw.text((24, h - 42), "TELEMETRY: ROAD_TYPE: URBAN_DIVIDED | CURVATURE: 0.002 rad/m | HAZARD_RISK: LOW (0.04)", fill=(203, 213, 225), font=font_mono_sm)
    draw.text((w - 280, h - 42), "CONFIDENCE THRESHOLD: 0.45", fill=(148, 163, 184), font=font_mono_sm)
    
    out_path = os.path.join(ASSETS_DIR, "yolo11_perception.jpg")
    base.convert("RGB").save(out_path, "JPEG", quality=92)
    print(f"Generated {out_path}")

def create_cadencex_asset():
    w, h = 1200, 675
    img = Image.new("RGB", (w, h), (15, 23, 42))
    draw = ImageDraw.Draw(img)
    
    # Title bar
    draw_window_header(draw, w, "CadenceX — Spatial Cadence Ingestion & Reconciliation Engine v2.4 (x64)", is_dark=True)
    
    # KPI Stats Bar
    font_bold = get_font(FONT_BOLD, 15)
    font_mono = get_font(FONT_MONO, 12)
    font_mono_bold = get_font(FONT_MONO_BOLD, 13)
    font_reg = get_font(FONT_REG, 12)
    
    draw.rectangle([24, 52, w - 24, 122], fill=(30, 41, 59), outline=(51, 65, 85))
    
    stats = [
        ("TOTAL EXTRACTED", "1,053,805 records", (248, 250, 252)),
        ("PROCESSING DURATION", "74.24 seconds", (56, 189, 248)),
        ("SIMD THROUGHPUT", "14,195 rows / sec", (74, 222, 128)),
        ("PEAK RESIDENT RAM", "2.74 GB (Safe ceiling)", (250, 204, 21)),
        ("PARITY RECONCILIATION", "100% BALANCED", (34, 197, 94))
    ]
    col_w = (w - 48) // len(stats)
    for i, (label, val, val_col) in enumerate(stats):
        x = 24 + i * col_w
        if i > 0:
            draw.line([x, 58, x, 116], fill=(51, 65, 85), width=1)
        draw.text((x + 16, 64), label, fill=(148, 163, 184), font=get_font(FONT_BOLD, 10))
        draw.text((x + 16, 86), val, fill=val_col, font=font_mono_bold)
        
    # Main Partition Ledger & Table
    # Table Header
    th_y = 142
    draw.rectangle([24, th_y, w - 24, th_y + 34], fill=(30, 41, 59), outline=(71, 85, 105))
    headers = [
        ("RECORD_ID", 130),
        ("PARTITION_ID", 170),
        ("COORDINATE_REF", 200),
        ("RULE_CATEGORY", 190),
        ("RULE_OUTCOME", 160),
        ("AUDIT_PARITY", 140),
        ("STATUS", 120)
    ]
    cur_x = 36
    for title, width in headers:
        draw.text((cur_x, th_y + 9), title, fill=(203, 213, 225), font=get_font(FONT_BOLD, 11))
        cur_x += width
        
    # Table rows
    rows_data = [
        ("CDX_0010948", "PART_NA_EAST_01", "18.9874120, 73.1238914", "SPEED_LIMIT_RULE_24", "ELIGIBLE", "PARITY_MATCH", "INGESTED"),
        ("CDX_0010949", "PART_NA_EAST_01", "18.9875880, 73.1240120", "HAZARD_PROXIMITY_08", "ELIGIBLE", "PARITY_MATCH", "INGESTED"),
        ("CDX_0010950", "PART_EU_CENT_04", "50.1109240, 08.6821270", "JUNCTION_PRIORITY_12", "EXCLUDED_FILTER", "AUDIT_VERIFIED", "EXCLUDED"),
        ("CDX_0010951", "PART_EU_CENT_04", "50.1112400, 08.6834100", "LANE_BOUNDARY_QA_03", "ELIGIBLE", "PARITY_MATCH", "INGESTED"),
        ("CDX_0010952", "PART_APAC_STH_02", "12.9715980, 77.5945620", "SIGN_OCCLUSION_CHECK", "HELD_MANUAL_REV", "HELD_BUFFER", "HELD"),
        ("CDX_0010953", "PART_APAC_STH_02", "12.9721000, 77.5951200", "SPEED_LIMIT_RULE_24", "ELIGIBLE", "PARITY_MATCH", "INGESTED"),
        ("CDX_0010954", "PART_NA_WEST_03", "37.7749290,-122.419416", "GEOMETRY_SPLINE_QA", "ELIGIBLE", "PARITY_MATCH", "INGESTED"),
        ("CDX_0010955", "PART_NA_WEST_03", "37.7752100,-122.420100", "WORK_ZONE_CORRIDOR", "EXCLUDED_FILTER", "AUDIT_VERIFIED", "EXCLUDED"),
        ("CDX_0010956", "PART_EU_WEST_02", "48.8566140, 02.3522219", "AUTONOMOUS_TILE_SPLIT", "ELIGIBLE", "PARITY_MATCH", "INGESTED"),
        ("CDX_0010957", "PART_EU_WEST_02", "48.8570200, 02.3531000", "RADAR_REFLECTIVITY", "ELIGIBLE", "PARITY_MATCH", "INGESTED")
    ]
    
    row_y = th_y + 34
    for idx, row in enumerate(rows_data):
        row_bg = (15, 23, 42) if idx % 2 == 0 else (20, 30, 48)
        draw.rectangle([24, row_y, w - 24, row_y + 32], fill=row_bg, outline=(30, 41, 59))
        
        rx = 36
        for c_idx, val in enumerate(row):
            col_color = (241, 245, 249)
            if c_idx == 4:
                col_color = (74, 222, 128) if "ELIGIBLE" in val else ((248, 113, 113) if "EXCLUDED" in val else (250, 204, 21))
            elif c_idx == 5:
                col_color = (56, 189, 248)
            elif c_idx == 6:
                col_color = (148, 163, 184)
                
            draw.text((rx, row_y + 8), val, fill=col_color, font=font_mono)
            rx += headers[c_idx][1]
        row_y += 32
        
    # Bottom Audit Summary Bar
    draw.rectangle([24, h - 110, w - 24, h - 24], fill=(30, 41, 59), outline=(56, 189, 248, 120))
    draw.text((40, h - 98), "MATHEMATICAL RECONCILIATION AUDIT:", fill=(255, 255, 255), font=get_font(FONT_BOLD, 12))
    reconcile_text = "Extracted (1,053,805) = Eligible (894,120) + Excluded (142,390) + Held (17,295)  |  Discrepancy: 0 (Exact Zero Parity)"
    draw.text((40, h - 74), reconcile_text, fill=(74, 222, 128), font=font_mono_bold)
    draw.text((40, h - 50), "Output Target: Cadence_Partition_Master_Workbook_2026.xlsx  |  XlsxWriter Engine: SIMD Vectorized", fill=(148, 163, 184), font=font_mono)

    out_path = os.path.join(ASSETS_DIR, "cadencex.jpg")
    img.save(out_path, "JPEG", quality=92)
    print(f"Generated {out_path}")

def create_sorty_asset():
    w, h = 1200, 675
    img = Image.new("RGB", (w, h), (15, 23, 42))
    draw = ImageDraw.Draw(img)
    
    # Title bar
    draw_window_header(draw, w, "Sorty v1.8 — GPU-Accelerated Spatial Partitioning Suite [NVIDIA CUDA / CuPy]", is_dark=True)
    
    font_bold = get_font(FONT_BOLD, 14)
    font_mono = get_font(FONT_MONO, 12)
    font_mono_bold = get_font(FONT_MONO_BOLD, 13)
    font_mono_sm = get_font(FONT_MONO, 11)
    
    # Top hardware telemetry bar
    draw.rectangle([24, 50, w - 24, 96], fill=(24, 33, 47), outline=(51, 65, 85))
    draw.text((40, 62), "GPU ACCELERATION: NVIDIA GeForce RTX 3050 (4GB VRAM)  |  KERNEL: CuPy FP64 Spatial Bounding Box", fill=(56, 189, 248), font=font_mono_bold)
    draw.text((40, 78), "SIMD VECTORIZATION: Polars Rust Engine  |  PARTITION SCHEME: Dynamic L15 Quadkey Coordinate Derived", fill=(148, 163, 184), font=font_mono_sm)
    
    # Left Column: Spatial Quadkey / Grid Visualizer (Simulated Map / Coordinate Matrix)
    draw.rectangle([24, 112, 540, h - 24], fill=(20, 27, 38), outline=(51, 65, 85))
    draw.text((40, 124), "SPATIAL GRID (L15 QUADKEY PARTITION MATRIX)", fill=(241, 245, 249), font=get_font(FONT_BOLD, 12))
    
    # Draw spatial tile grid
    gx0, gy0, gw, gh = 48, 156, 468, 380
    draw.rectangle([gx0, gy0, gx0 + gw, gy0 + gh], fill=(11, 15, 25), outline=(56, 189, 248, 150))
    
    # Grid lines
    cols = 4
    rows = 4
    tile_w = gw / cols
    tile_h = gh / rows
    for c in range(1, cols):
        draw.line([(gx0 + c * tile_w, gy0), (gx0 + c * tile_w, gy0 + gh)], fill=(30, 41, 59), width=1)
    for r in range(1, rows):
        draw.line([(gx0, gy0 + r * tile_h), (gx0 + gw, gy0 + r * tile_h)], fill=(30, 41, 59), width=1)
        
    # Active partition highlight
    draw.rectangle([gx0 + tile_w, gy0 + tile_h, gx0 + 3 * tile_w, gy0 + 3 * tile_h], outline=(34, 197, 94), width=2)
    draw.text((gx0 + tile_w + 10, gy0 + tile_h + 10), "ACTIVE CLUSTER: L15_120489", fill=(34, 197, 94), font=font_mono_sm)
    draw.text((gx0 + tile_w + 10, gy0 + tile_h + 26), "Rows: 384,190 | Coord Loss: 0.0000000%", fill=(203, 213, 225), font=font_mono_sm)
    
    # Scattered coordinate nodes
    points = [
        (gx0 + 60, gy0 + 40, "18.9124, 72.8210"),
        (gx0 + 190, gy0 + 170, "18.9874, 73.1238"),
        (gx0 + 260, gy0 + 210, "19.0142, 73.1490"),
        (gx0 + 290, gy0 + 270, "19.0410, 73.1820"),
        (gx0 + 410, gy0 + 120, "19.1890, 73.2201"),
        (gx0 + 370, gy0 + 320, "19.2210, 73.1105"),
        (gx0 + 140, gy0 + 310, "18.9400, 72.9910")
    ]
    for px, py, tag in points:
        draw.ellipse([px - 4, py - 4, px + 4, py + 4], fill=(56, 189, 248))
        draw.ellipse([px - 8, py - 8, px + 8, py + 8], outline=(56, 189, 248, 120), width=1)
        draw.text((px + 8, py - 6), tag, fill=(148, 163, 184), font=get_font(FONT_MONO, 9))
        
    draw.text((40, h - 50), "BOUNDING BOX: [18.8900 N, 72.7800 E] -> [19.2600 N, 73.2500 E]", fill=(148, 163, 184), font=font_mono_sm)
    
    # Right Column: Execution Telemetry & Partition Ledger
    rx0 = 560
    draw.rectangle([rx0, 112, w - 24, h - 24], fill=(20, 27, 38), outline=(51, 65, 85))
    draw.text((rx0 + 20, 124), "EXECUTION TELEMETRY & DATA PARTITIONS", fill=(241, 245, 249), font=get_font(FONT_BOLD, 12))
    
    partitions = [
        ("Partition L15_120488", "142,800 rows", "14.2 ms (CUDA)", "Sheet: L15_120488.xlsx"),
        ("Partition L15_120489", "384,190 rows", "38.1 ms (CUDA)", "Sheet: L15_120489.xlsx"),
        ("Partition L15_120490", "219,450 rows", "21.7 ms (CUDA)", "Sheet: L15_120490.xlsx"),
        ("Partition L15_120491", "165,320 rows", "16.4 ms (CUDA)", "Sheet: L15_120491.xlsx"),
        ("Partition L15_120492", "98,400 rows", "9.8 ms (CUDA)", "Sheet: L15_120492.xlsx"),
        ("Partition L15_120493", "112,940 rows", "11.2 ms (CUDA)", "Sheet: L15_120493.xlsx")
    ]
    
    py_pos = 160
    for p_name, rows_c, c_time, s_name in partitions:
        draw.rectangle([rx0 + 20, py_pos, w - 44, py_pos + 46], fill=(11, 15, 25), outline=(30, 41, 59))
        draw.text((rx0 + 32, py_pos + 8), p_name, fill=(241, 245, 249), font=font_mono_bold)
        draw.text((rx0 + 32, py_pos + 26), f"Output: {s_name}", fill=(148, 163, 184), font=font_mono_sm)
        draw.text((w - 240, py_pos + 8), rows_c, fill=(74, 222, 128), font=font_mono_bold)
        draw.text((w - 240, py_pos + 26), c_time, fill=(56, 189, 248), font=font_mono_sm)
        py_pos += 56
        
    # Bottom summary box in right column
    draw.rectangle([rx0 + 20, h - 130, w - 44, h - 40], fill=(30, 41, 59), outline=(74, 222, 128, 120))
    draw.text((rx0 + 32, h - 118), "HIGH-PRECISION COORDINATE PRESERVATION:", fill=(255, 255, 255), font=get_font(FONT_BOLD, 11))
    draw.text((rx0 + 32, h - 96), "• FP64 7-Decimal Float Precision: 0.0000001 deg fidelity", fill=(74, 222, 128), font=font_mono_sm)
    draw.text((rx0 + 32, h - 76), "• SIMD Vectorized Sort Speed: 82,400 rows/second", fill=(56, 189, 248), font=font_mono_sm)
    draw.text((rx0 + 32, h - 56), "• Formatted Excel Cells: Native Float / Zero String Coercion", fill=(203, 213, 225), font=font_mono_sm)

    out_path = os.path.join(ASSETS_DIR, "sorty.jpg")
    img.save(out_path, "JPEG", quality=92)
    print(f"Generated {out_path}")

def create_dataflow_asset():
    w, h = 1200, 675
    img = Image.new("RGB", (w, h), (15, 23, 42))
    draw = ImageDraw.Draw(img)
    
    draw_window_header(draw, w, "DataFlow — High-Throughput Stream Ingestion & ETL Automation Pipeline v3.1", is_dark=True)
    
    font_bold = get_font(FONT_BOLD, 13)
    font_mono = get_font(FONT_MONO, 12)
    font_mono_bold = get_font(FONT_MONO_BOLD, 13)
    font_mono_sm = get_font(FONT_MONO, 11)
    
    # Top KPI Bar
    draw.rectangle([24, 50, w - 24, 110], fill=(24, 33, 47), outline=(51, 65, 85))
    metrics = [
        ("TARGET DATASET DUMP", "2,841,920 records", (248, 250, 252)),
        ("INGESTION STRATEGY", "100k Rows / Chunk Stream", (56, 189, 248)),
        ("RAM UTILIZATION", "440 MB Peak (Zero leaks)", (74, 222, 128)),
        ("EXCEL SHEET CEILING", "Bypasses 1.048M Limit", (250, 204, 21)),
        ("LOSSLESS RATE", "100.0% Schema Integrity", (34, 197, 94))
    ]
    mw = (w - 48) // len(metrics)
    for i, (l, v, c) in enumerate(metrics):
        mx = 24 + i * mw
        if i > 0:
            draw.line([mx, 56, mx, 104], fill=(51, 65, 85), width=1)
        draw.text((mx + 16, 60), l, fill=(148, 163, 184), font=get_font(FONT_BOLD, 10))
        draw.text((mx + 16, 82), v, fill=c, font=font_mono_bold)
        
    # Left: Terminal Stream Logs
    tx0 = 24
    draw.rectangle([tx0, 126, tx0 + 640, h - 24], fill=(11, 15, 25), outline=(51, 65, 85))
    draw.rectangle([tx0, 126, tx0 + 640, 158], fill=(20, 27, 38), outline=(51, 65, 85))
    draw.text((tx0 + 16, 136), "LIVE PIPELINE STREAM WORKER (terminal - 8 threads)", fill=(148, 163, 184), font=font_mono_sm)
    
    logs = [
        ("[00:00.1] INITIALIZE", "Ingestion stream opened for raw_dump_q4.csv (2.84 GB)", (148, 163, 184)),
        ("[00:03.4] SCHEMA CHECK", "Standardizing dates -> ISO-8601 YYYY-MM-DD", (56, 189, 248)),
        ("[00:08.2] CHUNK 01..05", "500,000 records ingested. Resident memory: 312 MB", (74, 222, 128)),
        ("[00:15.9] CHUNK 06..10", "1,000,000 records ingested. Chunk latency: 1.48s", (74, 222, 128)),
        ("[00:16.8] CEILING DETECT", "Excel 1,048,576 row ceiling reached -> Creating Part_1.xlsx", (250, 204, 21)),
        ("[00:24.1] CHUNK 11..15", "1,500,000 records ingested. Cleaned 14,892 #N/A anomalies", (74, 222, 128)),
        ("[00:32.4] CHUNK 16..20", "2,000,000 records ingested. Processing chunk delta: +44MB", (74, 222, 128)),
        ("[00:33.2] CEILING DETECT", "Excel 1,048,576 row ceiling reached -> Creating Part_2.xlsx", (250, 204, 21)),
        ("[00:41.8] CHUNK 21..28", "2,841,920 records total. Validation checks passed (0 fails)", (74, 222, 128)),
        ("[00:46.5] EXCEL GENERATE", "Auto-generating multi-tab KPI summary & native charts", (56, 189, 248)),
        ("[00:51.2] COMPLETE", "Export finished: DataFlow_Master_Q4.xlsx (Part 1, 2, 3)", (34, 197, 94))
    ]
    
    ly = 172
    for ts, msg, col in logs:
        draw.text((tx0 + 16, ly), ts, fill=col, font=font_mono_bold)
        draw.text((tx0 + 180, ly), msg, fill=(241, 245, 249), font=font_mono_sm)
        ly += 42
        
    # Right: Pipeline Stage Breakdown & Memory Graph
    rx0 = 680
    draw.rectangle([rx0, 126, w - 24, h - 24], fill=(20, 27, 38), outline=(51, 65, 85))
    draw.text((rx0 + 20, 138), "PIPELINE THROUGHPUT & MEMORY STABILITY", fill=(241, 245, 249), font=get_font(FONT_BOLD, 12))
    
    # Memory line graph simulation
    gx, gy, gw, gh = rx0 + 20, 172, (w - rx0 - 64), 160
    draw.rectangle([gx, gy, gx + gw, gy + gh], fill=(11, 15, 25), outline=(51, 65, 85))
    draw.line([gx, gy + gh * 0.75, gx + gw, gy + gh * 0.75], fill=(30, 41, 59), width=1)
    draw.line([gx, gy + gh * 0.5, gx + gw, gy + gh * 0.5], fill=(30, 41, 59), width=1)
    draw.line([gx, gy + gh * 0.25, gx + gw, gy + gh * 0.25], fill=(30, 41, 59), width=1)
    
    # Flat memory curve demonstrating zero leaks
    mem_points = []
    for step in range(20):
        px = gx + (gw * step / 19)
        # Steady flat with slight variance below 450MB
        val = 0.65 + 0.05 * math.sin(step)
        py = gy + gh * (1 - val)
        mem_points.append((px, py))
    draw.line(mem_points, fill=(74, 222, 128), width=3)
    draw.text((gx + 10, gy + 10), "RAM: STABLE 440 MB (NO OOM SPIKES)", fill=(74, 222, 128), font=font_mono_sm)
    
    # Pipeline stages progress bars
    stages = [
        ("Chunk Stream Ingestion", 100, (56, 189, 248)),
        ("Schema Validation & Null Sanitization", 100, (34, 197, 94)),
        ("Excel Partition Routing (>1.04M Split)", 100, (250, 204, 21)),
        ("Multi-Tab KPI Workbook Generation", 100, (168, 85, 247))
    ]
    sy = 360
    for s_name, pct, s_col in stages:
        draw.text((rx0 + 20, sy), s_name, fill=(203, 213, 225), font=font_mono_sm)
        draw.rectangle([rx0 + 20, sy + 18, rx0 + 20 + gw, sy + 28], fill=(11, 15, 25), outline=(51, 65, 85))
        draw.rectangle([rx0 + 20, sy + 18, rx0 + 20 + gw * (pct / 100), sy + 28], fill=s_col)
        draw.text((rx0 + gw - 30, sy), f"{pct}%", fill=s_col, font=font_mono_sm)
        sy += 44
        
    draw.text((rx0 + 20, h - 50), "STATUS: 2.8M RECORDS DUMP RECONCILED LOSSLESS", fill=(74, 222, 128), font=font_mono_bold)

    out_path = os.path.join(ASSETS_DIR, "dataflow.jpg")
    img.save(out_path, "JPEG", quality=92)
    print(f"Generated {out_path}")

def create_paperforge_asset():
    w, h = 1200, 675
    img = Image.new("RGB", (w, h), (248, 250, 252))
    draw = ImageDraw.Draw(img)
    
    # Title bar (Light editor theme)
    draw_window_header(draw, w, "PaperForge Studio — In-Browser Vector Document Editor & PDF Engine", is_dark=False)
    
    font_bold = get_font(FONT_BOLD, 13)
    font_mono = get_font(FONT_MONO, 12)
    font_mono_bold = get_font(FONT_MONO_BOLD, 12)
    font_mono_sm = get_font(FONT_MONO, 10)
    font_reg = get_font(FONT_REG, 12)
    
    # Top Editor Toolbar
    draw.rectangle([0, 39, w, 84], fill=(255, 255, 255), outline=(226, 232, 240))
    tools = ["Select", "Pan", "Text Tool", "Freehand Pen", "Vector Box", "Highlight", "Signature", "Page Organize", "OCR Tool"]
    tx = 24
    for i, t in enumerate(tools):
        is_active = (i == 4)  # Vector Box active
        bg_btn = (79, 70, 229) if is_active else (241, 245, 249)
        text_col = (255, 255, 255) if is_active else (51, 65, 85)
        tw = 85
        draw.rectangle([tx, 48, tx + tw, 76], fill=bg_btn, outline=(203, 213, 225) if not is_active else (79, 70, 229))
        draw.text((tx + 10, 55), t, fill=text_col, font=get_font(FONT_BOLD, 10))
        tx += tw + 10
        
    # Privacy Badge in Toolbar
    draw.rectangle([w - 300, 48, w - 24, 76], fill=(236, 253, 245), outline=(167, 243, 208))
    draw.text((w - 286, 55), "100% PRIVATE CLIENT-SIDE (0B UPLOADED)", fill=(5, 150, 105), font=get_font(FONT_BOLD, 10))
    
    # Main Canvas Area
    # Gray background canvas
    draw.rectangle([0, 85, w - 320, h], fill=(241, 245, 249))
    
    # Centered White PDF Sheet
    px0, py0, pw, ph = 140, 105, 580, 540
    draw.rectangle([px0, py0, px0 + pw, py0 + ph], fill=(255, 255, 255), outline=(203, 213, 225))
    # Drop shadow effect
    draw.rectangle([px0 + pw, py0 + 4, px0 + pw + 6, py0 + ph + 6], fill=(226, 232, 240))
    draw.rectangle([px0 + 4, py0 + ph, px0 + pw + 6, py0 + ph + 6], fill=(226, 232, 240))
    
    # PDF Content simulation
    draw.text((px0 + 36, py0 + 36), "TECHNICAL ARCHITECTURE SPECIFICATION", fill=(15, 23, 42), font=get_font(FONT_BOLD, 14))
    draw.text((px0 + 36, py0 + 58), "Document Ref: RFC-8024 | Security Classification: Confidential", fill=(100, 116, 139), font=get_font(FONT_REG, 10))
    draw.line([px0 + 36, py0 + 74, px0 + pw - 36, py0 + 74], fill=(226, 232, 240), width=1)
    
    # Paragraph text lines
    draw.text((px0 + 36, py0 + 90), "1. Executive Summary & Vector Rendering Model", fill=(30, 41, 59), font=get_font(FONT_BOLD, 12))
    p_text = "The client-side document engine manipulates PDF byte structures in WebAssembly and\nCanvas contexts without dispatching confidential buffers to remote servers. Vector manipulation\nis verified under 120ms total latency."
    draw.text((px0 + 36, py0 + 112), p_text, fill=(71, 85, 105), font=font_reg)
    
    # Interactive Vector Annotation Overlay with selection handles!
    v_box = [px0 + 32, py0 + 190, px0 + pw - 32, py0 + 265]
    draw.rectangle(v_box, fill=(238, 242, 255), outline=(79, 70, 229), width=2)
    # Selection handles on corners
    for hx, hy in [(v_box[0], v_box[1]), (v_box[2], v_box[1]), (v_box[0], v_box[3]), (v_box[2], v_box[3])]:
        draw.rectangle([hx - 4, hy - 4, hx + 4, hy + 4], fill=(79, 70, 229), outline=(255, 255, 255))
        
    draw.text((px0 + 46, py0 + 204), "ANNOTATED COMPONENT: Client-Side PDF Vector Subsystem", fill=(67, 56, 202), font=get_font(FONT_BOLD, 11))
    draw.text((px0 + 46, py0 + 226), "• In-Memory pdf-lib binary reconstruction\n• 0 bytes transmitted over network (GDPR / HIPAA Compliant)", fill=(79, 70, 229), font=font_reg)
    
    # Stamp / Signature simulation
    draw.rectangle([px0 + pw - 220, py0 + ph - 110, px0 + pw - 36, py0 + ph - 36], fill=(240, 253, 244), outline=(34, 197, 94))
    draw.text((px0 + pw - 208, py0 + ph - 98), "VERIFIED DIGITAL SIGNATURE", fill=(21, 128, 61), font=get_font(FONT_BOLD, 9))
    draw.text((px0 + pw - 208, py0 + ph - 80), "Signer: Aniruddha Disale", fill=(30, 41, 59), font=get_font(FONT_REG, 10))
    draw.text((px0 + pw - 208, py0 + ph - 60), "SHA-256: 4f98a2... Verified", fill=(100, 116, 139), font=font_mono_sm)
    
    # Right Properties Sidebar
    draw.rectangle([w - 320, 85, w, h], fill=(255, 255, 255), outline=(226, 232, 240))
    draw.text((w - 300, 105), "ELEMENT PROPERTIES", fill=(15, 23, 42), font=get_font(FONT_BOLD, 12))
    
    props = [
        ("Layer Type", "Vector Bounding Box"),
        ("Coordinates", "X: 32, Y: 190, W: 516, H: 75"),
        ("Stroke Color", "#4F46E5 (Indigo 600)"),
        ("Fill Opacity", "18% Alpha"),
        ("Render Engine", "HTML5 2D Canvas Context"),
        ("Render Latency", "48 ms (< 120ms budget)"),
        ("Export Integrity", "PDF/A-1b Standard Compliant")
    ]
    py_pos = 140
    for pk, pv in props:
        draw.text((w - 300, py_pos), pk, fill=(100, 116, 139), font=get_font(FONT_REG, 10))
        draw.text((w - 300, py_pos + 16), pv, fill=(15, 23, 42), font=get_font(FONT_BOLD, 11))
        draw.line([w - 300, py_pos + 36, w - 24, py_pos + 36], fill=(241, 245, 249), width=1)
        py_pos += 46
        
    # Export CTA in sidebar
    draw.rectangle([w - 300, h - 80, w - 24, h - 36], fill=(15, 23, 42))
    draw.text((w - 230, h - 64), "Export Vector PDF", fill=(255, 255, 255), font=get_font(FONT_BOLD, 11))

    out_path = os.path.join(ASSETS_DIR, "paperforge.jpg")
    img.save(out_path, "JPEG", quality=92)
    print(f"Generated {out_path}")

def create_celerpay_asset():
    w, h = 1200, 675
    img = Image.new("RGB", (w, h), (15, 23, 42))
    draw = ImageDraw.Draw(img)
    
    draw_window_header(draw, w, "CelerPay — UPI Mobile Payment Platform Architecture (Flutter / Provider)", is_dark=True)
    
    font_bold = get_font(FONT_BOLD, 14)
    font_mono = get_font(FONT_MONO, 12)
    font_mono_bold = get_font(FONT_MONO_BOLD, 13)
    font_mono_sm = get_font(FONT_MONO, 11)
    font_reg = get_font(FONT_REG, 11)
    
    # Left mobile frame: CelerPay Home & Wallet Balance
    f1_x, f1_y, f1_w, f1_h = 140, 60, 420, 580
    draw.rectangle([f1_x, f1_y, f1_x + f1_w, f1_y + f1_h], fill=(24, 33, 47), outline=(51, 65, 85))
    
    # Phone header
    draw.rectangle([f1_x, f1_y, f1_x + f1_w, f1_y + 48], fill=(30, 41, 59))
    draw.text((f1_x + 20, f1_y + 16), "CelerPay UPI", fill=(255, 255, 255), font=get_font(FONT_BOLD, 14))
    draw.text((f1_x + f1_w - 90, f1_y + 18), "Scan QR [o]", fill=(56, 189, 248), font=font_mono_sm)
    
    # Account Balance Card
    draw.rectangle([f1_x + 20, f1_y + 68, f1_x + f1_w - 20, f1_y + 170], fill=(79, 70, 229), outline=(99, 102, 241))
    draw.text((f1_x + 36, f1_y + 84), "Primary Account Balance", fill=(224, 231, 255), font=font_reg)
    draw.text((f1_x + 36, f1_y + 106), "INR 48,250.00", fill=(255, 255, 255), font=get_font(FONT_BOLD, 22))
    draw.text((f1_x + 36, f1_y + 144), "Linked UPI ID: aniruddha@oksbi  |  Active", fill=(199, 210, 254), font=font_mono_sm)
    
    # Quick action buttons
    q_actions = ["Send Money", "Request", "Pay Bills", "Bank Trans"]
    qw = (f1_w - 60) // 4
    for i, a in enumerate(q_actions):
        ax = f1_x + 20 + i * (qw + 7)
        draw.rectangle([ax, f1_y + 186, ax + qw, f1_y + 236], fill=(30, 41, 59), outline=(51, 65, 85))
        draw.text((ax + 8, f1_y + 206), a, fill=(241, 245, 249), font=get_font(FONT_BOLD, 9))
        
    # Transaction Ledger list
    draw.text((f1_x + 20, f1_y + 256), "Recent UPI Transactions", fill=(241, 245, 249), font=get_font(FONT_BOLD, 12))
    txs = [
        ("Rohit Sharma", "Today, 14:22", "- INR 450.00", (248, 113, 113)),
        ("Amazon India", "Yesterday", "- INR 1,899.00", (248, 113, 113)),
        ("Client Payment", "22 Nov", "+ INR 25,000.00", (74, 222, 128)),
        ("Starbucks Coffee", "21 Nov", "- INR 320.00", (248, 113, 113)),
        ("Rahul Verma", "20 Nov", "+ INR 1,200.00", (74, 222, 128))
    ]
    ty = f1_y + 282
    for name, date, amt, amt_c in txs:
        draw.rectangle([f1_x + 20, ty, f1_x + f1_w - 20, ty + 46], fill=(18, 25, 38), outline=(30, 41, 59))
        draw.text((f1_x + 32, ty + 8), name, fill=(241, 245, 249), font=get_font(FONT_BOLD, 11))
        draw.text((f1_x + 32, ty + 26), f"{date} • UPI Transfer", fill=(148, 163, 184), font=font_mono_sm)
        draw.text((f1_x + f1_w - 140, ty + 14), amt, fill=amt_c, font=font_mono_bold)
        ty += 54
        
    # Right mobile frame: Successful Payment Confirmation Sheet
    f2_x, f2_y, f2_w, f2_h = 640, 60, 420, 580
    draw.rectangle([f2_x, f2_y, f2_x + f2_w, f2_y + f2_h], fill=(24, 33, 47), outline=(51, 65, 85))
    
    # Success Banner
    draw.rectangle([f2_x + 24, f2_y + 36, f2_x + f2_w - 24, f2_y + 180], fill=(20, 83, 45), outline=(34, 197, 94))
    draw.ellipse([f2_x + (f2_w // 2) - 24, f2_y + 54, f2_x + (f2_w // 2) + 24, f2_y + 102], fill=(34, 197, 94))
    draw.text((f2_x + (f2_w // 2) - 8, f2_y + 66), "✓", fill=(255, 255, 255), font=get_font(FONT_BOLD, 22))
    draw.text((f2_x + (f2_w // 2) - 70, f2_y + 114), "PAYMENT SUCCESSFUL", fill=(255, 255, 255), font=get_font(FONT_BOLD, 12))
    draw.text((f2_x + (f2_w // 2) - 60, f2_y + 138), "INR 1,250.00", fill=(74, 222, 128), font=get_font(FONT_BOLD, 20))
    
    # Transaction Receipt Details
    draw.rectangle([f2_x + 24, f2_y + 200, f2_x + f2_w - 24, f2_y + 490], fill=(18, 25, 38), outline=(51, 65, 85))
    r_details = [
        ("Paid To", "Aniruddha Disale"),
        ("UPI ID", "aniruddha@oksbi"),
        ("Transaction ID", "TXN_901842901849"),
        ("UPI Reference No", "418902847120"),
        ("Debited From", "HDFC Bank (•••• 8912)"),
        ("Timestamp", "24 Nov 2026, 17:30:15 IST"),
        ("State Management", "Provider (Notifier Pattern)"),
        ("Architecture", "Clean Architecture (Flutter)")
    ]
    ry = f2_y + 214
    for k, v in r_details:
        draw.text((f2_x + 40, ry), k, fill=(148, 163, 184), font=font_reg)
        draw.text((f2_x + 180, ry), v, fill=(241, 245, 249), font=font_mono_sm)
        draw.line([f2_x + 40, ry + 26, f2_x + f2_w - 40, ry + 26], fill=(30, 41, 59), width=1)
        ry += 34
        
    # Share Receipt CTA
    draw.rectangle([f2_x + 24, f2_y + 512, f2_x + f2_w - 24, f2_y + 556], fill=(56, 189, 248))
    draw.text((f2_x + 150, f2_y + 526), "Share Payment Receipt", fill=(15, 23, 42), font=get_font(FONT_BOLD, 11))

    out_path = os.path.join(ASSETS_DIR, "celerpay.jpg")
    img.save(out_path, "JPEG", quality=92)
    print(f"Generated {out_path}")

def create_farmtech_asset():
    w, h = 1200, 675
    img = Image.new("RGB", (w, h), (15, 23, 42))
    draw = ImageDraw.Draw(img)
    
    draw_window_header(draw, w, "FarmTech Guru — Smart Agriculture Advisory & Fertilizer Engine (Android / Java)", is_dark=True)
    
    font_bold = get_font(FONT_BOLD, 13)
    font_mono = get_font(FONT_MONO, 12)
    font_mono_bold = get_font(FONT_MONO_BOLD, 12)
    font_mono_sm = get_font(FONT_MONO, 11)
    font_reg = get_font(FONT_REG, 11)
    
    # Left: Field Telemetry & Weather Widget
    lx0, ly0, lw, lh = 24, 52, 540, h - 76
    draw.rectangle([lx0, ly0, lx0 + lw, ly0 + lh], fill=(20, 27, 38), outline=(51, 65, 85))
    draw.text((lx0 + 20, ly0 + 16), "FIELD TELEMETRY & MICROCLIMATE (OpenWeatherMap API)", fill=(241, 245, 249), font=get_font(FONT_BOLD, 12))
    
    # Weather Banner
    draw.rectangle([lx0 + 20, ly0 + 44, lx0 + lw - 20, ly0 + 140], fill=(24, 33, 47), outline=(56, 189, 248, 120))
    draw.text((lx0 + 36, ly0 + 56), "Navi Mumbai Agro-Cluster", fill=(148, 163, 184), font=font_reg)
    draw.text((lx0 + 36, ly0 + 76), "28.4°C  Partly Cloudy", fill=(255, 255, 255), font=get_font(FONT_BOLD, 18))
    draw.text((lx0 + 36, ly0 + 108), "Humidity: 76%  |  Precipitation Chance: 12%  |  Wind: 8 km/h NW", fill=(56, 189, 248), font=font_mono_sm)
    
    # Crop Stage Diagnostic Card
    draw.text((lx0 + 20, ly0 + 160), "CROP PROFILE & PHENOLOGICAL STAGE", fill=(241, 245, 249), font=get_font(FONT_BOLD, 12))
    draw.rectangle([lx0 + 20, ly0 + 184, lx0 + lw - 20, ly0 + 330], fill=(24, 33, 47), outline=(51, 65, 85))
    crop_info = [
        ("Target Crop", "Paddy (Rice) — Variety MTU-1010"),
        ("Cultivation Area", "5.0 Acres (Irrigated Lowland)"),
        ("Current Stage", "Vegetative Tillering (Stage 3 of 6, Day 42)"),
        ("Soil Nitrogen Index", "Medium (240 kg/ha available N)"),
        ("Disease Risk", "Low (Leaf blast threshold normal)")
    ]
    cy = ly0 + 196
    for k, v in crop_info:
        draw.text((lx0 + 36, cy), k, fill=(148, 163, 184), font=font_reg)
        draw.text((lx0 + 180, cy), v, fill=(241, 245, 249), font=font_mono_sm)
        draw.line([lx0 + 36, cy + 22, lx0 + lw - 36, cy + 22], fill=(30, 41, 59), width=1)
        cy += 28
        
    # Advisory Box
    draw.rectangle([lx0 + 20, ly0 + 350, lx0 + lw - 20, ly0 + lh - 20], fill=(6, 78, 59), outline=(16, 185, 129))
    draw.text((lx0 + 36, ly0 + 364), "AGRONOMIC ADVISORY ENGINE:", fill=(255, 255, 255), font=get_font(FONT_BOLD, 11))
    draw.text((lx0 + 36, ly0 + 388), "Optimal window for basal fertilizer top-dressing.\nMaintain 2-3 cm standing water in paddy plots.", fill=(167, 243, 208), font=font_reg)

    # Right: FertilizerEngine Dosage Calculator Card
    rx0, ry0, rw, rh = 588, 52, w - 612, h - 76
    draw.rectangle([rx0, ry0, rx0 + rw, ry0 + rh], fill=(20, 27, 38), outline=(51, 65, 85))
    draw.text((rx0 + 20, ry0 + 16), "FERTILIZER CALCULATION ENGINE (FertilizerEngine.java)", fill=(241, 245, 249), font=get_font(FONT_BOLD, 12))
    
    # Dosage breakdown table
    fert_items = [
        ("UREA (46% N)", "489.1 kg", "10 Bags (50kg)", "Split 1: 50% at Tillering", (56, 189, 248)),
        ("DAP (18% N, 46% P2O5)", "217.4 kg", "4.5 Bags (50kg)", "Basal Application Only", (74, 222, 128)),
        ("MOP (60% K2O)", "166.7 kg", "3.3 Bags (50kg)", "Split 2: 50% at Panicle", (250, 204, 21))
    ]
    fy = ry0 + 52
    for f_name, req_kg, bags, app_timing, col in fert_items:
        draw.rectangle([rx0 + 20, fy, rx0 + rw - 20, fy + 72], fill=(24, 33, 47), outline=(51, 65, 85))
        draw.text((rx0 + 32, fy + 10), f_name, fill=col, font=get_font(FONT_BOLD, 12))
        draw.text((rx0 + rw - 140, fy + 10), req_kg, fill=(255, 255, 255), font=font_mono_bold)
        draw.text((rx0 + 32, fy + 32), f"Commercial: {bags}", fill=(203, 213, 225), font=font_mono_sm)
        draw.text((rx0 + 32, fy + 50), f"Schedule: {app_timing}", fill=(148, 163, 184), font=font_reg)
        fy += 84
        
    # Cloud sync & offline indicator
    draw.rectangle([rx0 + 20, ry0 + rh - 130, rx0 + rw - 20, ry0 + rh - 20], fill=(15, 23, 42), outline=(51, 65, 85))
    draw.text((rx0 + 32, ry0 + rh - 116), "DATA PERSISTENCE & CLOUD SYNC:", fill=(241, 245, 249), font=get_font(FONT_BOLD, 11))
    draw.text((rx0 + 32, ry0 + rh - 92), "• Offline First: 100% Cached in SQLite & Room DB", fill=(74, 222, 128), font=font_mono_sm)
    draw.text((rx0 + 32, ry0 + rh - 72), "• Cloud Target: Firebase Firestore Real-Time Sync", fill=(56, 189, 248), font=font_mono_sm)
    draw.text((rx0 + 32, ry0 + rh - 52), "• Cost Calculation: Accurate Market Retail Pricing Estimates", fill=(203, 213, 225), font=font_mono_sm)

    out_path = os.path.join(ASSETS_DIR, "farmtech_guru.jpg")
    img.save(out_path, "JPEG", quality=92)
    print(f"Generated {out_path}")

def create_dinvoice_asset():
    w, h = 1200, 675
    img = Image.new("RGB", (w, h), (248, 250, 252))
    draw = ImageDraw.Draw(img)
    
    draw_window_header(draw, w, "D-Invoice — Client-Side GST Tax Invoicing Engine & PDF Generator", is_dark=False)
    
    font_bold = get_font(FONT_BOLD, 13)
    font_mono = get_font(FONT_MONO, 12)
    font_mono_bold = get_font(FONT_MONO_BOLD, 12)
    font_mono_sm = get_font(FONT_MONO, 10)
    font_reg = get_font(FONT_REG, 11)
    
    # Top Status Bar
    draw.rectangle([0, 39, w, 78], fill=(255, 255, 255), outline=(226, 232, 240))
    draw.text((24, 52), "STANDALONE ZERO-OVERHEAD BILLING ENGINE (NO SERVER / NO DATABASE / 100% PRIVATE)", fill=(71, 85, 105), font=get_font(FONT_BOLD, 11))
    draw.text((w - 220, 52), "EXPORT: VECTOR PDF / THERMAL", fill=(79, 70, 229), font=get_font(FONT_BOLD, 10))
    
    # Invoice Document Paper Container
    ix0, iy0, iw, ih = 100, 96, 1000, 555
    draw.rectangle([ix0, iy0, ix0 + iw, iy0 + ih], fill=(255, 255, 255), outline=(203, 213, 225))
    
    # Invoice Header
    draw.text((ix0 + 36, iy0 + 24), "TAX INVOICE", fill=(15, 23, 42), font=get_font(FONT_BOLD, 18))
    draw.text((ix0 + 36, iy0 + 48), "Original for Recipient | Compliant with GST Rules", fill=(100, 116, 139), font=font_reg)
    
    # Supplier & Customer Boxes
    draw.rectangle([ix0 + 36, iy0 + 72, ix0 + 470, iy0 + 150], fill=(248, 250, 252), outline=(226, 232, 240))
    draw.text((ix0 + 48, iy0 + 82), "SUPPLIER DETAILS", fill=(71, 85, 105), font=get_font(FONT_BOLD, 10))
    draw.text((ix0 + 48, iy0 + 98), "Aniruddha Disale — Software Engineering Services", fill=(15, 23, 42), font=get_font(FONT_BOLD, 11))
    draw.text((ix0 + 48, iy0 + 116), "Navi Mumbai, Maharashtra, PIN 410206", fill=(71, 85, 105), font=font_reg)
    draw.text((ix0 + 48, iy0 + 130), "GSTIN: 27ABCDE1234F1Z5  |  State: Maharashtra (27)", fill=(71, 85, 105), font=font_mono_sm)
    
    draw.rectangle([ix0 + 490, iy0 + 72, ix0 + iw - 36, iy0 + 150], fill=(248, 250, 252), outline=(226, 232, 240))
    draw.text((ix0 + 502, iy0 + 82), "INVOICE METADATA", fill=(71, 85, 105), font=get_font(FONT_BOLD, 10))
    draw.text((ix0 + 502, iy0 + 98), "Invoice No: INV-2026-0842  |  Date: 24-Nov-2026", fill=(15, 23, 42), font=font_mono_bold)
    draw.text((ix0 + 502, iy0 + 116), "Billed To: Enterprise Client Corp Ltd (Mumbai)", fill=(71, 85, 105), font=font_reg)
    draw.text((ix0 + 502, iy0 + 130), "Client GSTIN: 27AABCE5678G2Z1  |  Terms: Due on Receipt", fill=(71, 85, 105), font=font_mono_sm)
    
    # Items Table
    th_y = iy0 + 168
    draw.rectangle([ix0 + 36, th_y, ix0 + iw - 36, th_y + 30], fill=(241, 245, 249), outline=(203, 213, 225))
    tbl_cols = [
        ("SR", 45),
        ("DESCRIPTION OF SERVICES", 360),
        ("HSN/SAC", 95),
        ("QTY", 55),
        ("RATE (INR)", 110),
        ("TAXABLE (INR)", 125),
        ("CGST (9%)", 100),
        ("SGST (9%)", 100),
        ("TOTAL (INR)", 110)
    ]
    cur_x = ix0 + 46
    for title, cw in tbl_cols:
        draw.text((cur_x, th_y + 8), title, fill=(51, 65, 85), font=get_font(FONT_BOLD, 9))
        cur_x += cw
        
    items = [
        ("1", "Full-Stack Web App Development (React & Vite)", "998314", "1", "45,000.00", "45,000.00", "4,050.00", "4,050.00", "53,100.00"),
        ("2", "Computer Vision Pipeline (YOLO11 Road Inference)", "998315", "1", "35,000.00", "35,000.00", "3,150.00", "3,150.00", "41,300.00"),
        ("3", "Spatial Data Processing & Ingestion QA Module", "998316", "1", "20,000.00", "20,000.00", "1,800.00", "1,800.00", "23,600.00")
    ]
    ry = th_y + 30
    for it in items:
        draw.rectangle([ix0 + 36, ry, ix0 + iw - 36, ry + 36], fill=(255, 255, 255), outline=(241, 245, 249))
        cx = ix0 + 46
        for c_idx, val in enumerate(it):
            draw.text((cx, ry + 10), val, fill=(30, 41, 59), font=font_mono_sm)
            cx += tbl_cols[c_idx][1]
        ry += 36
        
    # Financial Calculation Summary Box
    draw.rectangle([ix0 + iw - 380, ry + 16, ix0 + iw - 36, ry + 168], fill=(248, 250, 252), outline=(203, 213, 225))
    calc_rows = [
        ("Taxable Subtotal:", "INR 1,00,000.00"),
        ("Central GST (CGST 9%):", "INR 9,000.00"),
        ("State GST (SGST 9%):", "INR 9,000.00"),
        ("Total Tax (18%):", "INR 18,000.00")
    ]
    sy = ry + 24
    for kl, vl in calc_rows:
        draw.text((ix0 + iw - 360, sy), kl, fill=(100, 116, 139), font=font_reg)
        draw.text((ix0 + iw - 180, sy), vl, fill=(30, 41, 59), font=font_mono_sm)
        sy += 24
        
    draw.rectangle([ix0 + iw - 380, sy + 6, ix0 + iw - 36, sy + 46], fill=(15, 23, 42))
    draw.text((ix0 + iw - 360, sy + 18), "GRAND TOTAL:", fill=(255, 255, 255), font=get_font(FONT_BOLD, 12))
    draw.text((ix0 + iw - 190, sy + 18), "INR 1,18,000.00", fill=(74, 222, 128), font=font_mono_bold)
    
    # Bottom Bank details & verification tag
    draw.text((ix0 + 36, ry + 24), "Bank Name: HDFC Bank Ltd  |  A/C No: 50100492810924  |  IFSC: HDFC0001892", fill=(100, 116, 139), font=font_mono_sm)
    draw.text((ix0 + 36, ry + 48), "Client-Side Render Latency: <1ms  |  Zero External Network Requests", fill=(5, 150, 105), font=font_mono_sm)

    out_path = os.path.join(ASSETS_DIR, "dinvoice.jpg")
    img.save(out_path, "JPEG", quality=92)
    print(f"Generated {out_path}")

def main():
    print("Generating 8 authentic, realistic project visuals...")
    create_yolo_asset()
    create_cadencex_asset()
    create_sorty_asset()
    create_dataflow_asset()
    create_paperforge_asset()
    create_celerpay_asset()
    create_farmtech_asset()
    create_dinvoice_asset()
    print("All assets successfully generated!")

if __name__ == "__main__":
    main()
