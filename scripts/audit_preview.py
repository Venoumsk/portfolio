import os
import time
import subprocess
import threading
from http.server import SimpleHTTPRequestHandler, HTTPServer

PORT = 4180
DIST_DIR = r"d:\free lancing\portfolio\dist"
SCREENSHOTS_DIR = r"d:\free lancing\portfolio\audit_screenshots"
os.makedirs(SCREENSHOTS_DIR, exist_ok=True)

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
if not os.path.exists(CHROME_PATH):
    CHROME_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

class QuietHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIST_DIR, **kwargs)
    def log_message(self, format, *args):
        pass

def run_server():
    server = HTTPServer(("127.0.0.1", PORT), QuietHandler)
    server.serve_forever()

server_thread = threading.Thread(target=run_server, daemon=True)
server_thread.start()
print(f"Local preview server running at http://localhost:{PORT}")
time.sleep(1)

def capture(url, out_path, width=1440, height=900):
    flags = [
        CHROME_PATH,
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        "--virtual-time-budget=2500",
        f"--window-size={width},{height}",
        f"--screenshot={out_path}",
        url
    ]
    subprocess.run(flags, capture_output=True, check=True)
    size_kb = os.path.getsize(out_path) / 1024
    print(f"Captured {os.path.basename(out_path)} ({width}x{height}, {size_kb:.1f} KB)")

def main():
    base_url = f"http://127.0.0.1:{PORT}/index.html"
    
    # 1. Desktop Light (1440x900)
    capture(f"{base_url}?theme=light", os.path.join(SCREENSHOTS_DIR, "desktop_light.png"), 1440, 900)
    
    # 2. Desktop Dark (1440x900)
    capture(f"{base_url}?theme=dark", os.path.join(SCREENSHOTS_DIR, "desktop_dark.png"), 1440, 900)
    
    # 3. Mobile Light (390x844 - iPhone / modern Android)
    capture(f"{base_url}?theme=light", os.path.join(SCREENSHOTS_DIR, "mobile_light.png"), 390, 844)
    
    # 4. Mobile Dark (390x844)
    capture(f"{base_url}?theme=dark", os.path.join(SCREENSHOTS_DIR, "mobile_dark.png"), 390, 844)
    
    # 5. Desktop Full Page (1440x2600 to capture entire flow: hero, workbench, 5 projects, credentials)
    capture(f"{base_url}?theme=light", os.path.join(SCREENSHOTS_DIR, "desktop_full_light.png"), 1440, 2600)
    capture(f"{base_url}?theme=dark", os.path.join(SCREENSHOTS_DIR, "desktop_full_dark.png"), 1440, 2600)

    print("All visual verification screenshots captured successfully!")

if __name__ == "__main__":
    main()
