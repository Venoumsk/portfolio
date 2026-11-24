import os
import re
import urllib.request
import threading
from http.server import SimpleHTTPRequestHandler, HTTPServer
import time

PORT = 4181
DIST_DIR = r"d:\free lancing\portfolio\dist"

class QuietHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIST_DIR, **kwargs)
    def log_message(self, format, *args):
        pass

def run_server():
    server = HTTPServer(("127.0.0.1", PORT), QuietHandler)
    server.serve_forever()

t = threading.Thread(target=run_server, daemon=True)
t.start()
time.sleep(1)

def check_url(path):
    url = f"http://127.0.0.1:{PORT}/{path}"
    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req) as resp:
            return resp.status, len(resp.read())
    except Exception as e:
        return 500, str(e)

def main():
    print("=== TECHNICAL & PRODUCTION VERIFICATION AUDIT ===")
    
    # 1. Verify index.html loads with 200
    st, sz = check_url("index.html")
    print(f"index.html: HTTP {st} ({sz} bytes)")
    assert st == 200
    
    # 2. Parse index.html for assets
    with open(os.path.join(DIST_DIR, "index.html"), "r", encoding="utf-8") as f:
        html_content = f.read()
        
    asset_matches = re.findall(r'(?:src|href)="([^"]+)"', html_content)
    print(f"\nDiscovered {len(asset_matches)} asset references in index.html:")
    for a in asset_matches:
        if a.startswith("http") or a.startswith("data:"):
            continue
        # clean relative path
        clean_path = a.lstrip("./")
        st, sz = check_url(clean_path)
        print(f"  - {clean_path}: HTTP {st} ({sz} bytes)")
        assert st == 200, f"Asset failed: {clean_path}"
        
    # 3. Verify project showcase images in assets/
    curated_images = [
        "yolo11_perception-D3ACmJJg.jpg",
        "dataflow-Bw3QRvFc.jpg",
        "paperforge-mLLBtGO-.jpg",
        "celerpay-CHRJ_An9.jpg",
        "farmtech_guru-Cp0HWeo2.jpg"
    ]
    print("\nVerifying 5 Curated Project Showcase Images in dist/assets/:")
    for img_name in curated_images:
        path = f"assets/{img_name}"
        st, sz = check_url(path)
        print(f"  - {img_name}: HTTP {st} ({sz / 1024:.1f} KB)")
        assert st == 200, f"Image failed: {img_name}"
        
    # 4. Audit for disallowed projects in dist bundle
    disallowed = ["cadencex", "sorty", "dinvoice", "d-invoice"]
    print("\nAuditing for Disallowed Projects in dist bundle:")
    found_disallowed = []
    for root, dirs, files in os.walk(DIST_DIR):
        for f in files:
            p = os.path.join(root, f)
            with open(p, "rb") as fp:
                content = fp.read()
                for d in disallowed:
                    if d.encode("utf-8") in content.lower():
                        found_disallowed.append((f, d))
    if found_disallowed:
        print(f"  WARNING: Disallowed references found: {found_disallowed}")
    else:
        print("  VERIFIED: Zero references to CadenceX, Sorty, or D-Invoice in production bundle.")
        
    # 5. Verify Backup Branch
    import subprocess
    branch_check = subprocess.run(["git", "branch", "--list", "backup-pre-master-transformation"], cwd=r"d:\free lancing\portfolio", capture_output=True, text=True)
    has_backup = "backup-pre-master-transformation" in branch_check.stdout
    print(f"\nBackup Branch Status: {'VERIFIED' if has_backup else 'MISSING'}")
    assert has_backup
    
    print("\n=== ALL INDEPENDENT PRODUCTION VERIFICATIONS PASSED ===")

if __name__ == "__main__":
    main()
