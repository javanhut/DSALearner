#!/usr/bin/env python3
import http.server
import socketserver
import os
from functools import partial


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    # Serve from current working directory
    def end_headers(self):
        # Disable caching so edits reflect immediately
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()


def main():
    port = int(os.environ.get('PORT', '8000'))
    handler = partial(NoCacheHandler, directory=os.getcwd())
    with socketserver.TCPServer(('', port), handler) as httpd:
        print(f"Serving (no-cache) at http://localhost:{port}/ (Ctrl+C to stop)")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass


if __name__ == '__main__':
    main()

