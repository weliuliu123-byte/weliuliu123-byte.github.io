# Hướng Dẫn Đưa Web Portfolio Lên GitHub Pages (`<username>.github.io`)

Đường dẫn dạng **`https://ten-cua-ban.github.io`** (mà bạn thấy ở bạn bè) chính là dịch vụ **GitHub Pages** — dịch vụ host web tĩnh miễn phí do GitHub cung cấp, chạy trực tiếp từ một repository trên tài khoản GitHub của bạn.

---

## Danh Sách File Web Đã Tạo Sẵn

Toàn bộ trang web đã được thiết kế hoàn chỉnh (100% tiếng Anh chuẩn quốc tế, không cần cài Node.js hay build tool):

| File / Thư mục | Chức năng |
| :--- | :--- |
| `index.html` | Giao diện trang web Portfolio chính (Hero, Domains, Projects, Interactive Benchmarks, Terminal, Contact, Resume Preview) |
| `styles.css` | Giao diện nền tối phong cách Systems / Semiconductor, responsive trên cả máy tính và điện thoại |
| `app.js` | Xử lý chuyển chế độ Benchmark, Terminal tương tác, bật/tắt cửa sổ xem trước CV PDF và nút copy Email |
| `Ha_Gia_Bao_Resume.pdf` | Bản CV PDF phục vụ tải trực tiếp hoặc xem ngay trên web |
| `assets/avatar.jpg` | Ảnh chân dung trích xuất trực tiếp từ CV của bạn |

---

## Bước 1: Tạo Repository Đuôi `.github.io` Trên GitHub

1. Đăng nhập tài khoản GitHub của bạn (ví dụ username là `hagiabao`).
2. Bấm **New repository**.
3. Đặt **Repository name** theo đúng công thức: **`<username>.github.io`** (ví dụ: `hagiabao.github.io` — lưu ý phần `<username>` phải viết chính xác từng chữ cái giống hệt username GitHub của bạn).
4. Chọn chế độ **Public** và bấm **Create repository**.

---

## Bước 2: Đưa Toàn Bộ File Trong Thư Mục `github-pages-portfolio/` Lên Repo

Bạn có thể upload trực tiếp trên trình duyệt web hoặc push bằng Git CLI:

### Cách A: Upload trực tiếp trên web (Nhanh nhất, không cần cài gì thêm)
1. Trong trang repository `<username>.github.io` vừa tạo, bấm **uploading an existing file**.
2. Kéo thả toàn bộ nội dung **bên trong** thư mục `github-pages-portfolio/` vào trang web, bao gồm:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `Ha_Gia_Bao_Resume.pdf`
   - Thư mục `assets/` (bên trong có `avatar.jpg`)
3. Nhập commit message (ví dụ `Deploy portfolio website`) và bấm **Commit changes**.

### Cách B: Push bằng Git trên Terminal (PowerShell)
1. Mở PowerShell tại thư mục `c:\Users\PR\Downloads\cv\github-pages-portfolio`.
2. Chạy lần lượt các lệnh sau (thay `YOUR_GITHUB_USERNAME` bằng username thật của bạn):

```powershell
git init
git branch -M main
git add .
git commit -m "Initial portfolio deployment"
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_GITHUB_USERNAME.github.io.git
git push -u origin main
```

---

## Bước 3: Kiểm Tra Link Web Chính Thức

1. Sau khi đẩy file lên repo, vào mục **Settings** -> **Pages** trên GitHub để kiểm tra (thường GitHub tự động kích hoạt sau 1–2 phút với nhánh `main` và thư mục `/ (root)`).
2. Truy cập đường dẫn **`https://YOUR_GITHUB_USERNAME.github.io`** để xem trang web Portfolio chính thức của bạn.

---

## Bước 4: Cập Nhật Placeholder Trước Hoặc Sau Khi Deploy

Trong file `index.html`, hãy dùng tính năng tìm & thay thế (`Ctrl + H`) để cập nhật 2 liên kết cá nhân:

| Placeholder cần thay | Vị trí | Nội dung thay thế |
| :--- | :--- | :--- |
| `YOUR_GITHUB_USERNAME` | `index.html` | Username GitHub thật của bạn (để trỏ đúng link 2 repo dự án và trang GitHub cá nhân) |
| `YOUR_LINKEDIN_ID` | `index.html` | Đuôi đường dẫn LinkedIn cá nhân của bạn |

*(Mẹo: Sau khi web chạy xong ở `https://<username>.github.io`, bạn nên gắn thẳng link này lên đầu CV PDF để nhà tuyển dụng bấm vào xem ngay).*
