import subprocess
import os
import shutil

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
OUT_DIR = r"d:\free lancing\portfolio\audit_screenshots"
ART_DIR = r"C:\Users\disal\.gemini\antigravity\brain\7f2dc6d3-5665-4142-ab1c-dd72f247d795"

os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(ART_DIR, exist_ok=True)

def cap(url, name, w, h):
    out = os.path.join(OUT_DIR, name)
    flags = [
        CHROME,
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        "--virtual-time-budget=2500",
        f"--window-size={w},{h}",
        f"--screenshot={out}",
        url
    ]
    subprocess.run(flags, check=True)
    size = os.path.getsize(out) / 1024
    print(f"Captured {name}: {w}x{h}, {size:.1f} KB")
    
    # copy to artifact dir
    art_path = os.path.join(ART_DIR, name)
    shutil.copyfile(out, art_path)

if __name__ == "__main__":
    cap("http://127.0.0.1:4180/index.html?theme=light", "desktop_light.png", 1440, 900)
    cap("http://127.0.0.1:4180/index.html?theme=dark", "desktop_dark.png", 1440, 900)
    cap("http://127.0.0.1:4180/index.html?theme=light", "mobile_light.png", 390, 844)
    cap("http://127.0.0.1:4180/index.html?theme=dark", "mobile_dark.png", 390, 844)
    cap("http://127.0.0.1:4180/index.html?theme=light#projects", "showcase_light.png", 1440, 1800)
    cap("http://127.0.0.1:4180/index.html?theme=dark#projects", "showcase_dark.png", 1440, 1800)
    print("All final captures successfully completed!")
