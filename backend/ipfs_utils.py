import subprocess
import json

def upload_text_to_ipfs(text, filename="resume.txt"):
    with open(filename, "w", encoding="utf-8") as f:
        f.write(text)

    IPFS_PATH = r"C:\\Users\\ayush\\AppData\\Local\\Programs\\IPFS Desktop\\resources\\app.asar.unpacked\\node_modules\\kubo\\kubo\\ipfs.exe"
    result = subprocess.run([IPFS_PATH, "add", "-Q", filename], capture_output=True, text=True)

    if result.returncode == 0:
        return result.stdout.strip()
    else:
        raise RuntimeError(f"IPFS upload failed: {result.stderr}")

def download_from_ipfs(cid, output_path):
    result = subprocess.run(["ipfs", "get", cid, "-o", output_path], capture_output=True, text=True)
    if result.returncode != 0:
        raise RuntimeError(f"IPFS download failed: {result.stderr}")
