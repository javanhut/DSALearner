#!/usr/bin/env python3
"""
Enhanced HTTP server that properly serves ES6 modules with correct MIME types.
Fixes the issue where modules fail to load due to incorrect Content-Type headers.
"""
import http.server
import socketserver
import os
import mimetypes
from functools import partial


class ModuleHTTPHandler(http.server.SimpleHTTPRequestHandler):
    """HTTP handler that serves JavaScript modules with correct MIME types."""
    
    # Ensure JavaScript files are served with correct MIME type for ES6 modules
    extensions_map = {
        '.js': 'application/javascript',
        '.mjs': 'application/javascript',
        '.json': 'application/json',
        '.html': 'text/html',
        '.css': 'text/css',
        '.svg': 'image/svg+xml',
        '.wasm': 'application/wasm',
    }
    
    def end_headers(self):
        # Disable caching for development
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        # Enable CORS for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def guess_type(self, path):
        """Override to ensure correct MIME types for modules."""
        mimetype = super().guess_type(path)
        # Get file extension
        _, ext = os.path.splitext(path)
        if ext in self.extensions_map:
            return self.extensions_map[ext]
        return mimetype
    
    def log_message(self, format, *args):
        """Override to provide cleaner logging."""
        message = format % args
        # Color code based on status
        if "200" in message or "304" in message:
            print(f"\033[92m✓\033[0m {message}")
        elif "404" in message:
            print(f"\033[91m✗\033[0m {message}")
        else:
            print(f"  {message}")


def main():
    port = int(os.environ.get('PORT', '8080'))
    
    # Set up proper MIME types globally as well
    mimetypes.init()
    mimetypes.add_type('application/javascript', '.js')
    mimetypes.add_type('application/javascript', '.mjs')
    
    handler = partial(ModuleHTTPHandler, directory=os.getcwd())
    
    # Allow port reuse to avoid "Address already in use" errors
    socketserver.TCPServer.allow_reuse_address = True
    
    with socketserver.TCPServer(('', port), handler) as httpd:
        print(f"\n🚀 DSA Learner Module Server")
        print(f"📍 Serving at: http://localhost:{port}/")
        print(f"📂 Root: {os.getcwd()}")
        print(f"✨ ES6 modules enabled with correct MIME types")
        print(f"🔄 Cache disabled for development")
        print(f"\nPress Ctrl+C to stop...\n")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n👋 Server stopped")


if __name__ == '__main__':
    main()