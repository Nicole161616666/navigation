#!/usr/bin/env python3
import os
import sys
import socket
import http.server
import socketserver

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        if self.path.endswith('.manifest') or self.path.endswith('.webmanifest') or self.path == '/manifest.json':
            self.send_header('Content-Type', 'application/manifest+json; charset=utf-8')
        super().end_headers()

def get_local_ips():
    ips = []
    try:
        hostname = socket.gethostname()
        for info in socket.getaddrinfo(hostname, None, socket.AF_INET):
            ip = info[4][0]
            if ip not in ips and ip != '127.0.0.1':
                ips.append(ip)
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 80))
        local_ip = s.getsockname()[0]
        s.close()
        if local_ip not in ips:
            ips.append(local_ip)
    except:
        pass
    return ips

def main():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    try:
        with socketserver.TCPServer(("0.0.0.0", PORT), MyHTTPRequestHandler) as httpd:
            local_ips = get_local_ips()
            print("========================================")
            print("🚀 导航链接管理器启动成功！")
            print("========================================")
            print("� 本地访问：")
            print(f"   http://localhost:{PORT}")
            print(f"   http://127.0.0.1:{PORT}")
            print("========================================")
            print("📲 局域网访问（手机/平板）：")
            if local_ips:
                for ip in local_ips:
                    print(f"   http://{ip}:{PORT}")
            else:
                print("   未检测到局域网 IP，请检查网络连接")
            print("========================================")
            print("按 Ctrl+C 停止服务器")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 服务器已停止")
        sys.exit(0)
    except OSError as e:
        if e.errno == 48 or (hasattr(e, 'winerror') and e.winerror == 10048):
            print(f"❌ 端口 {PORT} 已被占用，请关闭其他程序后重试")
        else:
            print(f"❌ 启动失败: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()