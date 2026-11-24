import os
import shutil
import subprocess
import sys

REPO_DIR = r"d:\free lancing\portfolio"
DIST_DIR = os.path.join(REPO_DIR, "dist")
TEMP_DIR = r"d:\free lancing\portfolio_deploy_temp"

def run(cmd, check=True):
    print(f">> Running: {cmd}")
    res = subprocess.run(cmd, cwd=REPO_DIR, shell=True, capture_output=True, text=True)
    if res.stdout:
        print(res.stdout.strip())
    if res.stderr and res.returncode != 0:
        print("ERROR:", res.stderr.strip())
    if check and res.returncode != 0:
        sys.exit(f"Command failed with code {res.returncode}")
    return res

def main():
    if not os.path.isdir(DIST_DIR):
        sys.exit("dist directory does not exist! Run npm run build first.")

    # 1. Copy dist to temporary staging dir
    if os.path.exists(TEMP_DIR):
        shutil.rmtree(TEMP_DIR)
    shutil.copytree(DIST_DIR, TEMP_DIR)
    print(f"Staged dist contents in {TEMP_DIR}")

    # 2. Checkout gh-pages
    run("git checkout gh-pages")
    run("git reset --hard origin/gh-pages")

    # 3. Clear repo root except .git and audit_screenshots
    for item in os.listdir(REPO_DIR):
        if item in [".git", "audit_screenshots", "scripts"]:
            continue
        p = os.path.join(REPO_DIR, item)
        if os.path.isdir(p):
            shutil.rmtree(p)
        else:
            os.remove(p)

    # 4. Copy staged files into repo root
    for item in os.listdir(TEMP_DIR):
        src = os.path.join(TEMP_DIR, item)
        dst = os.path.join(REPO_DIR, item)
        if os.path.isdir(src):
            shutil.copytree(src, dst)
        else:
            shutil.copy2(src, dst)

    # Ensure .nojekyll exists
    nojekyll = os.path.join(REPO_DIR, ".nojekyll")
    if not os.path.exists(nojekyll):
        with open(nojekyll, "w") as f:
            f.write("")

    # 5. Stage, check diff and commit
    run("git add -A")
    status_res = run("git status --porcelain")
    if not status_res.stdout.strip():
        print("No changes detected on gh-pages. Current live branch is already identical.")
    else:
        run('git commit -m "Production release: Master transformation with curated 5 projects, editorial design, and motion system"')
        # 6. Push to origin gh-pages WITHOUT --force
        run("git push origin gh-pages")

    # 7. Switch back to master
    run("git checkout master")
    
    # Clean up temp
    if os.path.exists(TEMP_DIR):
        shutil.rmtree(TEMP_DIR)
    print("Deployment to gh-pages completed successfully and restored back to master branch.")

if __name__ == "__main__":
    main()
