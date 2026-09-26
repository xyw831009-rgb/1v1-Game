#!/usr/bin/env python3
import json
import re
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote


ROOT = Path(__file__).resolve().parent
RECORDINGS_DIR = ROOT / "recordings"
MAX_RECORDING_BYTES = 1024 * 1024 * 1024


class GameHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_POST(self):
        if self.path != "/api/recordings":
            self.send_error(404)
            return

        content_length = int(self.headers.get("Content-Length", "0"))
        if content_length <= 0 or content_length > MAX_RECORDING_BYTES:
            self.send_error(400, "Invalid recording size")
            return

        requested_name = unquote(self.headers.get("X-Recording-Name", "ball-arena.webm"))
        safe_name = re.sub(r"[^A-Za-z0-9._-]", "-", Path(requested_name).name)
        if not safe_name.endswith(".webm"):
            safe_name += ".webm"

        RECORDINGS_DIR.mkdir(exist_ok=True)
        destination = RECORDINGS_DIR / safe_name
        destination.write_bytes(self.rfile.read(content_length))

        payload = json.dumps(
            {
                "fileName": destination.name,
                "relativePath": f"recordings/{destination.name}",
                "size": destination.stat().st_size,
                "format": "WebM",
            },
            ensure_ascii=False,
        ).encode("utf-8")
        self.send_response(201)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", 4173), GameHandler)
    print(f"Serving {ROOT} at http://127.0.0.1:4173")
    print(f"Recordings will be saved in {RECORDINGS_DIR}")
    server.serve_forever()
